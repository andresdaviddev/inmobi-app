const fotos = [
  "https://new.informeinmobiliario.com/uploads/Apartamento-Venta-Medellin-Tropicario-apartamento6c13e.jpg",
  "https://lahaus.imgix.net/uploads/real_estate_attachment/picture/5031405/life_72_apartamentos_en_venta_en_quinta_camacho_de_1_2_hab_cover_f139da9fbaa952a5eb41.jpg?auto=compress%2Cenhance%2Cformat&w=1200&h=630&fit=crop&crop=edges&alt=Life%2072%2C%20Apartamentos%20en%20venta%20en%20Quinta%20Camacho%20de%201-2%20hab.",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqsi5nR3sVUY8F_dMHijF2SfWwEH4S00c3hw&usqp=CAU"
];

const controller = {
  home: (req, res) => {
    let foto = Math.random() * 3;
    foto = Math.floor(foto);
    console.log(foto);
    res.render("home", {
      nombre: "Andres David Pacheco Cuadro",
      img: fotos[foto],
    });
  },
  profile: (req, res) => {
    res.render("profile");
  },
  newpost: (req, res) => {
    res.render("newpost");
  },
  settings: (req, res) => {
    res.render("settings");
  },
};

module.exports = controller;
