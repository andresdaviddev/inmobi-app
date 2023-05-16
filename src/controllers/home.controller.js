const path = require("path");
const statements = require("../db/statements");
const conn = require("../db/bd.controller");
const directorio = require("../dir");
const fs = require("fs");
const { dir } = require("console");
const controller = {
  index: (req, res) => {
    res.render("index");
  },

  home: async (req, res) => {
    const fullName = await statements.getFullName(req, res);
    const posts = await statements.getPosts(req, res);
    // const persona = await conn.query('SELECT * FROM persona WHERE id_persona = ?',[posts[0].id_persona]);
    const foto = `uploads/`;
    // console.log(persona);
    // console.log(posts);
    res.render("home", {
      fullname: fullName.nombre + " " + fullName.apellido,
      posts: posts.map((post) => ({
        foto: foto + post.img,
        precio: post.precio,
        descripcion: post.descripcion,
        id_persona: post.id_persona,
        id_post: post.id_post,
        // usuario: persona[0].usuario,
      })),

    });
  },
  // <-----------------------------> profile
  profile: async (req, res) => {
    const postsUser = await statements.getPostsUser(req, res);
    const getData = await statements.getFullName(req, res);
    // console.log(getData);
    const foto = "uploads/";
    res.render("profile", {
      usuario: getData.usuario,
      nombre: getData.nombre,
      apellido: getData.apellido,
      telefono: getData.telefono,
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
  },
  // <--------------------------------------------> settings
  settings: async (req, res) => {
    const fullName = await statements.getFullName(req, res);
    res.render("settings", {
      fullname: fullName.nombre + " " + fullName.apellido,
      nombre: fullName.nombre,
      apellido: fullName.apellido,
      usuario: fullName.usuario,
      contraseña: fullName.contraseña,
      telefono: fullName.telefono,
      correo: fullName.correo,
    });
  },

  settingsPost: async (req, res) => {
    const fullName = await statements.getFullName(req, res);
    const id = fullName.id_persona;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const usuario = req.body.usuario;
    const contraseña = req.body.contraseña;
    const result = await conn.query(
      "UPDATE persona SET nombre=?, apellido=?, telefono=?, correo=?, usuario=?, contraseña=? WHERE id_persona=?",
      [nombre, apellido, telefono, correo, usuario, contraseña, id]
    );
    // console.log(result);
    if (result.affectedRows > 0) {
      res.redirect("home");
    } else {
      res.send("error");
    }
  },
  delete: async (req, res) => {
    const id_post = req.params.id;
    const getPost = await conn.query("SELECT * FROM posts WHERE id_post = ?", [
      id_post,
    ]);
    const result = await conn.query("DELETE FROM posts WHERE id_post = ?", [
      id_post,
    ]);
    const img = directorio + "/" + getPost[0].img;

    if (result.affectedRows > 0) {
      fs.unlinkSync(img);
      res.redirect("/profile");
    }
  },
  editPostGet: async (req, res) => {
    const id_post = req.params.id;
    const post = await conn.query("SELECT * FROM posts WHERE id_post = ?", [
      id_post,
    ]);
    const foto = path.join(directorio, post[0].img);
    req.session.id_post = post[0].id_post;
    // console.log(foto);
    res.render("editPost", {
      post: post.map((post) => ({
        img: foto,
        precio: post.precio,
        descripcion: post.descripcion,
        id_persona: post.id_persona,
        id_post: post.id_post,
      })),
    });
  },
  editPost: async (req, res) => {
    const id_post = req.session.id_post;
    const post = await conn.query("SELECT * FROM posts WHERE id_post = ?", [
      id_post,
    ]);
    const imgDeleted = path.join(directorio, post[0].img);
    // -------------------------------------------------->
    const img = req.file.filename;
    const precio = req.body.price;
    const descripcion = req.body.descripcion;
    const result = await conn.query(
      "UPDATE posts set img=?, precio=?, descripcion=? WHERE id_post = ?",
      [img, precio, descripcion, id_post]
    );

    if (result.affectedRows > 0) {
      fs.unlinkSync(imgDeleted);
      res.redirect("/profile");
    }
  },
  profileUserGet: async (req, res) => {
    const id_persona = req.params.id;
    const result = await conn.query('SELECT * FROM persona WHERE id_persona = ?', [id_persona]);
    const nombre = result[0].nombre;
    const apellido = result[0].apellido;
    const telefono = result[0].telefono;
    const usuario = result[0].usuario;
    // seleccioonado los posts del usuario
    const postsUser = await conn.query('SELECT * FROM posts WHERE id_persona = ?', [id_persona]);
    // console.log(path.join(directorio, postsUser[0].img));
    res.render('profileUser', {
      nombre,
      apellido,
      telefono,
      usuario,
      postsUser: postsUser.map((post) => ({
        foto: '/uploads/' + post.img,
        precio: post.precio,
        descripcion: post.descripcion,
        id_post: post.id_post,
      })),
    })
  }
};

module.exports = controller;
