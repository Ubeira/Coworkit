const { createError } = require("../helpers");
const spaceIsEnabled = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    let { space_id } = req.params;

    if (space_id === undefined) {
      space_id = req.body.space_id;
    }

    if (!space_id) throw createError("Necesita un ID", 404);
    const [space] = await connection.query(
      `
      SELECT ID , enabled FROM spaces WHERE ID=?
    `,
      [space_id]
    );
    const spaceISEnabled = space[0].enabled;
    if (!spaceISEnabled) {
      throw createError("Este espacio no esta habilitado", 404);
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = spaceIsEnabled;
