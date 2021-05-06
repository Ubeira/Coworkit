const { setPhotoUrl } = require("../../helpers");

const filterPacksAdmin = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    //Verifico los datos del query
    const { order, direction, pack_id, type, price, enabled } = req.query;
    const orderBy = order ? order : "ID";
    const orderDirection = direction ? direction : "ASC";

    let result = [];
    [result] = await connection.query(
      `
      SELECT * FROM packs
      WHERE (ID = ? OR ?) AND
        (type LIKE ? OR ?)AND
        (price = ? OR ?)AND
        (enabled = ? OR ?)
        ORDER BY ${orderBy} ${orderDirection}
      ;`,
      [pack_id, !pack_id, `%${type}%`, !type, price, !price, enabled, !enabled]
    );

    result.map((value) => {
      value.photo = setPhotoUrl(value.photo, "packs");
    });

    res.send({
      status: "ok",
      data: [...result],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = filterPacksAdmin;
