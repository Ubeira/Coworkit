const { createError, savePhoto, validator } = require("../../helpers");
const { newPackSchema } = require("../../schemas");
const newPack = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    //validar los valores del body ✅
    await validator(newPackSchema, req.body);
    //Saco los campos del body not null del body: tipo, texto_contenido,precio
    const { type, content, price } = req.body;

    const verificationType = await connection.query(
      `
SELECT * FROM packs WHERE type=?`,
      [type]
    );

    // Comprobamos que no exista un pack con ese nombre
    if (verificationType[0].length !== 0) {
      throw createError("El nombre del pack ya está usado ", 400);
    }

    //Compruebo si se envió foto y si es correcta
    if (!req.files) {
      throw createError("Tienes que añadir una foto ", 400);
    }
    if (Object.keys(req.files).length !== 1) {
      throw createError("Solo se permite subir una foto", 400);
    }
    // Guardar la imagen y conseguir el nombre del fichero
    const photo = await savePhoto(req.files.photo, "packs");

    //Inserto en la base de datos el nuevo pack
    const [result] = await connection.query(
      `
    INSERT INTO packs (type, content,price,photo)
    VALUES (?,?,?,?);
    `,
      [type, content, price, photo]
    );

    //obtengo la id del nuevo dato insertado
    const { insertId } = result;

    res.send({
      status: "ok",
      data: {
        id: insertId,
        type,
        content,
        price,
        photo,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newPack;
