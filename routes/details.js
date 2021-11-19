const express = require("express");
const Wish = require("../models/wish");
const Cart = require("../models/cart");
const Product = require("../models/product");
const router = express.Router();

router.get("/", function (req, res, next) {
  Product.find((err, docs) => {
    if (!err) {
      res.render("list", {
        product: docs,
      });
    } else {
      console.log("Failed to retrieve the Course List: " + err);
    }
  });
});
module.exports = router;
