const mongoose = require("mongoose");

//skema pesanan
const orderSchema = mongoose.Schema({
  pesanan: {
    type: String,
    required: true,
  },
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
  ongkir: {
    type: Number,
    required: true,
  },
  potongan: {
    type: Number,
    required: true,
  },
  pajak: {
    type: Number,
    required: true,
  },
  hargaAkhir: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Order", orderSchema, "order");
