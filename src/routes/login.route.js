const express = require('express');
const controller = require('../controllers/login.controler');
const app = express.Router();

app.get('/login', controller.loginGget);

app.post('/login', controller.loginPost);

app.get('/signup', controller.signup);

app.post('/signup', controller.signupPost);

module.exports = app;