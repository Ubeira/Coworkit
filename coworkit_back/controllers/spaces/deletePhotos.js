const { createError, deletePhoto, validator } = require("../../helpers");
const { deletePhotoSpaceSchema } = require("../../schemas");

const deletePhotos = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    //Cargamos el nombre y dirección de la foto a eliminar
    let { url } = req.body;
    const { space_id } = req.params;

    //const { UPLOADS_DIRECTORY, PUBLIC_HOST } = process.env;
    //Separo elnombre de la foto de la url
    //url = url.split(
    //  `${PUBLIC_HOST}/${UPLOADS_DIRECTORY}/spaces/${space_id}`
    //)[1];
    await validator(deletePhotoSpaceSchema, req.body);
    //Veo si existe la foto
    const [photoBD] = await connection.query(
      `
    SELECT url FROM photos
    WHERE url LIKE ? AND space_id=?;
    `,
      [`${url}%`, space_id]
    );
    if (photoBD.length === 0) {
      throw createError("La foto no existe en la base de datos", 404);
    }
    const urlPhoto = photoBD[0].url;
    //Borramos la foto del server
    await deletePhoto(urlPhoto, `/spaces/${space_id}`);
    //Borramos de la BD
    await connection.query(
      `
    DELETE FROM photos 
    WHERE space_id=? AND url=?;`,
      [space_id, urlPhoto]
    );

    res.send({
      status: "ok",
      data: `La foto ${url} del espacio con id = ${space_id}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = deletePhotos;
