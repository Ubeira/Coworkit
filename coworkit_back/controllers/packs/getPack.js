const { validator, setPhotoUrl } = require("../../helpers");
const { getPackSchema } = require("../../schemas");
const jwt = require("jsonwebtoken");
const getPack = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    //Verifico los datos del query
    await validator(getPackSchema, req.query);
    const { order, direction } = req.query;
    const orderBy = order ? order : "ID";
    const orderDirection = direction ? direction : "ASC";

    const { authorization } = req.headers;
    let result;
    if (authorization) {
      const tokenInfo = jwt.verify(authorization, process.env.SECRET);
      if (tokenInfo.admin) {
        //      Hago el SELECT en la bd para que vea todos
        [result] = await connection.query(
          `
      SELECT ID,type,content,price,photo FROM packs
      ORDER BY ${orderBy} ${orderDirection};`
        );
      }
    }
    //      Hago el SELECT en la bd para que se vean los enabled
    [result] = await connection.query(
      `
      SELECT ID,type,content,price,photo FROM packs
      WHERE enabled=1
      ORDER BY ${orderBy} ${orderDirection};`
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

module.exports = getPack;
