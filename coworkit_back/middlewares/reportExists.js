const { createError, isId } = require("../helpers");

const reportExists = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    let { report_id } = req.params;

    if (report_id === undefined) {
      report_id = req.body.report_id;
    }

    if (report_id) isId(report_id);

    const [user] = await connection.query(
      `
      SELECT id FROM reports WHERE ID=?
    `,
      [report_id]
    );

    if (user.length === 0) {
      throw createError(
        "El ID introducido no se corresponde con ningún reporte",
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

module.exports = reportExists;
