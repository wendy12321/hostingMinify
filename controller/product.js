const productModel = require("../models/product");
const categoryModel = require("../models/category");
const brandModel = require("../models/brand");
const url = require("url");

module.exports = {
  // fungsi untuk menambahkan produk
  async addProduct(req, res) {
    //mengubah file gambar yang diupload menjadi format path dari file
    var imagepath;
    if (req.body.fotoProduk == "") {
      imagepath = "/public/image/noImage.jpg";
    } else {
      imagepath = "/public/image/" + req.body.fotoProduk;
    }

    ///membuat sebuah variabel baru
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
    // menambahkan produk ke database
    await productModel.create(product);
    console.log("product ditambahkan");

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

  //fungsi untuk mendapatkan data dari produk yang dipilih
  async getProduct(req, res) {
    //produk dicari berdasarkan _id produk
    const productId = req.params.id;

    const product = await productModel.findOne({
      _id: productId,
    });

    const categories = await categoryModel.find();
    const brands = await brandModel.find();
    const imgPath = product.image;

    //merender page edit produk
    res.render("pages/editProduct", {
      product: product,
      categories: categories,
      brands: brands,
      imgPath,
      title: `edit ${product.name}`,
    });
  },

  //fungsi untuk mengedit produk
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

    // mencari produk dan mengeditnya
    await productModel.findOneAndUpdate(
      {
        _id: productId,
      },
      product
    );
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

  async deleteProduct(req, res) {
    const productId = req.params.id;

    //mecari prooduk berdasarkan -id dan menghapusnya
    await productModel.findOneAndRemove(
      {
        _id: productId,
      },
      req.body
    );

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
