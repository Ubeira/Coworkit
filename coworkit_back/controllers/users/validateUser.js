const { createError } = require("../../helpers");
const validateUser = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    const { validationCode } = req.params;

    // Comprobar que hay un usuario en la base de datos pendiente de validar con ese código

    const [user] = await connection.query(
      `
      SELECT ID
      FROM users
      WHERE validation_code=?
    `,
      [validationCode]
    );

    // y si no lo hay dar un error
    if (user.length === 0) {
      throw createError(
        "No hay ningún usuario pendiente de validar con ese código",
        400
      );
    }

    // Activar el usuario y quitarle el validationCode
    await connection.query(
      `
      UPDATE users
      SET verified=true, validation_code=NULL
      WHERE validation_code=?
    `,
      [validationCode]
    );

    // Devolver una respuesta
    res.send({
      status: "ok",
      message: "Usuario validado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = validateUser;
