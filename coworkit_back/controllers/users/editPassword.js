const { create } = require("lodash");
const { isId, validator, createError } = require("../../helpers");
const { editPasswordSchema } = require("../../schemas");

const editPassword = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    // Recoger de req.params el id de usario al que tengo que cambiar la contraseña
    const { user_id } = req.params;

    isId(user_id);
    await validator(editPasswordSchema, req.body);
    // Recoger de req.body oldPassword y newPassword
    const { oldPassword, newPassword } = req.body;

    // Comprobar que el usuario que viene del token es el mismo al que queremos cambiar la pass
    if (req.userAuth.id !== Number(user_id)) {
      throw createError(
        "No tienes permisos para cambiar la contraseña de este usuario",
        403
      );
    }
    // Comprobar que la contraseña antigua es correcta
    const [current] = await connection.query(
      `
     SELECT id
     FROM users
     WHERE id=? AND password=SHA2(?, 512)
   `,
      [user_id, oldPassword]
    );

    if (current.length === 0) {
      throw createError("La contraseña actual no es correcta", 401);
    }

    // Guardar la nueva contraseña y last auth update para que los anteriores tokens dejen de ser válidos
    await connection.query(
      `
     UPDATE users
     SET password=SHA2(?, 512), last_auth_date=?
     WHERE id=?
   `,
      [newPassword, new Date(), user_id]
    );

    res.send({
      status: "ok",
      message: "Contraseña cambiada",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editPassword;
