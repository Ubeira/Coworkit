const { createError } = require("../../helpers");

const deleteReport = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    const { report_id } = req.params;

    //Comprobamos que el reporte que intentamos eliminar esté marcado como resuelto
    const [isSolved] = await connection.query(
      `
    SELECT * 
    FROM reports 
    WHERE id = ? AND solved = 0;
    `,
      [report_id]
    );

    if (isSolved.length !== 0) {
      throw createError(
        "No es posible eliminar una incidencia sin resolver",
        418
      );
    }

    //Eliminamos el reporte en cuestión
    await connection.query(
      `
    DELETE FROM reports 
    WHERE id = ?`,
      report_id
    );

    //Enviamos una respuesta en caso de que todo haya salido bien
    res.send({
      status: "ok",
      message: `Reporte ${report_id} eliminado con éxito`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteReport;
