const { validator, createError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { newReviewSchema } = require("../../schemas");

const newReview = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    //Obtenemos los datos necesario de req.params
    const { space_id, user_id } = req.params;
    //Verifico los datos del body
    await validator(newReviewSchema, req.body);
    // Obtenemos los campos necesarios de req.body
    const { comment, score } = req.body;

    //Si eres admin no puedes crear valoraciones
    const { authorization } = req.headers;
    tokenInfo = jwt.verify(authorization, process.env.SECRET);

    if (tokenInfo.admin === 1)
      throw createError("No tienes permisos para crear valoraciones", 401);

    //Comprobamos que el usuario no hubiera valorado el espacio anteriormente

    const [reviewExists] = await connection.query(
      `
        SELECT * 
        FROM reviews
        WHERE user_id = ? AND space_id = ?;
      `,
      [user_id, space_id]
    );

    if (reviewExists.length !== 0) {
      throw createError("No se puede valorar un espacio más de una vez", 400);
    }

    // Comprobamos que exista un pedido pasado para el usuario y espacio introducidos
    let [order] = await connection.query(
      `
      SELECT * 
      FROM orders 
      WHERE (CURDATE() > end_date) 
            AND user_id = ?
            AND space_id = ?;
      `,
      [user_id, space_id]
    );

    //Devolvemos errores si no se cumplen las condiciones necesarias
    if (order.length === 0) {
      const error = new Error(
        "No existe ninguna reserva pasada para la combinación usuario-espacio introducida"
      );
      error.httpStatus = 400;
      throw error;
    }

    //Ejecutamos la inserción en la base de datos
    const [insertResult] = await connection.query(
      `
        INSERT INTO reviews (comment,score,user_id,space_id)
        VALUES (?, ?, ?, ?);
        `,
      [comment, score, user_id, space_id]
    );

    const { insertId } = insertResult;

    const [
      result,
    ] = await connection.query(`SELECT * FROM  reviews WHERE id = ?;`, [
      insertId,
    ]);

    res.send({
      status: "ok",
      data: {
        ...result["0"],
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = newReview;
