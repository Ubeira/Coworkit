const { createError, isId } = require("../helpers");

const reviewExists = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    let { review_id } = req.params;

    if (review_id === undefined) {
      review_id = req.body.review_id;
    }

    if (review_id) isId(review_id);

    const [user] = await connection.query(
      `
      SELECT id FROM reviews WHERE ID=?
    `,
      [review_id]
    );

    if (user.length === 0) {
      throw createError(
        "El ID introducido no se corresponde con ninguna valoración",
        404
      );
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = reviewExists;
