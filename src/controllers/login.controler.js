const bcryptjs = require("bcryptjs");
const conn = require("../db/bd.controller");
const controller = {
  loginGget: (req, res) => {
    res.render("login");
  },
  loginPost: async (req, res) => {
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

    res.redirect("registro exitoso!");
  },
};

module.exports = controller;
