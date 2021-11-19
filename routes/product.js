const express = require("express");
const router = express.Router();

const userController = require("../controller/product");

router.post("/addProduct", userController.addProduct);

module.exports = router;
