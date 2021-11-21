module.exports = function Carts(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  //fungsi menambahkan product ke cart
  this.add = function (item, id) {
    var storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
    if (this.items[id].qty < 5) {
      //menghitung jumlah, harga, total jumlah, total harga
      storedItem.qty++;
      storedItem.price = storedItem.item.price * storedItem.qty;
      this.totalQty++;
      this.totalPrice += storedItem.item.price;
    } else {
      console.log("Maksimal Pesanan");
    }
  };

  //fungsi untuk mengurangi sebuah product ke cart
  this.reduce = function (id) {
    this.items[id].qty--;
    this.items[id].price -= this.items[id].item.price;
    this.totalQty--;
    this.totalPrice -= this.items[id].item.price;
    //jika product dalam cart < 1, hapus product tersebut
    if (this.items[id].qty < 1) {
      delete this.items[id];
    }
  };

  //fungsi untuk menambahkan sebuah product ke cart
  this.increase = function (id) {
    if (this.items[id].qty < 5) {
      this.items[id].qty++;
      this.items[id].price += this.items[id].item.price;
      this.totalQty++;
      this.totalPrice += this.items[id].item.price;
    } else {
      console.log("Maksimal Pesanan");
    }
  };

  //fungsi untuk menyimpan object-object product dalam array
  this.generateArray = function () {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
