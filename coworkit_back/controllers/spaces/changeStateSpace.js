const changeStateSpace = async (req, res, next) => {
  let connection;

  try {
    connection = await req.app.locals.getDB();

    const { space_id } = req.params;

    //Ejecutamos la edición en la base de datos
    await connection.query(
      `
          UPDATE spaces s1, spaces s2 
          SET s1.enabled = IF(s2.enabled = 0, 1,0)     
          WHERE s1.ID = s2.ID and s1.ID = ?;
        `,
      [space_id]
    );

    const [
      result,
    ] = await connection.query(`SELECT * FROM  spaces WHERE ID = ?;`, [
      space_id,
    ]);

    res.send({
      status: "ok",
      data: {
        ...result["0"],
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = changeStateSpace;
