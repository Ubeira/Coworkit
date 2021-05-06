const { setPhotoUrl } = require("../../helpers");
const getReservation = async (req, res, next) => {
  let connection;
  let reservation = [];
  try {
    connection = await req.app.locals.getDB();
    const { user_id } = req.params;
    const { type } = req.query;
    const validFieldsOfType = ["current", "pending", "finished"];
    const typeOfReservation = validFieldsOfType.includes(type) ? type : " ";

    // si el id de usuario no existe dar error --> middleware userExists ✅

    //si existe se enlistan las reservas hechas según el fintro indicado ✅
    let orders;
    console.log(user_id);
    switch (typeOfReservation) {
      case "current":
        orders = await connection.query(
          `
          SELECT 
          o.id "id", o.order_date "orderDate", o.start_date "startDate", o.end_date "endDate", o.price "price", 
          o.user_id "userId", o.space_id "spaceId",s.type "spaceName" , o.pack_id "packId", p.type "packName", ph.url "spacePhoto"
          FROM orders o 
          JOIN packs p 
          ON o.pack_id = p.id 
          JOIN photos ph
          ON  o.space_id = ph.space_id
          JOIN spaces s
          ON o.space_id = s.id
           WHERE o.user_id = ? AND (CURDATE() BETWEEN start_date AND end_date) 
           ORDER BY start_date, end_date , order_Date;`,
          [user_id]
        );
        break;

      case "pending":
        orders = await connection.query(
          `
          SELECT 
          o.id "id", o.order_date "orderDate", o.start_date "startDate", o.end_date "endDate", o.price "price", 
          o.user_id "userId", o.space_id "spaceId",s.type "spaceName" , o.pack_id "packId", p.type "packName", ph.url "spacePhoto"
          FROM orders o 
          JOIN packs p 
          ON o.pack_id = p.id 
          JOIN photos ph
          ON  o.space_id = ph.space_id
          JOIN spaces s
          ON o.space_id = s.id
          WHERE user_id = ? AND CURDATE() < start_date 
          ORDER BY start_date , end_date , order_Date;`,
          [user_id]
        );
        break;
      case "finished":
        orders = await connection.query(
          `
          SELECT 
          o.id "id", o.order_date "orderDate", o.start_date "startDate", o.end_date "endDate", o.price "price", 
          o.user_id "userId", o.space_id "spaceId",s.type "spaceName" , o.pack_id "packId", p.type "packName", ph.url "spacePhoto", IFNULL(r.id, 0) "reviewId"
          FROM orders o 
          JOIN packs p 
          ON o.pack_id = p.id 
          JOIN photos ph
          ON  o.space_id = ph.space_id
          JOIN spaces s
          ON o.space_id = s.id
          LEFT JOIN reviews r
          ON (o.user_id = r.user_id) AND (r.space_id = o.space_id)
          WHERE o.user_id = ? AND CURDATE()  > end_date 
          ORDER BY start_date, end_date , order_Date;`,
          [user_id]
        );
        break;
      default:
        orders = await connection.query(
          `
          SELECT 
          o.id "id", o.order_date "orderDate", o.start_date "startDate", o.end_date "endDate", o.price "price", 
          o.user_id "userId", o.space_id "spaceId",s.type "spaceName" , o.pack_id "packId", p.type "packName", ph.url "spacePhoto"
          FROM orders o 
          JOIN packs p 
          ON o.pack_id = p.id 
          JOIN photos ph
          ON o.space_id = ph.space_id
          JOIN spaces s
          ON o.space_id = s.id
          WHERE  user_id = ? ORDER BY start_date;`,
          [user_id]
        );
        break;
    }

    const reservation = orders[0].map((order) => {
      console.log(order);
      order.spacePhoto = setPhotoUrl(
        order.spacePhoto,
        "spaces/" + order.spaceId
      );

      return { ...order };
    });

    res.send({
      status: "ok",
      data: reservation,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = getReservation;
