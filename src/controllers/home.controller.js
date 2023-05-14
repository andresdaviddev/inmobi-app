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
    // console.log(posts);
    res.render("home", {
      fullname: fullName.nombre + " " + fullName.apellido,
      posts: posts.map((post) => ({
        foto: foto + post.img,
        precio: post.precio,
        descripcion: post.descripcion,
        id_persona: post.id_persona,
      })),
    });
  },
  // <-----------------------------> profile
  profile: async (req, res) => {
    const postsUser = await statements.getPostsUser(req, res);
    const getData = await statements.getFullName(req, res);
    const foto = "uploads/";
    res.render("profile", {
      usuario: getData.usuario,
      nombre: getData.nombre,
      apellido: getData.apellido,
      postsUser: postsUser.map((post) => ({
        foto: foto + post.img,
        precio: post.precio,
        descripcion: post.descripcion,
        id_post: post.id_post,
      })),
    });
  },
  //  <----------------------------> crear un nuevo post
  newpost: (req, res) => {
    res.render("newpost");
  },

  deltePostsGet: (req, res)=>{
    res.render('eliminar');
  },

  deltePostsPost: (req,res)=>{

  },

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
  // <--------------------------------------------> settings
  settings: async (req, res) => {
    const fullName = await statements.getFullName(req, res);
    res.render("settings", {
      fullname: fullName.nombre + " " + fullName.apellido,
    });
  },

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
