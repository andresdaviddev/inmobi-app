const conn = require("../db/bd.controller");

const statements = {
  getFullName: async (req, res) => {
    const username = req.session.username;
    const result = await conn.query(
      "SELECT nombre, apellido FROM persona WHERE usuario = ?",
      [username]
    );
    if (result.length > 0) {
      const { nombre, apellido } = result[0];
      return { nombre, apellido };
    } else {
      return null;
    }
  },
};

module.exports = statements;
