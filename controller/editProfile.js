const userModel = require("../models/user");

module.exports = {
  //fungsi edit profile
  async editProfile(req, res) {
    var imagepath;
    //jika user tidak upload foto profil
    if (req.body.fotoProfil == "") {
      //setting ke foto lama atau foto default
      imagepath = req.body.imgPathLama;
    } else {
      //jika upload foto, pakai foto tersebut
      imagepath = "/public/image/" + req.body.fotoProfil;
    }
    //object yang menyimpan isi session user untuk diedit, ambil data dari user
    console.log(req.body);
    var userEdit = {
      //ambil data dari form edit
      imagePath: imagepath,
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
      password: req.body.password,
      gender: req.body.gender,
      phone: req.body.phone,
      //dari frontend, date diubah lagi formatnya untuk disimpan ke backend
      birthDate: new Date(req.body.birthDate).toISOString(),
    };
    //cari user untuk diupdate berdasarkan email unik
    await userModel.findOneAndUpdate({ email: req.body.email }, userEdit);
    //update semua data yang ada di variabel userEdit
    req.session.user = { ...userEdit, type: req.session.user.type };
    //update ulang user.birthDate menjadi body.birthDate untuk ditampilkan ke frontend
    req.session.user.birthDate = req.body.birthDate;
    console.log("Profile berhasil diedit");
    res.redirect("/profile");
  },
};
