const express = require("express");
const Carts = require("../models/cart");
const router = express.Router();
const Checkout = require("../models/checkout");

//router render page /checkout
router.get("/", function (req, res, next) {
  //jika belum ada session, arahkan ke page /cart
  if (!req.session.cart) {
    res.redirect("/cart");
  }
  //jika ada, buat session cart dan checkout baru simpan dalam object
  var cart = new Carts(req.session.cart);
  var checkout = new Checkout(req.session.checkout ? req.session.checkout : {});
  res.render("pages/checkout", {
    //render object-object yang dibutuhkan page
    totalPrice: cart.totalPrice,
    products: cart.generateArray(),
    checkout,
    title: "Checkout || Minify",
  });
});

//router render page /kurir/:id
router.get("/kurir/:id", (req, res) => {
  //ambil id product dari url, simpan dalam id
  id = req.params.id;
  const checkout = new Checkout(
    req.session.checkout ? req.session.checkout : {}
  );
  //fungsi untuk menentukan ongkir berdasarkan id kurir yang dipilih
  checkout.kurir(id);
  //hitung harga akhir
  var totalValue =
    req.session.cart.totalPrice +
    checkout.ongkir +
    checkout.pajak -
    checkout.potongan;
  checkout.totalValue = totalValue;
  req.session.checkout = checkout;
  //kirim hasil hitung dan object checkout untuk dirender
  res.send({ checkout, totalValue });
});

const userController = require("../controller/order");

//router post untuk membuat pesanan baru
router.post("/addOrder", (req, res) => {
  //jika belum ada session, arahkan ke page /cart
  if (!req.session.cart) {
    res.redirect("/cart");
  }
  const checkout = new Checkout(
    req.session.checkout ? req.session.checkout : {}
  );
  checkout.alamat = req.body.address;
  checkout.bayar = req.body.payment;
  //hitung harga akhir
  var totalValue =
    req.session.cart.totalPrice +
    checkout.ongkir +
    checkout.pajak -
    checkout.potongan;
  checkout.totalValue = totalValue;
  //update session checkout
  req.session.checkout = checkout;
  //fungsi tambah pesanan
  userController.addOrder(req, res);
  //kosongkan session cart dan checkout setelah pesanan ditambah
  req.session.cart = null;
  req.session.checkout = null;
  //arahakan ke /payment
  res.redirect("/payment");
});
module.exports = router;
