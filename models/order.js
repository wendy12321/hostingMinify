const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
  totalProduk: {
    type: Number,
    required: true,
  },
  totalHarga: {
    type: Number,
    required: true,
  },
  hargaAkhir: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Order", orderSchema, "order");
