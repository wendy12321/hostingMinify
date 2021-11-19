const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: mongoose.SchemaTypes.Decimal128,
    required: false,
  },
});

module.exports = mongoose.model("Product", productSchema, "product");
