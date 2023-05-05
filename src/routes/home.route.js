const express = require("express");
const controller = require("../controllers/home.controller");
const app = express.Router();

app.get("/", controller.home);

app.get("/profile", controller.profile);

app.get("/newpost", controller.newpost);

app.post("/newpost", controller.newpost);

app.all('/settings', controller.settings);
module.exports = app;
