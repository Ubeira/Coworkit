const { validator } = require("../../helpers");
const { resetUserPasswordSchema } = require("../../schemas");
const resetUserPassword = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    await validator(resetUserPasswordSchema, req.body);
    // Sacar de req.body los campos recoverCode y newPassword
    const { recoverCode, newPassword } = req.body;
    // Comprobar que existe un usuario en la base de datos con ese código de recuperación activo
    const [user] = await connection.query(
      `
        SELECT id
        FROM users
        WHERE validation_code=?
      `,
      [recoverCode]
    );
    // Si no lo hay devolver un error
    if (user.length === 0) {
      const error = new Error("Código de recuperación incorrecto");
      error.httpStatus = 404;
      throw error;
    }

    // Establecer la contraseña proporcionada a ese usuario
    await connection.query(
      `
        UPDATE users
        SET password=SHA2(?, 512), last_auth_date=?, validation_code=NULL
        WHERE id=?
      `,
      [newPassword, new Date(), user[0].id]
    );

    // Devolver una response

    res.send({
      status: "ok",
      message: "Password del usuario cambiada",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = resetUserPassword;
