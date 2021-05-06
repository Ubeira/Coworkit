const { isId, setPhotoUrl } = require("../../helpers");

const getReviews = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    let { space_id } = req.params;
    isId(space_id);

    const [results] = await connection.query(
      `
        SELECT u.name, u.surname, u.company, u.photo, r.score, r.comment, r.review_date
        FROM reviews r JOIN users u ON r.user_id = u.id
        WHERE r.space_id = (SELECT id
                            FROM spaces
                            WHERE id = ? AND enabled = 1);
    `,
      [space_id]
    );
    results.map((result) => {
      result.photo = setPhotoUrl(result.photo, "users");
    });

    res.send({
      status: "ok",
      data: [...results],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getReviews;
