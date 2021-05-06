const {
  savePhoto,
  generateRandomString,
  sendMail,
  createError,
  validator,
  createGreetings,
} = require("../../helpers");

// Controller que permite modificar los datos de un usuario que ya existe en nuestra base de datos
const { editUserSchema } = require("../../schemas");

const editUser = async (req, res, next) => {
  let connection;
  let mailMessage = "";
  let updateFields = ["name=?", "surname=?", "company=?", "last_auth_date=?"];
  let lastAuthDate;

  try {
    connection = await req.app.locals.getDB();

    // Obtenemos id de req.params
    const { user_id } = req.params; // este es el id de usuario que queremos editar

    //Validamos los datos introducidos
    await validator(editUserSchema, req.body);
    // Obtenemos los datos pasados por req.body
    let {
      name,
      surname,
      nif,
      company,
      tel,
      email,
      admin,
      deleted,
      deletePhoto,
    } = req.body;

    // Obtenemos la iformación actual del usuario
    const [currentData] = await connection.query(
      `
      SELECT email, nif, tel, last_auth_date
      FROM users
      WHERE id=?
      `,
      [user_id]
    );

    // Si el nif recibido es diferente al que tenía anteriormente el usuario, lo procesamos
    if (nif && nif !== currentData[0].nif) {
      updateFields.push(`nif='${nif}'`);
    }

    // obtendremos el last_auth_date para modificarlo en caso de que el email haya cambiado
    lastAuthDate = new Date(currentData[0].last_auth_date);

    // Si el teléfono recibido es diferente al que tenía anteriormente el usuario, lo procesamos
    if (tel !== currentData[0].tel) {
      // Comprobamos que no exista el nuevo teléfono en la base de datos
      if (tel) {
        const [existingTel] = await connection.query(
          `
      SELECT id
      FROM users
      WHERE tel=?
      `,
          [tel]
        );

        if (existingTel.length > 0) {
          throw createError(
            "Ya existe un usuario  en la base de datos con el teléfono proporcionado",
            409
          );
        }
      }
      tel = tel === undefined || tel === "" ? null : tel;
      updateFields.push("tel=" + tel);
    }

    // Si el email recibido es diferente al que tenía anteriormente el usuario, lo procesamos
    if (email && email !== currentData[0].email) {
      // Se eactualizara la  lastAuthDate para que sea necesario hacer login con un token válido
      lastAuthDate = new Date();
      // Comprobamos que no exista el nuevo email en la base de datos
      const [existingEmail] = await connection.query(
        `
        SELECT id
        FROM users
        WHERE email=?
        `,
        [email]
      );

      if (existingEmail.length > 0) {
        throw createError(
          "Ya existe un usuario en la base de datos con el email proporcionado",
          409
        );
      }

      // Creamos un código de validación (contraseña temporal de un solo uso)
      const registrationCode = generateRandomString(40);
      updateFields.push(
        `email='${email}'`,
        `validation_code='${registrationCode}'`
      );

      // Enviamos un mail al usuario con el link de confirmación de email
      const emailBody = `

    Acabas de modificar tu email de registro en <strong>COWORKIT</strong>.
    Pulsa en este link para validar tu nuevo email: <strong>. ${process.env.PUBLIC_HOST}/users/validate/${registrationCode}</strong>.
      `;

      await sendMail({
        to: email,
        subject: `Valida tu nuevo email para continuar la sinergia en COWORKIT`,
        body: emailBody,
        name,
        introMessage: createGreetings(),
      });

      // Añadimos aviso para revisar correo a la respuesta
      mailMessage = " Revisa tu email para validar la nueva dirección";
      updateFields.push("verified = 0");
    }

    //Si recibimos una foto, la procesamos
    if (req.files && req.files.photo) {
      // Subimos la imagen al servidor
      const userPhoto = await savePhoto(req.files.photo, "users");
      updateFields.push(`photo='${userPhoto}'`);
    } else if (Number(deletePhoto) === 1) {
      //En caso de que no se envíe una foto y se solicite que se elimine la actual, establecemos la foto por defecto
      updateFields.push(`photo='defaultImg.svg'`);
    }

    // Si el usuario es administrador, le permitimos dar o retirar permisos de administrador a otros usuarios
    if (req.userAuth.admin) {
      if (admin) updateFields.push(`admin=${Number(admin)}`);
      if (deleted) updateFields.push(`deleted=${Number(deleted)}`);
    }

    // Aplicamos las modificaciones al usuario en cuestión
    await connection.query(
      `
      UPDATE users
      SET ${updateFields.join(",")}
      WHERE id=?
      `,
      [name, surname, company, lastAuthDate, user_id]
    );

    const [newData] = await connection.query(
      `
    SELECT name, 
           surname,
           nif,
           company,
           tel,
           email,
           photo,
           admin,
           deleted
    FROM users
    WHERE id = ?;
    `,
      [user_id]
    );

    //Enviamos una respuesta favorable si todo ha salido bien
    res.send({
      status: "ok",
      message: `Datos de usuario actualizados.${mailMessage}`,
      data: newData[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUser;
