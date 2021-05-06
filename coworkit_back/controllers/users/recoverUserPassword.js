const {
  generateRandomString,
  sendMail,
  createError,
  validator,
} = require("../../helpers");

const { recoverUserPasswordSchema } = require("../../schemas");
const recoverUserPassword = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    //validamos el mail con el Joi

    await validator(recoverUserPasswordSchema, req.body);
    //Sacamos el email
    const { email } = req.body;
    //Comprobamos que el email existe en la base de datos, saltan alarmas si no está
    const [currentEmail] = await connection.query(
      `
   SELECT id
   FROM users
   WHERE email=?
   `,
      [email]
    );
    if (currentEmail.length !== 0) {
      //Si todo va bien, generamos codigo de recuperación
      const recoverCode = generateRandomString(20);
      // Envío por mail el bonito código de recuperación
      const emailBody = `
   Se ha solicitado un cambio de contraseña para el usuario registrado con este email en la página coworkit.company.com
   <br>
   <br>
   Pulsa en el siguiente link para cambiar la contraseña: <strong>. ${process.env.REACT_PORT}/users/resetPassword/${recoverCode}</strong>.
   <br>
   <br>
   Si no te funciona el link, introduce el link directamente en el buscador de tu navegador.
   <br>
   <br>
   En caso de que no solicitaras el cambio de contraseña, por favor ignora este email. Podrás iniciar sesión con tu contraseña habitual.
   <br>
   <br>
   Un saludo desde el rincon de tus sueños, Coworkit 🏙
   `;
      await connection.query(
        `
    UPDATE  users
    SET validation_code=?
    WHERE email=?
`,
        [recoverCode, email]
      );

      await sendMail({
        to: email,
        subject: "Cambio de contraseña de Coworkit",
        body: emailBody,
      });
    }
    res.send({
      status: "ok",
      message: "Email enviado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = recoverUserPassword;
