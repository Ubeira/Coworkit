const { validator, setPhotoUrl } = require("../../helpers");
const { filterSpaceSchema } = require("../../schemas");
const filterSpaces = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();

    //      Valido datos del body
    //      Quiero: idEspacio,typeEspacio,nombreEspacio,price,capacity,,,mediascores,fotos
    await validator(filterSpaceSchema, req.body);
    //    Saco la propiedad id de los parámetros de ruta
    let {
      type,
      price,
      score,
      capacity,
      start_date,
      end_date,
      order,
      direction,
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
      SELECT s.ID,s.type,s.name,s.description,s.price,s.capacity,p.url, AVG(IFNULL(r.score, 0)) 'score'
          FROM spaces s JOIN photos p ON s.id = p.space_id LEFT JOIN reviews r ON s.id = r.space_id
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
           AND s.enabled=1
           GROUP BY s.id, r.space_id
           HAVING (score >= ? OR ?) 
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
        score,
        !score,
      ]
    );
    let spacios = [];
    const filtro = await results.filter((value) => {
      if (!spacios.includes(value.ID)) {
        spacios.push(value.ID);
        return [value.url, value.ID];
      }
    });
    const [dates] = await connection.query(
      `
      SELECT start_date,end_date,space_id,ID,price FROM orders WHERE end_date > CURDATE() ORDER BY start_date
    ;`
    );
    filtro.map((result) => {
      //Devuelvo la foto con su ruta de backend
      result.url = setPhotoUrl(result.url, "spaces/" + result.ID);
      //filtro todas los orders de dichos espacios y lo añado a la resupesta
      result.date = dates.filter((date) => {
        return date.space_id === result.ID;
      });
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
module.exports = filterSpaces;
