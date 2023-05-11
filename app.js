// requirinedo modulos
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const flash = require('connect-flash');
const path = require("path");
const ejs = require("ejs");
const app = express();
const port = 3000;
const conn = require("./src/db/bd.controller");
// requiriendo vistas
const rutalogin = require("./src/routes/login.route");
const rutahome = require("./src/routes/home.route");

// flash
app.use(flash());

// express middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static("src/public"));
app.use(morgan("dev"));
// 
// express session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
// varibales globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// usando vistas requeridas/importadas
app.use(rutalogin);
app.use(rutahome);

// escuha del server
app.listen(port, () => {
  console.log(`server on port ${port}`);
});
