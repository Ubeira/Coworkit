const {
  deletePhoto,
  savePhoto,
  validator,
  createError,
} = require("../../helpers");
const { newPackSchema } = require("../../schemas");
const editPack = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    //obtengo el id del pack a modificar del endpoint
    const { pack_id } = req.params;
    //validar los valores del body ✅
    await validator(newPackSchema, req.body);
    //Saco los campos del body not null del body: tipo, texto_contenido,precio,foto
    const { type, content, price } = req.body;

    const verificationType = await connection.query(
      `
SELECT * FROM packs WHERE type=? AND id <> ?`,
      [type, pack_id]
    );
    if (verificationType[0].length !== 0) {
      throw createError("El nombre del pack ya está usado ", 400);
    }
    //Obtengo el nombre de la foto
    const [photoQuery] = await connection.query(
      `
    SELECT photo FROM packs
    WHERE  ID=?`,
      [pack_id]
    );
    let photo = photoQuery[0].photo;

    //   ("644b614c-c15c-45fb-a81e-a17e4a2a76a9.jpg");
    //Compruebo si se envió foto y si es correcta
    if (req.files && Object.keys(req.files).length === 1) {
      //Primero borro la foto del servidor
      await deletePhoto(photo, "packs");
      // Guardar la imagen y conseguir el nombre del fichero
      photo = await savePhoto(req.files.photo, "packs");
    }

    //hago un query de SQL Update para editar los datos
    await connection.query(
      `
    UPDATE packs SET type=?,content=?,price=?,photo=?
    WHERE ID=?
    ;`,
      [type, content, price, photo, pack_id]
    );

    res.send({
      status: "ok",
      data: {
        pack_id,
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

module.exports = editPack;
