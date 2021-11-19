const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.post("/login", userController.login);
router.post("/register", userController.register);

router.get("/logout", async (req, res) => {
  req.session.isLoggedIn = false;
  res.redirect("/homePage");
});

module.exports = router;
