const express = require('express');
const controller = require('../controllers/login.controler');
const app = express.Router();

app.all('/login', controller.login);

module.exports = app;