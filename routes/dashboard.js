const express = require("express");
const Products = require("../models/product");
const Brands = require("../models/brand");
const Categories = require("../models/category");
const Orders = require("../models/order");
var Catalog = false;
var brands;
var categories;
const router = express.Router();

router.get("/", async (req, res) => {
  brands = await Brands.find();
  categories = await Categories.find();
  const products = await Products.find();
  const orders = await Orders.find();
  Catalog = req.query.catalog;

  res.render("pages/dashboard", {
    brands,
    categories,
    products,
    orders,
    title: "Dashboard || Minify",
    Catalog,
  });
});

router.post("/filterProduct", async (req, res) => {
  console.log(req.body);
  const brands = await Brands.find({}, { nama: 1, _id: 0 });
  const categories = await Categories.find({}, { nama: 1, _id: 0 });
  const orders = await Orders.find();

  if (req.body.category == undefined) {
    var result = [];

    categories.forEach((t) => {
      result.push(t.nama);
    });

    req.body.category = result;
  }
  if (req.body.brand == undefined) {
    var result = [];

    brands.forEach((t) => {
      result.push(t.nama);
    });

    req.body.brand = result;
  }
  var products;
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
