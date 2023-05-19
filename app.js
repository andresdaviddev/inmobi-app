// requirinedo modulos
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const flash = require('connect-flash');
const multer = require('multer');
const { v4 } = require('uuid');
const path = require("path");
const ejs = require("ejs");
const app = express();
const port = 3000;
const conn = require("./src/db/bd.controller");
// requiriendo vistas
const rutalogin = require("./src/routes/login.routes");
const rutahome = require("./src/routes/home.routes");

// express session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// flash
app.use(flash());

// express middlewares
app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(morgan("dev"));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "src", "public", "uploads"),
  filename: (req, file, cb) => {
    const fileName = v4() + path.extname(file.originalname);
    cb(null, fileName);
  }
})

app.use(multer({
  storage,
  fileFilter: (req, file, call) => {
    const fileTypes = /jpeg|png|jpg|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extName) {
      return call(null, true)
    } else {
      call('error');
    }
  }

}).single('image'))

// varibales globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error = req.flash('error');
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
