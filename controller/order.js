const orderModel = require("../models/order");

module.exports = {
  async addOrder(req, res) {
    var order = {
      address: req.body.address,
      payment: req.body.payment,
      items: req.session.cart.items,
      totalProduk: req.session.cart.totalQty,
      totalHarga: req.session.cart.totalPrice,
      hargaAkhir: req.session.checkout.totalValue,
    };
    console.log(req.session);
    await orderModel.create(order);
    console.log("Pesanan ditambahkan");
  },
};
