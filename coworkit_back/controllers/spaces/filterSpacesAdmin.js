const { validator, setPhotoUrl } = require("../../helpers");
const { filterSpaceAdminSchema } = require("../../schemas");

const filterSpacesAdmin = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    //      Valido datos del body
    //      Quiero: idEspacio,typeEspacio,nombreEspacio,price,capacity,,,mediascores,fotos
    await validator(filterSpaceAdminSchema, req.body);
    //    Saco la propiedad id de los parámetros de ruta
    let {
      type,
      price,
      capacity,
      start_date,
      end_date,
      enabled,
      order,
      direction,
      space_id,
      space_name,
    } = req.query;

    const orderBy = order ? order : "ID";
    const orderDirection = direction ? direction : "ASC";

    let results;
    if (start_date && end_date) {
      start_date = new Date(start_date);
      end_date = new Date(end_date);
    }
    [results] = await connection.query(
      `
      SELECT s.ID,s.type,s.name "name",s.description,s.price,s.capacity,s.enabled,p.url
          FROM spaces s JOIN photos p ON s.id = p.space_id
          WHERE s.id NOT IN (
          SELECT DISTINCT space_id 
          FROM orders 
           WHERE (? BETWEEN start_date AND end_date) 
           or (? BETWEEN start_date AND end_date)
           or (? < start_date  AND ? > end_date)
           )
           AND (s.price <= ? OR ?) 
           AND (s.type LIKE ? OR ?) 
           AND (s.capacity >=? OR ?) 
           AND  (s.enabled=? OR ?) 
           AND (s.ID=? OR ?)
           AND (s.name LIKE ? OR ?)
           ORDER BY ${orderBy} ${orderDirection};`,
      [
        start_date,
        end_date,
        start_date,
        end_date,
        price,
        !price,
        type,
        !type,
        capacity,
        !capacity,
        enabled,
        !enabled,
        space_id,
        !space_id,
        `%${space_name}%`,
        !space_name,
      ]
    );

    results.map((value) => {
      value.url = setPhotoUrl(value.url, `spaces/${value.ID}`);
    });

    let spacios = [];
    const filtro = await results.filter((value) => {
      if (!spacios.includes(value.ID)) {
        spacios.push(value.ID);
        return [value.url, value.ID];
      }
    });

    res.send({
      status: "ok",
      data: [...filtro],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = filterSpacesAdmin;
