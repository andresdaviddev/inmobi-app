const express = require('express');
const controller = require('../controllers/login.controler');
const app = express.Router();

app.get('/login', controller.loginGget);

app.post('/login', controller.loginPost);

module.exports = app;