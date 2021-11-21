const express = require("express");
const router = express.Router();

const editController = require("../controller/editProfile");
//method post dari page /editProfile
router.post("/", editController.editProfile);

module.exports = router;
