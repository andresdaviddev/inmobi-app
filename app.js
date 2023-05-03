// requirinedo modulos
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const ejs = require('ejs');
const app = express();
const port = 3000;
// requiriendo vistas
const rutalogin = require('./src/routes/login.route');
const rutahome = require('./src/routes/home.route');

// express settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'src/views'));
app.use(express.static('src/public'));
app.use(morgan('dev'));

// usando vistas requeridas/importadas
app.use(rutalogin);
app.use(rutahome);

// escuha del server
app.listen(port, ()=>{console.log(`server on port ${port}`)});