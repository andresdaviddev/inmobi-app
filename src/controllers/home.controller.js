const statements = require("../db/statements");
const conn = require("../db/bd.controller");
const fotos = [
  "https://new.informeinmobiliario.com/uploads/Apartamento-Venta-Medellin-Tropicario-apartamento6c13e.jpg",
  "https://lahaus.imgix.net/uploads/real_estate_attachment/picture/5031405/life_72_apartamentos_en_venta_en_quinta_camacho_de_1_2_hab_cover_f139da9fbaa952a5eb41.jpg?auto=compress%2Cenhance%2Cformat&w=1200&h=630&fit=crop&crop=edges&alt=Life%2072%2C%20Apartamentos%20en%20venta%20en%20Quinta%20Camacho%20de%201-2%20hab.",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqsi5nR3sVUY8F_dMHijF2SfWwEH4S00c3hw&usqp=CAU",
];


const controller = {
  index: (req, res) => {
    res.render('index');
  },

  home: async (req, res) => {
    const fullName = await statements.getFullName(req, res);
    let foto = Math.random() * 3;
    foto = Math.floor(foto);
    res.render("home", {
      img: fotos[foto],
      fullname: fullName.nombre + " " + fullName.apellido,
    });
  },

  profile: (req, res) => {
    res.render("profile");
  },

  newpost: (req, res) => {
    res.render("newpost");
  },
  // insercion de un nuevo post
  newpostPost: async (req, res) => {
    const fullName = await statements.getFullName(req, res);
    const id_persona = fullName.id_persona;
    const img = req.file.filename;
    const precio = req.body.price;
    const descripcion = req.body.descripcion;
    const extension = req.file.originalname.split('.').pop(); // obtiene la extensión del archivo
    const result = conn.query("INSERT INTO posts (img,precio,descripcion,id_persona) VALUES (?,?,?,?)", [img + '.' + extension, precio, descripcion, id_persona]);

    if (result) {
      res.redirect('home');
    } else {
      res.send('error ')
    }
    // console.log(req.file);
    // res.send('subida');
  },
  
  settings: async (req, res) => {
    const fullName = await statements.getFullName(req, res);
    res.render("settings", {
      fullname: fullName.nombre + " " + fullName.apellido,
    });
  },
  // subir correo y telefono
  settingsPost: async (req, res) => {
    const fullName = await statements.getFullName(req, res);
    const id = fullName.id_persona;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const result = await conn.query(
      "UPDATE persona SET telefono=?, correo=? WHERE id_persona=?",
      [telefono, email, id]
    );
    if (result.affectedRows > 0) {
      res.redirect("home");
    } else {
      res.send("error");
    }
  },
};

module.exports = controller;
