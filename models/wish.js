module.exports = function Wish(oldWish) {
  //atribut dengan nama items
  this.items = oldWish.items || {};

  // function yang digunakan di routes untuk menambahkan product ke wishlist
  this.add = function (item, id) {
    var storedItem = this.items[id];
    // storedItem
    if (!storedItem) {
      storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
  };

  // function yang digunakan di routes untuk remove product dari wishlist
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
