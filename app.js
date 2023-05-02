const express = require('express');
const morgan = require('morgan');
const path = require('path');
const ejs = require('ejs');
const app = express();
const port = 3000;
const router = require('./src/routes/rutasSignup');


// express settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'src/views'));
app.use(express.static('src/public'));
app.use(morgan('dev'));

app.use(router);

app.listen(port, ()=>{console.log(`server on port ${port}`)});