const Product = require("../models/product");
const User = require("../models/user");
const Message = require("../models/message");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Minify:zsXWMuraB0Hozzxc@cluster0.bf5ez.mongodb.net/Minify?retryWrites=true&w=majority",
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database terhubung untuk seeding");
    }
  }
);

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save((err, res) => {
    done++;
    if (done == products.length) {
      console.log("Product berhasil diupload");
      mongoose.disconnect();
    }
  });
}
