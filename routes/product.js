const express = require("express");
const router = express.Router();
const productController = require("../controller/product");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "G:/UNTAR SEM 3/Web Programming/Group Project/UAS/public/image");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });
// upload.single("fotoProduk"),

router.post("/addProduct", productController.addProduct);

router.get("/:id", productController.getProduct);

router.post("/edit/:id", productController.editProduct);

router.post("/delete/:id", productController.deleteProduct);

module.exports = router;
