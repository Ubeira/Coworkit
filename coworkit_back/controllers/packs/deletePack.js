const deletePack = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    //obtengo el id del pack que voy a deshabilitar/habilitar de los parámetros
    const { pack_id } = req.params;

    //?   Las fotos quedan en el servidor y la bd
    //! const { deletePhoto } = require("../../helpers");
    // !  //Obtengo el nombre de esa photo en el servidor
    //!const [photoQuery] = await connection.query(
    //!  `
    //!  SELECT photo FROM packs
    //!  WHERE  ID=?`,
    //!  [pack_id]
    //!);
    //!let photo = photoQuery[0].photo;
    //! //Borro la photo del servidor
    //!await deletePhoto(photo, "packs");

    //Pongo el pack en enbled=0
    await connection.query(
      `
  UPDATE packs p1, packs p2 
  SET p1.enabled = IF(p2.enabled = 0, 1, 0)     
  WHERE p1.id = p2.id AND p1.id = ?;
`,
      [pack_id]
    );

    let [enabled] = await connection.query(
      `
SELECT enabled FROM packs WHERE id=?;`,
      [pack_id]
    );
    enabled = enabled[0].enabled ? "habilitado" : "deshabilitado";
    res.send({
      stats: "ok",
      message: `El pack con id ${pack_id} fue ${enabled}.`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePack;
