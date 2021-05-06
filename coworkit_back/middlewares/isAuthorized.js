const jwt = require("jsonwebtoken");
const { createError, isId } = require("../helpers");

const isAuthorized = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    const { authorization } = req.headers;
    const { user_id } = req.params;

    // Comprobamos que el id introducido es un número
    if (user_id) isId(user_id);

    // Si no authorization está vacío devuelvo un error
    if (!authorization) {
      throw createError("Falta la cabecera de autorización", 401);
    }

    // Valido el token y si no es válido devuelvo un error
    let tokenInfo;
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (e) {
      throw createError("El token no es válido", 401);
    }

    if (tokenInfo.id !== Number(user_id) && !tokenInfo.admin) {
      throw createError("No estás autorizado para realizar esta acción", 401);
    }
    // Selecciono la fecha de ultima actualización de email / password del usuario
    const [result] = await connection.query(
      `
      SELECT last_auth_date
      FROM users
      WHERE ID=?
    `,
      [tokenInfo.id]
    );

    //Si no hay last auth update, el token no será válido
    const lastAuthUpdate = result[0] && new Date(result[0].last_auth_date);
    const tokenEmissionDate = new Date(tokenInfo.iat * 1000);

    if (tokenEmissionDate < lastAuthUpdate || lastAuthUpdate === undefined) {
      throw createError("El token no es válido", 401);
    }

    // Inyectamos en la request la información del token
    req.userAuth = tokenInfo;

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = isAuthorized;
