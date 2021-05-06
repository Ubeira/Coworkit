const { createError, isId } = require("../helpers");
const spaceExists = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    let { space_id } = req.params;

    if (space_id === undefined) {
      space_id = req.body.space_id;
    }

    if (!space_id) throw createError("Necesita un id", 404);

    isId(space_id);

    const [space] = await connection.query(
      `
      SELECT ID FROM spaces WHERE ID=?
    `,
      [space_id]
    );

    if (space.length === 0) {
      throw createError("Este espacio no existe", 404);
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = spaceExists;
