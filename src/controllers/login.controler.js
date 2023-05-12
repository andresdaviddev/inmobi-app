const bcryptjs = require("bcryptjs");
const conn = require("../db/bd.controller");
const controller = {
  loginGget: (req, res) => {
    res.render("login");
  },

  loginPost: async (req, res) => {
    const { username, password } = req.body;

    const persona = {
      username,
      password,
    };
    const query = "SELECT * FROM persona WHERE usuario = ? AND contraseña = ?";
    const results = await conn.query(query, [
      persona.username,
      persona.password,
    ]);

    if (results.length > 0) {
      req.session.username = persona.username;
      res.redirect("home");
    } else {
      req.flash("error_msg", "Usuario y/o contraseñas incorrectos");
      res.redirect("login");
    }
  },
  signup: (req, res) => {
    res.render("signup");
  },
  signupPost: async (req, res) => {
    const { name, lastname, usernamesignup, passwordsignup } = req.body;
    const persona = {
      name,
      lastname,
      usernamesignup,
      passwordsignup,
    };
    try {
      await conn.query(
        "INSERT INTO persona (nombre, apellido, usuario, contraseña) VALUES (?, ?, ?, ?)",
        [
          persona.name,
          persona.lastname,
          persona.usernamesignup,
          persona.passwordsignup,
        ]
      );
      req.flash("exito", "Te has registrado exitosamente");
      res.redirect("login");
    } catch (ex) {
      res.send(ex);
    }
  },
};

module.exports = controller;
