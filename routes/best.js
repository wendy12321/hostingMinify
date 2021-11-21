const express = require("express");
const Best = require("../models/best");
const Product = require("../models/product");
const router = express.Router();

router.get("/", function (req, res, next) {
  if (!req.session.best) {
    return res.render("pages/bestSeller", {
      products: 0,
      title: "Best Seller || Minify",
    });
  }
  var best = new Best(req.session.best);
  res.render("pages/bestSeller", {
    products: best.generateArray(),
    title: "Best Seller || Minify",
  });
});

router.get("/", async (req, res) => {
  if (!req.session.best) {
    return res.render("pages/bestSeller", { products: 0 });
  }
  var best = new Best(req.session.best);
  console.log(best.generateArray());
  res.render("pages/bestSeller", { products: best.generateArray() });
});

router.get("/remove-w/:id", (req, res, next) => {
  const productId = req.params.id;
  const best = new best(req.session.best ? req.session.best : {});

  best.removeItem(productId);
  req.session.best = best;
  res.redirect("/bestSeller");
});

module.exports = router;
