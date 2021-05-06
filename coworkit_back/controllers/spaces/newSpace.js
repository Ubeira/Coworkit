const {
  validator,
  savePhoto,
  setPhotoUrl,
  createError,
} = require("../../helpers");
const { newSpaceSchema } = require("../../schemas");

const newSpace = async (req, res, next) => {
  let connection;
  //'Sala de reuniones','Oficina individual','Auditorio','Sala audiovisual','Oficina compartida'
  try {
    connection = await req.app.locals.getDB();
    //validar los valores del body ✅
    await validator(newSpaceSchema, req.body);
    const { type, description, name, price, capacity } = req.body;

    //Compruebo si se envió foto y si es correcta
    if (!req.files) {
      throw createError("Tienes que añadir una foto ", 400);
    }
    if (Object.keys(req.files).length > 20) {
      throw createError("Solo se permite subir 20 fotos", 400);
    }

    //Lo convierto en array para hacer un map (hay varias fotos)
    const keysOfPhotos = await Object.entries(req.files);

    //  Introduzco los nuevos datos
    const [result] = await connection.query(
      `
        INSERT INTO spaces (type,description,name, price, capacity)
        VALUES (?,?,?,?,?);
        `,
      [type, description, name, price, capacity]
    );

    //obtengo la id autogenerada
    const { insertId } = result;
    //Creo una subcarpeta para almacenar las fotos del espacio
    const folderOfPhotos = `spaces/${insertId}`;

    const photosData = keysOfPhotos.map((value) => {
      return value[1];
    });
    const photos = await Promise.all(
      photosData.map(async (photo) => {
        const namePhoto = await savePhoto(photo, folderOfPhotos);
        //Introduzco las fotos en la BD
        await connection.query(
          `INSERT INTO photos (url,space_id)
  VALUES ( ?, ${insertId});`,
          [namePhoto]
        );

        return setPhotoUrl(namePhoto, folderOfPhotos);
      })
    );
    //Envio la respuesta
    res.send({
      status: "ok",
      data: {
        insertId,
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
module.exports = newSpace;
