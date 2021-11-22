const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

//function diarahkan ke controller
router.post("/addProduct", productController.addProduct);

router.get("/:id", productController.getProduct);

router.post("/edit/:id", productController.editProduct);

router.post("/delete/:id", productController.deleteProduct);

module.exports = router;
