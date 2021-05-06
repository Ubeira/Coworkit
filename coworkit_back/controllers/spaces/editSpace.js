const { newSpaceSchema } = require("../../schemas");
const {
  validator,
  savePhoto,
  setPhotoUrl,
  createError,
} = require("../../helpers");

const editSpace = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();
    const { space_id } = req.params;

    //validar los valores del body ✅
    await validator(newSpaceSchema, req.body);

    const { type, description, name, price, capacity } = req.body;

    //hago un query de SQL Update para editar los datos
    await connection.query(
      `
      UPDATE spaces SET type=?,description=?,name=?,price=?,capacity=?
      WHERE ID=?
      ;`,
      [type, description, name, price, capacity, space_id]
    );

    let listOfphotos;
    if (req.files) {
      //Compruebo  si es correcta
      if (Object.keys(req.files).length > 20) {
        throw createError("Solo se permite subir 20 fotos", 400);
      }
      //Lo convierto en array para hacer un map (hay varias fotos)
      const keysOfPhotos = await Object.entries(req.files);
      //Selecciono la subcarpeta para almacenar las fotos del espacio
      const folderOfPhotos = `spaces/${space_id}`;

      const photosData = keysOfPhotos.map((value) => {
        return value[1];
      });
      listOfphotos = await Promise.all(
        photosData.map(async (photo) => {
          const namePhoto = await savePhoto(photo, folderOfPhotos);
          //Introduzco las fotos en la BD
          await connection.query(
            `INSERT INTO photos (url,space_id)
  VALUES ( ?, ?);`,
            [namePhoto, space_id]
          );
          return setPhotoUrl(namePhoto, folderOfPhotos);
        })
      );
    }
    const photos = req.files
      ? [...listOfphotos]
      : "No se ha añadido ninguna foto";

    res.send({
      status: "ok",
      data: {
        space_id,
        type,
        description,
        name,
        price,
        capacity,
        photos,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = editSpace;
