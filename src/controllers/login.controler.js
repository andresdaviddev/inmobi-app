const bcryptjs = require("bcryptjs");
const conn = require("../db/bd.controller");
const controller = {
  loginGget: (req, res) => {
    res.render("login");
  },

  loginPost: async (req, res) => {
    if (req.body.username) {
      const { username, password } = req.body;

      const persona = {
        username,
        password,
      };
      const query =
        "SELECT * FROM persona WHERE usuario = ? AND contraseña = ?";
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
      // registro de usuarios
    } else {
      const { name, lastname, mailsignup, usernamesignup, passwordsignup } =
        req.body;
      const persona = {
        name,
        lastname,
        mailsignup,
        usernamesignup,
        passwordsignup,
      };
      await conn.query(
        "INSERT INTO persona (nombre, apellido, correo, usuario, contraseña) VALUES (?, ?, ?, ?, ?)",
        [
          persona.name,
          persona.lastname,
          persona.mailsignup,
          persona.usernamesignup,
          persona.passwordsignup,
        ]
      );
      req.flash("success_msg", "Te has registrado exitosamente");
      res.redirect("login");
    }
  },
};

module.exports = controller;
