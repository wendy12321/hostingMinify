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
      ongkir: req.session.checkout.ongkir,
      potongan: req.session.checkout.potongan,
      pajak: req.session.checkout.pajak,
    };
    console.log(req.session);
    orderModel.count({}, async function (err, count) {
      order.pesanan = "Pesanan " + (count + 1);
      await orderModel.create(order);
    });
    console.log("Pesanan ditambahkan");
  },
};
