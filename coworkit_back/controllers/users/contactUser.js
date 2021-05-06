const { createError, sendMail, createGreetings } = require("../../helpers");

const contactUser = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();
    const { user_id } = req.params;

    let { subject, emailBody } = req.body;

    if (subject.length === 0) {
      throw createError("Es necesario crear un asunto para el email", 400);
    } else if (emailBody.length === 0) {
      throw createError("Es necesario crear un cuerpo para el email", 400);
    }

    const [result] = await connection.query(
      `
        SELECT name, email
        FROM users
        WHERE id = ?;
    `,
      [user_id]
    );

    const { name, email } = result[0];

    await sendMail({
      to: email,
      subject,
      body: emailBody,
      name,
      introMessage: createGreetings(),
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

module.exports = contactUser;
