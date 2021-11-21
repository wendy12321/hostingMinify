const express = require("express");
const router = express.Router();

const userController = require("../controller/categoryBrand");

router.post("/addCategoryBrand", userController.addCategoryBrand);

module.exports = router;
