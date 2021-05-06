const { createError, isId } = require("../helpers");
const reservationExists = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    let { reservation_id } = req.params;

    if (reservation_id === undefined) {
      reservation_id = req.body.reservation_id;
    }

    if (reservation_id) isId(reservation_id);

    // Comprobamos que existe una reserva con ese id

    const [bookings] = await connection.query(
      `
      SELECT ID FROM orders WHERE ID=?
    `,
      [reservation_id]
    );

    if (bookings.length === 0) {
      throw createError("Esta reserva no existe", 404);
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = reservationExists;
