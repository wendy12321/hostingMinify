const categoryModel = require("../models/category");
const brandModel = require("../models/brand");
const url = require("url");

module.exports = {
  async addCategoryBrand(req, res) {
    // console.log(req.body);
    if (req.body.type == "category") {
      await categoryModel.create(req.body);
      console.log("Category ditambahkan");
    } else if (req.body.type == "brand") {
      await brandModel.create(req.body);
      console.log("Brand ditambahkan");
    }

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
