module.exports = function Best(oldBest) {
  this.items = oldBest.items || {};
  //atribut dengan nama items

  //function yang digunakan di routes index untuk menambahkan produk ke best seller
  this.add = function (item, id) {
    var storedItem = this.items[id];
    // storedItem
    if (!storedItem) {
      storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
  };

  //function yang digunakan di routes untuk menghapus produk dari best seller
  this.removeItem = function (id) {
    delete this.items[id];
  };

  //function yang digunakan di routes untuk generate array wishlist
  this.generateArray = function () {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    console.log(arr);
    return arr;
  };
};
