const express = require("express");
const controller = require("../controllers/home.controller");
const app = express.Router();

app.get('/',controller.index);

app.get("/home", controller.home);

app.get("/profile", controller.profile);

// borrar post
app.get('/:id_post',controller.deltePostsGet);

app.post('/:id_post',controller.deltePostsPost);

app.get("/newpost", controller.newpost);

app.post("/newpost", controller.newpostPost);

app.get('/settings', controller.settings);

app.post('/settings', controller.settingsPost);

module.exports = app;
