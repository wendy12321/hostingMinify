const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.post("/login", userController.login);
router.post("/register", userController.register);

router.get("/logout", async (req, res) => {
  req.session.isLoggedIn = false;
  //bersihkan session cart dan checkout ketika logout
  req.session.cart = null;
  req.session.checkout = null;
  req.session.wish = null;
  res.redirect("/");
});

module.exports = router;
