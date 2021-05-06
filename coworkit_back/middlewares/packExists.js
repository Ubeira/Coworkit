const { createError, isId } = require("../helpers");

const userExists = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    let { pack_id } = req.params;

    if (pack_id === undefined) {
      pack_id = req.body.pack_id;
    }

    if (pack_id) isId(pack_id);

    const [user] = await connection.query(
      `
      SELECT id FROM packs WHERE ID=?
    `,
      [pack_id]
    );

    if (user.length === 0) {
      throw createError(
        "El ID introducido no se corresponde con ningún pack",
        404
      );
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = userExists;
