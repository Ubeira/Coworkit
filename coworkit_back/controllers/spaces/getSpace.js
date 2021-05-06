const { setPhotoUrl } = require("../../helpers");

const getSpace = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    //    Saco la propiedad id de los parámetros de ruta
    const { space_id } = req.params;

    //      Hago el SELECT en la bd
    const [result] = await connection.query(
      `
    SELECT DISTINCT e.ID, e.type, e.name, e.price,e.capacity,AVG(IFNULL(v.score,0)) AS score,e.description 
    FROM spaces e LEFT JOIN reviews v ON (e.ID=v.space_id)
    WHERE e.ID=? AND e.enabled=1
    GROUP BY e.ID
    ;`,
      [space_id]
    );

    let [
      photos,
    ] = await connection.query(`SELECT url FROM photos WHERE space_id=?;`, [
      space_id,
    ]);
    photos = photos.map((photo) =>
      setPhotoUrl(photo.url, `spaces/${space_id}`)
    );
    const [
      dates,
    ] = await connection.query(
      `SELECT start_date,end_date FROM orders WHERE space_id=? AND end_date > CURDATE() ORDER BY start_date;`,
      [space_id]
    );
    res.send({
      status: "ok",
      data: { ...result[0], photos: [...photos], dates: [...dates] },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getSpace;
