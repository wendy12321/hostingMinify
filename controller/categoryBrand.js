const categoryModel = require("../models/category");
const brandModel = require("../models/brand");
const url = require("url");

module.exports = {
  // fungsi untuk menambah kategori atau brand ke database
  async addCategoryBrand(req, res) {
    if (req.body.type == "category") {
      await categoryModel.create(req.body);
      console.log("Category ditambahkan");
    } else if (req.body.type == "brand") {
      await brandModel.create(req.body);
      console.log("Brand ditambahkan");
    }
    //me-redirect kembali ke dashboard pada tab catalog
    var catalog = true;
    res.redirect(
      url.format({
        pathname: "/dashboard",
        query: {
          catalog,
        },
      })
    );
  },
};
