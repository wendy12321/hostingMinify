const userModel = require("../models/user");

module.exports = {
  async login(req, res) {
    // get user input
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
      email: email,
    });

    if (!user) {
      res.render("pages/login", {
        error: "User is not found",
        title: "Login || Minify",
      });
    }

    const userPassword = user.password;
    if (email === "MinifyAdmin@mail.com" && password === "admin") {
      req.session.user = "admin";
      req.session.isLoggedIn = true;
      res.redirect("/homePage");
    } else if (password === user.password) {
      req.session.user = "customer";
      req.session.isLoggedIn = true;
      res.redirect("/homePage");
    } else {
      res.render("pages/login", {
        error: "Wrong username or Password",
        title: "Login || Minify",
      });
    }
  },
  async register(req, res) {
    await userModel.create(req.body);

    res.redirect("/login");
  },
};
