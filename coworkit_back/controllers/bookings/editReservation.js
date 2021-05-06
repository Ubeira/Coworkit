const {
  formatDateToDB,
  createError,
  distanceDateInHours,
  validator,
} = require("../../helpers");
const { reservationSchema } = require("../../schemas");

const editReservation = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { user_id, reservation_id } = req.params;
    //validar los valores del body ✅
    await validator(reservationSchema, req.body);
    const { start_date, end_date, pack_id, space_id } = req.body;

    //comprobamos que la modificación de la reserva no involucra ningun pack ni ningún espacio que estén inabilitados

    const [oldReservation] = await connection.query(
      `
    SELECT o.space_id as "oldSpace_id", o.pack_id as "oldPack_id", s.enabled as "space_enabled", p.enabled as "pack_enabled" FROM orders o 
    JOIN spaces s ON  o.space_id = s.ID 
    JOIN packs p ON o.pack_id = p.ID 
    WHERE o.ID=?;
    `,
      [reservation_id]
    );

    const {
      oldSpace_id,
      oldPack_id,
      space_enabled,
      pack_enabled,
    } = oldReservation[0];

    if (
      space_id === oldSpace_id &&
      space_enabled === 0 &&
      !req.userAuth.admin
    ) {
      throw createError(
        "No puedes modificar tu reserva con este espacio, escoge otro espacio",
        401
      );
    }
    if (pack_id === oldPack_id && pack_enabled === 0 && !req.userAuth.admin) {
      throw createError(
        "No puedes modificar tu reserva con este pack, escoge otro pack",
        401
      );
    }

    // comprobar que el pack existe
    const [packList] = await connection.query(
      `
    SELECT id FROM packs WHERE ID=?
  `,
      [pack_id]
    );

    if (packList.length === 0) {
      throw createError(
        "El ID introducido no se corresponde con ningún pack",
        404
      );
    }

    ////la fecha de inicio no puede ser posterior a la fecha actual ✅
    //if (!dateValidator(new Date(start_date)))
    //  throw createError("La fecha inicial debe ser posterior a la actual", 400);

    //comprobar que no han pasado más de un número máximo de horas desde la fecha de pedido para poder hacer modificaciones en la reserva
    const hoursLimit = 48;
    const bookings = await connection.query(
      `
 SELECT order_date, start_date, user_id FROM orders WHERE ID = ?`,
      [reservation_id]
    );

    if (
      bookings[0][0].user_id !== Number(req.params.user_id) &&
      !req.userAuth.admin
    ) {
      throw createError("No estás autorizado para realizar esta acción", 401);
    }

    const dateOfReservation = bookings[0][0].order_date;
    const dateOfStartReservation = bookings[0][0].start_date;

    const numOfHoursSinceOrder = distanceDateInHours(
      new Date(),
      new Date(dateOfReservation)
    );

    const numOfHoursUntilStart = distanceDateInHours(
      new Date(dateOfStartReservation),
      new Date()
    );

    //comprobar que la distancia entre la fecha de pedido y la fecha de inicio de reserva es mayor de 48 horas, de no ser así no se puede editar la reserva
    if (numOfHoursUntilStart <= 48 && !req.userAuth.admin) {
      throw createError(
        `Esta reserva a está a ${hoursLimit} horas o menos de empezar. No es posible eliminarla`,
        405
      );
    }

    //comprobar que la distancia entre la fecha de pedido si la fecha actual es de 48 horas, de ser así no se puede editar la reserva
    if (numOfHoursSinceOrder >= 48 && !req.userAuth.admin) {
      throw createError(
        `Límite de ${hoursLimit} horas desde la creación de la reserva superado. No es posible eliminar reserva.`,
        405
      );
    }

    // comprobar que la fecha de inicio es posterio a la de fin dar un error ✅
    if (new Date(start_date) > new Date(end_date)) {
      throw await createError(
        "La fecha de fin debe ser posterior a la inicial",
        400
      );
    }
    //comprobar que las fechas están disponibles para el espacio, en caso contrario dar error 400 ✅
    const bookingOfSpace = await connection.query(
      `
        SELECT * FROM orders WHERE ((Date(?) BETWEEN start_date AND end_date) OR (Date(?) BETWEEN start_date AND end_date) )AND space_id =? AND NOT ID = ?;
      `,
      [new Date(start_date), new Date(end_date), space_id, reservation_id]
    );

    if (bookingOfSpace[0].length !== 0) {
      throw await createError("Espacio no disponible en esas fechas", 400);
    }

    // calcular precio y devolver la información de la reserva
    //precio base del espacio
    const place = await connection.query(`SELECT * FROM spaces WHERE ID = ?`, [
      space_id,
    ]);
    const spacePricePerDay = place[0][0].price;
    //precio del pack añadido al espacio
    const pack = await connection.query(
      `
      SELECT * FROM packs WHERE ID = ?`,
      [pack_id]
    );
    const packPrice = pack[0][0].price;
    //precio en función del número de días se deseen contratar
    const numOfDays =
      Math.ceil(
        Math.abs(
          new Date(end_date).getTime() - new Date(start_date).getTime()
        ) /
          (1000 * 3600 * 24)
      ) + 1;
    const totalPriceReservation = numOfDays * (spacePricePerDay + packPrice);

    await connection.query(
      `
    UPDATE orders SET start_date=Date(?),end_date=Date(?),price=?,space_id=?,pack_id=? WHERE ID = ?
    `,
      [
        new Date(start_date),
        new Date(end_date),
        totalPriceReservation,
        space_id,
        pack_id,
        reservation_id,
      ]
    );

    res.send({
      status: "ok",
      data: {
        order_date: formatDateToDB(new Date()),
        start_date: formatDateToDB(new Date(start_date)),
        end_date: formatDateToDB(new Date(end_date)),
        price: totalPriceReservation,
        user_id,
        space_id,
        pack_id,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = editReservation;
