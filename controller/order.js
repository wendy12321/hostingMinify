const orderModel = require("../models/order");

module.exports = {
  //fungsi untuk menambah pesanan ke database
  async addOrder(req, res) {
    var order = {
      //ambil data dari form dan session
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
    //fungsi untuk menghitung pesanan ke berapa yang telah dibuat di database
    orderModel.count({}, async function (err, count) {
      //memberi nama pesanan
      order.pesanan = "Pesanan " + (count + 1);
      //buat pesanan
      await orderModel.create(order);
    });
    console.log("Pesanan ditambahkan");
  },
};
