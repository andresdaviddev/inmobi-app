const constroller = {
  home: (req, res) => {
    res.render("home", {
      nombre: "Andres David Pacheco Cuadro",
      img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/284649054.jpg?k=1de619d25f769cac36f3d4f658eaeeeb1f357dcc4f60c45227b65744f58bd76d&o=&hp=1"
    });
  },
  profile: (req, res) => {
    res.render("profile");
  },
  newpost: (req,res)=>{
    res.render('newpost');
  }
};

module.exports = constroller;
