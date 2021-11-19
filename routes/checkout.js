const express = require("express");
const Carts = require("../models/cart");
const router = express.Router();
const Checkout = require("../models/checkout");
const Order = require("../models/order");

router.get("/", function (req, res, next) {
  if (!req.session.cart) {
    res.redirect("/cart");
  }
  var cart = new Carts(req.session.cart);
  var checkout = new Checkout(req.session.checkout ? req.session.checkout : {});
  res.render("pages/checkout", {
    totalPrice: cart.totalPrice,
    products: cart.generateArray(),
    checkout,
    title: "Checkout || Minify",
  });
});

router.get("/kurir/:id", (req, res) => {
  id = req.params.id;
  const checkout = new Checkout(
    req.session.checkout ? req.session.checkout : {}
  );
  checkout.kurir(id);
  var totalValue =
    req.session.cart.totalPrice +
    checkout.ongkir +
    checkout.pajak -
    checkout.potongan;
  checkout.totalValue = totalValue;
  req.session.checkout = checkout;
  res.send({ checkout, totalValue });
});

const userController = require("../controller/order");

router.post("/addOrder", (req, res) => {
  if (!req.session.cart) {
    res.redirect("/cart");
  }
  const checkout = new Checkout(
    req.session.checkout ? req.session.checkout : {}
  );
  checkout.alamat = req.body.address;
  checkout.bayar = req.body.payment;
  var totalValue =
    req.session.cart.totalPrice +
    checkout.ongkir +
    checkout.pajak -
    checkout.potongan;
  checkout.totalValue = totalValue;
  req.session.checkout = checkout;
  userController.addOrder(req, res);
  req.session.cart = null;
  req.session.checkout = null;
  res.redirect("/payment");
});
module.exports = router;
