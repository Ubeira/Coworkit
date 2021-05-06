const { generateRandomString, createError } = require("../../helpers");

const deleteUser = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    // Sacamos de req.params el id de usuario que queremos anonimizar
    const { user_id } = req.params;

    // Si la id es igual a 1 deberíamos dar un error
    if (Number(user_id) === 1) {
      throw createError(
        "El administrador principal no se puede anonimizar",
        403
      );
    }

    // Si el usuario solicitado coíncide con el del token se muestran los datos --> middleware isAuthorized ✅

    // Hacemos un update de la tabla de usuarios
    // cambiar el mail, cambiar la password, borrar el nombre, borrar el avatar, marcar como no activo, marcar como si borrado
    await connection.query(
      `
      UPDATE users
      SET  nif=000000000, password=?, photo=?, tel= NULL, company= NULL, admin= 0, verified=0, deleted=1, last_auth_date=?
      WHERE ID=?
    `,
      [
        generateRandomString(40),
        process.env.DEFAULT_IMG_URL,
        new Date(),
        user_id,
      ]
    );

    // Devolvemos respuesta
    res.send({
      status: "ok",
      message: `El usuario con id ${user_id} fue anonimizado`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteUser;
