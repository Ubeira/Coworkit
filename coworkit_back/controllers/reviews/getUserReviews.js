const { isId, createError } = require("../../helpers");

const getUserReviews = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    let { user_id, review_id } = req.params;
    isId(review_id);

    const [results] = await connection.query(
      `
        SELECT * FROM reviews WHERE id= ? 
    `,
      [review_id]
    );
    if (results.length === 0) {
      throw createError("No existe ninguna valoración son ese ID", 404);
    }

    if (results[0].user_id !== Number(user_id) && !req.userAuth.admin) {
      throw createError("No estás autorizado para realizar esta acción", 401);
    }

    res.send({
      status: "ok",
      data: results[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUserReviews;
