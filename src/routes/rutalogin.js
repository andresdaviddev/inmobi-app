const express = require('express');
const app = express.Router();

app.all('/',(req,res)=>{
    res.render('login');
})

app.get('/home',(req,res)=>{
    res.render('home');
})

module.exports = app;