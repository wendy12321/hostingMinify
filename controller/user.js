const userModel = require("../models/user");

//fungsi untuk convert tanggal dari backend untuk ditampilkan ke frontend
let convertDate = (datep) => {
  date = new Date(datep);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  dt = date.getDate();
  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + dt;
};
module.exports = {
  async login(req, res) {
    // get user input
    const email = req.body.email;
    const password = req.body.password;

    //mencari user di database
    const user = await userModel.findOne({
      email: email,
    });

    // jika user belum terdaftar
    if (!user) {
      res.render("pages/login", {
        error: "User is not found",
        title: "Login || Minify",
      });
    }
    const userPassword = user.password;
    //kondisi untuk tipe user
    if (email === "MinifyAdmin@mail.com" && password === "admin") {
      req.session.user = {
        type: "admin",
        imagePath: user.imagePath,
      };
      req.session.isLoggedIn = true;
      res.redirect("/");
    } else if (password === userPassword) {
      req.session.user = {
        imagePath: user.imagePath,
        type: "customer",
        username: user.username,
        email: user.email,
        address: user.address,
        password: userPassword,
        gender: user.gender,
        phone: user.phone,
        //user.birthDate diconvert agar format bisa ditampilkan ke front end dalam type: date
        birthDate: convertDate(user.birthDate),
      };
      req.session.isLoggedIn = true;
      res.redirect("/");
    } else {
      res.render("pages/login", {
        error: "Wrong username or Password",
        title: "Login || Minify",
      });
    }
  },

  // fungsi untuk register akun baru
  async register(req, res) {
    //ambil semua data dalam form register simpan ke object user, set foto profil default untuk user baru
    var user = { ...req.body, imagePath: "/public/image/user.svg" };
    await userModel.create(user);

    res.redirect("/login");
  },
};
