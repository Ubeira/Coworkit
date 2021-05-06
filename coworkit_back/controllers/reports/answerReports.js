const { createError, sendMail, formatDateToDB } = require("../../helpers");

const answerReports = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    const { report_id } = req.params;

    let { emailBody } = req.body;

    // Comprobamos que el administrador haya introducido una respuesta a la incidencia
    if (emailBody.length === 0) {
      throw createError(
        "Es necesario crear una respuesta para la incidencia",
        400
      );
    }

    // Obtenemos los datos necesarios para el correo
    const [result] = await connection.query(
      `
      SELECT r.category "category", r.description "description", r.report_date "date", u.name "name", u.email "email"  
      FROM users u JOIN reports r ON u.id = r.user_id
      WHERE r.id = ?; 
    `,
      [report_id]
    );

    const { name, email, category, description, date } = result[0];

    emailBody += `<hr><h3>Incidencia ${report_id}: </h3>
                  <p><b>Categoría:</b> ${category}<p>
                  <p><b>Descripción:</b> <br>${description}<p>
                  <p><b>Fecha reporte:</b> ${formatDateToDB(date)}<p>`;

    // Enviamos una respuesta al correo del usuario que publicó la incidencia
    await sendMail({
      to: email,
      subject: `Respuesta a la incidencia ${report_id}`,
      body: emailBody,
      name,
      introMessage: "Buenas noches",
    });

    // Devolvemos una respuesta si todo ha salido bien
    res.send({
      status: "ok",
      message: "Respuesta enviada con éxito",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = answerReports;
