const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.post("/login", userController.login);
router.post("/register", userController.register);

router.get("/logout", async (req, res) => {
  req.session.isLoggedIn = false;
  req.session.cart = null;
  req.session.checkout = null;
  res.redirect("/homePage");
});

module.exports = router;
