const conn = require("../db/bd.controller");

const statements = {
  getFullName: async (req, res) => {
    const username = req.session.username;
    const result = await conn.query(
      "SELECT nombre, apellido,id_persona,usuario FROM persona WHERE usuario = ?",
      [username]
    );
    if (result.length > 0) {
      const { nombre, apellido, id_persona,usuario } = result[0];
      req.session.id_persona = id_persona;
      return { nombre, apellido, id_persona, usuario };
    } else {
      return null;
    }
  },
  getPosts: async (req, res) => {
    const posts = await conn.query("SELECT * FROM posts");
    return posts;
  },
  getPostsUser: async(req, res)=>{
    const id_persona = req.session.id_persona;
    const posts = await conn.query("SELECT * FROM posts WHERE id_persona = ?",[id_persona]);
    return posts;
  },
  getProfileUser: async(req, res)=>{
    const id_persona = req.params.id;
    const result = await conn.query('SELECT * FROM persona WHERE id_persona = ?',[id_persona]);
    const posts = await conn.query("SELECT * FROM posts WHERE id_persona = ?",[id_persona]);
    return {result, posts};
  }
};

module.exports = statements;
