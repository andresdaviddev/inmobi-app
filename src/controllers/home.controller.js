const path = require("path");
const statements = require("../db/statements");
const conn = require("../db/bd.controller");
const directorio = require("../dir");
const controller = {
  index: (req, res) => {
    res.render("index");
  },

  home: async (req, res) => {
    const fullName = await statements.getFullName(req, res);
    const posts = await statements.getPosts(req, res);
    const foto = `uploads/`;
    console.log(posts);
    const tamaño = posts.length;
    res.render("home", {
      fullname: fullName.nombre + " " + fullName.apellido,
      posts: posts.map((post) => ({
        foto: foto + post.img,
        precio: post.precio,
        descripcion: post.descripcion,
      })),
    });
  },

  profile: (req, res) => {
    res.render("profile");
  },

  newpost: (req, res) => {
    res.render("newpost");
  },
  // insercion de un nuevo post
  newpostPost: async (req, res) => {
    const fullName = await statements.getFullName(req, res);
    const id_persona = fullName.id_persona;
    const img = req.file.filename;
    const precio = req.body.price;
    const descripcion = req.body.descripcion;
    const result = conn.query(
      "INSERT INTO posts (img,precio,descripcion,id_persona) VALUES (?,?,?,?)",
      [img, precio, descripcion, id_persona]
    );

    if (result) {
      res.redirect("home");
    } else {
      res.send("error ");
    }
    // console.log(req.file);
    // res.send('subida');
  },

  settings: async (req, res) => {
    const fullName = await statements.getFullName(req, res);
    res.render("settings", {
      fullname: fullName.nombre + " " + fullName.apellido,
    });
  },
  // subir correo y telefono
  settingsPost: async (req, res) => {
    const fullName = await statements.getFullName(req, res);
    const id = fullName.id_persona;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const result = await conn.query(
      "UPDATE persona SET telefono=?, correo=? WHERE id_persona=?",
      [telefono, email, id]
    );
    if (result.affectedRows > 0) {
      res.redirect("home");
    } else {
      res.send("error");
    }
  },
};

module.exports = controller;
