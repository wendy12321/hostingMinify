const express = require("express");
const router = express.Router();
const Carts = require("../models/cart");

// router render page /cart
router.get("/", function (req, res, next) {
  //jika belum ada session, tampilkan tidak ada product
  if (!req.session.cart) {
    return res.render("pages/cart", {
      products: 0,
      title: "Cart || Minify",
    });
  }
  //jika ada, buat session cart baru simpan dalam object
  var cart = new Carts(req.session.cart);
  res.render("pages/cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
    totalQty: cart.totalQty,
    title: "Cart || Minify",
  });
});

//router render page /reduce/:id
router.get("/reduce/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Carts(req.session.cart ? req.session.cart : {});
  //fungsi kurangi jumlah produk dalam cart
  cart.reduce(productId);
  req.session.cart = cart;
  res.redirect("/cart");
});

//router render page /increase/:id
router.get("/increase/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Carts(req.session.cart ? req.session.cart : {});
  //fungsi tambah jumlah produk dalam cart
  cart.increase(productId);
  req.session.cart = cart;
  res.redirect("/cart");
});

module.exports = router;
