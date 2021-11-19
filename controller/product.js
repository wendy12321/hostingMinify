const productModel = require("../models/product");
const url = require("url");

module.exports = {
  async addProduct(req, res) {
    await productModel.create(req.body);
    console.log("product ditambahkan");
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
