const productModel = require("../models/product");
const categoryModel = require("../models/category");
const brandModel = require("../models/brand");
const url = require("url");

module.exports = {
  async addProduct(req, res) {
    var imagepath;
    console.log(req.body.fotoProduk);
    if (req.body.fotoProduk == "") {
      imagepath = "/public/image/noImage.jpg";
    } else {
      imagepath = "/public/image/" + req.body.fotoProduk;
    }

    var product = {
      image: imagepath,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      stock: req.body.stock,
      description: req.body.description,
      rating: req.body.rating,
    };
    await productModel.create(product);
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

  async getProduct(req, res) {
    const productId = req.params.id;

    const product = await productModel.findOne({
      _id: productId,
    });

    const categories = await categoryModel.find();
    const brands = await brandModel.find();
    const imgPath = product.image;

    res.render("pages/editProduct", {
      product: product,
      categories: categories,
      brands: brands,
      imgPath,
      title: `edit ${product.name}`,
    });
  },

  async editProduct(req, res) {
    const productId = req.params.id;

    var imagepath;
    if (req.body.fotoProduk == "") {
      imagepath = req.body.imgPathLama;
    } else {
      imagepath = "/public/image/" + req.body.fotoProduk;
    }
    var product = {
      image: imagepath,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      stock: req.body.stock,
      description: req.body.description,
      rating: req.body.rating,
    };
    await productModel.findOneAndUpdate(
      {
        _id: productId,
      },
      product
    );

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

  async deleteProduct(req, res) {
    const productId = req.params.id;

    await productModel.findOneAndRemove(
      {
        _id: productId,
      },
      req.body
    );

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
