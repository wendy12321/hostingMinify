const express = require("express");
const Products = require("../models/product");
const Brands = require("../models/brand");
const Categories = require("../models/category");
const Orders = require("../models/order");

var Catalog = false; //variable untuk mengembalikan ke tab catalog setelah redirect
var brands;
var categories;
const router = express.Router();

router.get("/", async (req, res) => {
  //mengambil data prodik, kategori, brand, dan orderan yang ada di database
  brands = await Brands.find();
  categories = await Categories.find();
  const products = await Products.find();
  const orders = await Orders.find();
  Catalog = req.query.catalog;

  // merender page dashboard
  res.render("pages/dashboard", {
    brands,
    categories,
    products,
    orders,
    title: "Dashboard || Minify",
    Catalog,
  });
});

// fungsi untuk memfilter produk pada katalog dashboard
router.post("/filterProduct", async (req, res) => {
  //mengambil nama kategori dan brand, juga data orderan yang ada pada database
  const brands = await Brands.find({}, { nama: 1, _id: 0 });
  const categories = await Categories.find({}, { nama: 1, _id: 0 });
  const orders = await Orders.find();

  //jika filter kategori kosong, maka akan diisi nama dari semua kategori dari database
  if (req.body.category == undefined) {
    var result = [];

    categories.forEach((t) => {
      result.push(t.nama);
    });

    req.body.category = result;
  }

  //jika filter brand kosong, maka akan diisi nama darisemua brand dari database
  if (req.body.brand == undefined) {
    var result = [];

    brands.forEach((t) => {
      result.push(t.nama);
    });

    req.body.brand = result;
  }

  var products;

  //kondisi berdasarkan pilihan stok kosong dipilih atau tidak
  if (req.body.stock != undefined) {
    products = await Products.find({
      brand: req.body.brand,
      category: req.body.category,
      stock: 0,
    });
  } else {
    products = await Products.find({
      brand: req.body.brand,
      category: req.body.category,
    });
  }

  Catalog = true;
  // merender page dashboard
  res.render("pages/dashboard", {
    brands,
    categories,
    products,
    orders,
    title: "Dashboard || Minify",
    Catalog,
  });
});

module.exports = router;
