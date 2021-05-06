const path = require("path");
const { setPhotoUrl } = require("../../helpers");

const getUser = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    // Saco la id de usuario de req.params
    const { user_id } = req.params;

    // Saco toda la información de usuario
    const [user] = await connection.query(
      `
      SELECT ID,name, surname,nif,photo,email, tel,registration_date, company, admin
      FROM users 
      WHERE ID=?
    `,
      [user_id]
    );

    // Si el usuario solicitado coíncide con el del token se muestran los datos --> middleware isAuthorized ✅

    const { photo } = user[0];
    const photoUrl = setPhotoUrl(photo, "users");

    const userInfo = {
      name: user[0].name,
      surname: user[0].surname,
      nif: user[0].nif,
      photo: photoUrl,
      email: user[0].email,
      tel: user[0].tel,
      registration_date: user[0].registration_date,
      company: user[0].company,
      admin: user[0].admin,
    };

    // Devuelvo la respuesta
    res.send({
      status: "ok",
      data: userInfo,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = getUser;
