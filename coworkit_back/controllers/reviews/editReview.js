const { validator, createError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { newReviewSchema } = require("../../schemas");

const editPack = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    //obtengo el id del pack a modificar del endpoint
    const { review_id, user_id } = req.params;
    //Verifico los datos del body
    await validator(newReviewSchema, req.body);
    //Saco los campos del body not null del body: tipo, texto_contenido,precio,foto
    const { comment, score } = req.body;

    //Comprobamos que el usuario no sea administrador, ya que este no podrá modificar valoraciones
    const { authorization } = req.headers;
    tokenInfo = jwt.verify(authorization, process.env.SECRET);
    if (tokenInfo.admin === 1)
      throw createError("No tienes permisos para modificar valoraciones", 401);

    //Obtengo el user_id=?y space_id de la review
    const [oldReview] = await connection.query(
      `
      SELECT user_id 'old_user_id',space_id FROM reviews
      WHERE  ID=?`,
      [review_id]
    );

    const { space_id, old_user_id } = oldReview[0];

    // Comprobamos que el usuario que realiza la edición sea el mismo que la creó
    if (old_user_id !== Number(user_id)) {
      throw createError("No estás autorizado para realizar esta acción", 401);
    }

    //hago un query de SQL Update para editar los datos
    await connection.query(
      `
    UPDATE reviews SET comment=?, score=?
    WHERE ID=?
    ;`,
      [comment, score, review_id]
    );

    res.send({
      status: "ok",
      data: {
        id: review_id,
        comment,
        score,
        user_id,
        space_id,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editPack;
