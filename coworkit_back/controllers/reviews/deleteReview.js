const { createError } = require("../../helpers");

const deleteReview = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { review_id, user_id } = req.params;

    const [reviewUser] = await connection.query(
      `
SELECT user_id 
FROM reviews
WHERE id = ?
`,
      review_id
    );

    //Comprobamos que un usuario solo sea capaz de eliminar sus propias reseñas (el admin puede borrar las que quiera)
    if (Number(user_id) !== reviewUser && !req.userAuth.admin) {
      throw createError("No estás autorizado para realizar esta acción", 401);
    }

    await connection.query(`DELETE FROM reviews WHERE ID= ?;`, [review_id]);

    res.send({
      stats: "ok",
      message: `La valoración con id ${review_id} fue borrada de la tabla valoraciones`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = deleteReview;
