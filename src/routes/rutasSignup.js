const express = require('express');
const app = express.Router();

app.all('/',(req,res)=>{
    res.render('loggin');
})

module.exports = app;