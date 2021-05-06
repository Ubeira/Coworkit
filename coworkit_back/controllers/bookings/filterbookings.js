const { validator, capitalize } = require("../../helpers");
const { filterBookingsSchema } = require("../../schemas");

const filterbookings = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    let {
      reservation_id,
      space_type,
      space_name,
      user_name,
      pack,
      start_date,
      end_date,
      order_date,
      direction,
      order,
    } = req.query;

    //Modificamos algunos campos para que no den problemas a la hora de validarlos
    order = order ? order.toLowerCase() : "id";
    direction = direction ? direction.toUpperCase() : "ASC";
    if (space_type) space_type = capitalize(space_type);
    if (pack) pack = capitalize(pack);

    await validator(filterBookingsSchema, {
      reservation_id,
      space_type,
      space_name,
      user_name,
      // pack,
      start_date,
      end_date,
      order_date,
      direction,
      order,
    });

    const results = await connection.query(
      `
        SELECT o.id as "id", CONCAT(u.name," ",u.surname, " (", u.ID, ")") as "user_name", 
               CONCAT(s.name, " (", s.ID, ")") as "space_name", s.type as "space_type", 
               CONCAT(p.type, " (", p.ID, ")") as "pack", o.price as "price", o.order_date as "order_date",
               o.start_date as "start_date", o.end_date as "end_date"
        FROM orders o JOIN users u ON o.user_id = u.id 
                      JOIN spaces s ON o.space_id = s.id 
                      JOIN packs p ON o.pack_id = p.id
        WHERE (o.id = ? OR ?) 
              AND (s.type = ? OR ?)
              AND ( CONCAT(s.name, " (", s.ID, ")")  LIKE ? OR ?) 
              AND (CONCAT(u.name," ",u.surname, " (", u.ID, ")") LIKE ? OR ?) 
              AND (CONCAT(p.type, " (", p.ID, ")") LIKE ? OR ?) 
              AND (DATE(o.start_date) = DATE(?) OR ?) 
              AND (DATE(o.end_date) = DATE(?) OR ?) 
              AND (DATE(o.order_date) = DATE(?) OR ?) 
        ORDER BY ${order} ${direction};
    `,
      [
        reservation_id,
        !reservation_id,
        space_type,
        !space_type,
        `%${space_name}%`,
        !space_name,
        `%${user_name}%`,
        !user_name,
        `%${pack}%`,
        !pack,
        start_date,
        !start_date,
        end_date,
        !end_date,
        order_date,
        !order_date,
      ]
    );
    const filteredBookings = results[0];
    res.send({
      status: "ok",
      data: [...filteredBookings],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = filterbookings;
