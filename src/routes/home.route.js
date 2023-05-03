const express = require("express");
const controller = require("../controllers/home.controller");
const app = express.Router();

app.get("/", controller.home);

app.get("/profile", controller.profile);

module.exports = app;
