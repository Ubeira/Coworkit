const { savePhoto, validator } = require("../../helpers");
const { newReportSchema } = require("../../schemas");

const newReport = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    //Obtenemos los datos necesario de req.params
    const { user_id, space_id } = req.params;

    // Obtenemos los campos necesarios de req.body
    let { category, description } = req.body;
    if (category) category = category.toLowerCase();
    await validator(newReportSchema, { category, description });
    // Comprobamos que exista un pedido activo para el usuario y espacio introducidos
    let [order] = await connection.query(
      `
    SELECT * 
    FROM orders 
    WHERE (CURDATE() BETWEEN start_date AND end_date) 
          AND user_id = ?
          AND space_id = ?;
    `,
      [user_id, space_id]
    );

    //Devolvemos errores si no se cumplen las condiciones necesarias
    if (order.length === 0) {
      const error = new Error(
        "No existe ninguna reserva activa para la combinación usuario-espacio introducida"
      );
      error.httpStatus = 400;
      throw error;
    }

    // Procesamos la imagen:
    let reportPhoto = null;

    if (req.files && Object.keys(req.files).length > 0) {
      reportPhoto = await savePhoto(req.files.photo, "reports");
      req.files.photo;
    }

    //Ejecutamos la inserción en la base de datos
    const [insertResult] = await connection.query(
      `
      INSERT INTO reports (category, description, user_id, space_id, photo)
      VALUES (?, ?, ?, ?, ?);
      `,
      [category, description, user_id, space_id, reportPhoto]
    );

    const { insertId } = insertResult;

    const [
      result,
    ] = await connection.query(`SELECT * FROM  reports WHERE id = ?;`, [
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

module.exports = newReport;
