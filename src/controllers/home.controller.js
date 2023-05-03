const constroller = {
  home: (req, res) => {
    res.render("home");
  },
  profile: (req, res) => {
    res.render("profile");
  }
};

module.exports = constroller;
