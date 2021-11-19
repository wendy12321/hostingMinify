module.exports = function Checkout(checkout) {
  this.ongkir = checkout.ongkir || 0;
  this.pilih = checkout.pilih || null;
  this.alamat = checkout.alamat || null;
  this.bayar = checkout.bayar || null;
  this.kirim = checkout.kirim || null;
  this.pajak = 5000;
  this.potongan = 3000;

  this.kurir = function (id) {
    this.kirim = id;
    if (id == "tiki") {
      this.ongkir = 5000;
      this.pilih = "TIKI";
    } else if (id == "jne") {
      this.ongkir = 10000;
      this.pilih = "JNE";
    } else {
      this.ongkir = 0;
      this.pilih = null;
    }
  };
};
