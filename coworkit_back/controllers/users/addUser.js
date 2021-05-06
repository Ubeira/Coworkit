const {
  generateRandomString,
  sendMail,
  createError,
  validator,
  formatName,
} = require("../../helpers");
const { userSchema } = require("../../schemas");

const addUser = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    // Recojo de req.body el email y la password
    let { name, surname, nif, email, password } = req.body;

    //validar lso datos introducidos en el body

    await validator(userSchema, req.body);

    name = formatName(name);
    surname = formatName(surname);
    console.log(name, surname);

    // Compruebo que no exista un usuario en la base de datos con ese email o ese nif

    const [existingUser] = await connection.query(
      ` 
    SELECT ID FROM users WHERE email=? OR  nif= ?`,
      [email, nif]
    );

    if (existingUser.length > 0) {
      throw createError(
        "Ya hay un usuario en la base de datos con ese email o NIF",
        409
      );
    }

    // Creo un código de registro (contraseña temporal de un solo uso)
    const registrationCode = generateRandomString(40);

    // Mando un mail al usuario con el link de confirmación de email
    const emailBody = `

    Te acabas de registra en la empresa de espacios de trabajo <strong>COWORKIT</strong>. 
    Pulsa en este link para validar tu email: <strong>${process.env.REACT_PORT}/users/validate/${registrationCode}</strong>. 
      `;

    await sendMail({
      to: email,
      subject: `Activa tu usuario para empezar a hacer sinergia en COWORKIT`,
      body: emailBody,
      name,
      introMessage: "Bienvenido",
    });

    // Meto el usuario en la base de datos desactivado y con ese código de registro
    await connection.query(
      `
      INSERT INTO users(name, surname, nif, email, password, validation_code , last_auth_date)
      VALUES(?,?,?,?,SHA2(?, 512),?,CURDATE())
      `,
      [name, surname, nif, email, password, registrationCode]
    );

    // Mando una respuesta
    res.send({
      status: "ok",
      message: "Usuario registrado, comprueba tu email para activarlo",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addUser;
