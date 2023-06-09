const express = require("express");
const controller = require("../controllers/home.controller");
const app = express.Router();

app.get("/", controller.index);

app.get("/home", controller.home);

app.get("/profile", controller.profile);

app.get("/newpost", controller.newpost);

app.post("/newpost", controller.newpostPost);

app.get("/settings", controller.settings);

app.post("/settings", controller.settingsPost);

app.get("/eliminar/:id",controller.delete);

app.get("/post/:id", controller.editPostGet);

app.post("/post/:id", controller.editPost);

app.get("/profile/:id", controller.profileUserGet);

module.exports = app;
