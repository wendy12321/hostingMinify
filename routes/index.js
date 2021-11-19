const express = require("express");
const Products = require("../models/product");
const Brands = require("../models/brand");
const Categories = require("../models/category");
const Carts = require("../models/cart");
const Wish = require("../models/wish");
var Catalog = false;

const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index", { title: "Document" });
});

router.get("/login", (req, res) => {
  res.render("pages/login", { title: "Login || Minify" });
});

router.get("/homePage", async (req, res) => {
  const categories = await Categories.find();
  res.render("pages/homePage", { categories, title: "Home Page || Minify" });
});
router.get("/checkout", (req, res) => {
  res.render("pages/checkout", { title: "Checkout || Minify" });
});
router.get("/payment", (req, res) => {
  res.render("pages/payment", { title: "Payment || Minify" });
});
router.get("/myorder", (req, res) => {
  res.render("pages/myorder", { title: "My Order || Minify" });
});
router.get("/myOrderDetails", (req, res) => {
  res.render("pages/myOrderDetails", { title: "My Order Details || Minify" });
});
router.get("/message", (req, res) => {
  res.render("pages/message", { title: "Message || Minify" });
});
router.get("/dashboard", async (req, res) => {
  const brands = await Brands.find();
  const categories = await Categories.find();
  const products = await Products.find();
  Catalog = req.query.catalog;

  res.render("pages/dashboard", {
    brands,
    categories,
    products,
    title: "Dashboard || Minify",
    Catalog,
  });
});

router.get("/filterProduct", async (req, res) => {
  console.log(req.body);
  const brands = await Brands.find({}, { nama: 1, _id: 0 });
  const categories = await Categories.find({}, { nama: 1, _id: 0 });

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
  console.log(req.body.brand);

  const products = await Products.find({
    brand: req.body.brand,
    category: req.body.category,
  });

  next();

  // products.forEach((p) => {
  //   console.log(p);
  // });
  // res.send();
  // res.redirect("/dashboard");
  // res.status(200);
  // res.redirect("/dashboard");
  // res.json(products);
  // res.render("pages/dashboard", {
  //   products,
  // });
});

router.get("/chat-room", (req, res) => {
  res.render("pages/chatRoom", { title: "Chat Room || Minify" });
});

router.get("/profile", (req, res) => {
  res.render("pages/profile", { title: "Profile || Minify" });
});

router.get("/edit-profile", (req, res) => {
  res.render("pages/editProfile", { title: "Edit Profile || Minify" });
});

router.get("/HowToOrder", (req, res) => {
  res.render("pages/HowToOrder", { title: "How To Order || Minify" });
});

router.get("/Terms", (req, res) => {
  res.render("pages/Terms", { title: "Terms || Minify" });
});

router.get("/FAQ", (req, res) => {
  res.render("pages/FAQ", { title: "FAQ || Minify" });
});

router.get("/verificationcode", (req, res) => {
  res.render("pages/verificationcode", {
    title: "Verification Code || Minify",
  });
});

router.get("/edit-product", (req, res) => {
  res.render("pages/editProduct", { title: "Edit Product || Minify" });
});

router.get("/product", async (req, res) => {
  var data = await Products.find();
  res.render("pages/product", { products: data, title: "Product || Minify" });
});

router.get("/best", (req, res) => {
  res.render("pages/best", { title: "Best || Minify" });
});

router.get("/cart", (req, res) => {
  res.render("pages/cart", { title: "Cart || Minify" });
});

router.get("/newArrival", (req, res) => {
  res.render("pages/newArrival", { title: "New Arrival || Minify" });
});

router.get("/Company", (req, res) => {
  res.render("pages/Company", { title: "Company || Minify" });
});

router.get("/register", (req, res) => {
  res.render("pages/register", { title: "Register || Minify" });
});

router.get("/details/:id", (req, res) => {
  const productId = req.params.id;

  Products.findById(productId, function (err, product) {
    Products.add(product, product.id);
    res.redirect("/details");
  });
});

router.get("/add-to-wish/:id", (req, res, next) => {
  const productId = req.params.id;
  const wish = new Wish(req.session.wish ? req.session.wish : {});

  if (req.session.isLoggedIn) {
    Products.findById(productId, function (err, product) {
      if (err) {
        return res.redirect("/product");
      }
      wish.add(product, product.id);
      req.session.wish = wish;
      console.log(req.session.wish);
      res.redirect("/product");
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/changepassword", (req, res) => {
  res.render("pages/changepassword", { title: "Change Password || Minify" });
});

router.get("/forgetpassword", (req, res) => {
  res.render("pages/forgetpassword", { title: "Forget Password || Minify" });
});

router.get("/add-to-cart/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Carts(req.session.cart ? req.session.cart : {});

  if (req.session.isLoggedIn) {
    Products.findById(productId, function (err, product) {
      if (err) {
        return res.redirect("/product");
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect("/product");
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
