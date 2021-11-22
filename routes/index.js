const express = require("express");
const Products = require("../models/product");
const Brands = require("../models/brand");
const Categories = require("../models/category");
const Carts = require("../models/cart");
const Wish = require("../models/wish");
const Orders = require("../models/order");
const Best = require("../models/best");

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Categories.find();
  res.render("pages/index", { categories, title: "Home Page || Minify" });
});

router.get("/login", (req, res) => {
  res.render("pages/logIn", { title: "Login || Minify" });
});

router.get("/checkout", (req, res) => {
  res.render("pages/checkout", { title: "Checkout || Minify" });
});
router.get("/payment", (req, res) => {
  res.render("pages/payment", { title: "Payment || Minify" });
});
router.get("/myorder", async (req, res) => {
  //cari orderan dari db
  var order = await Orders.find();
  res.render("pages/myorder", { orders: order, title: "My Order || Minify" });
});
router.get("/myOrderDetails/:id", async (req, res) => {
  try {
    //cari detail order berdasar id orderan
    await Orders.findById(req.params.id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        //data dimasukan dalam orders
        res.render("pages/myOrderDetails", {
          orders: data,
          title: "My Order Details || Minify",
        });
      }
    });
    //catch unhandled promise
  } catch (e) {}
});
router.get("/message", (req, res) => {
  res.render("pages/message", { title: "Message || Minify" });
});

router.get("/chat-room", (req, res) => {
  res.render("pages/chatRoom", { title: "Chat Room || Minify" });
});

//menampilkan page profile yg datanya diambil dari db
router.get("/profile", (req, res) => {
  res.render("pages/profile", {
    //masukkan session user login dalam user
    user: req.session.user,
    title: "Profile || Minify",
  });
});

//menampilkan page edit profile yg datanya diambil dari db
router.get("/editProfile", (req, res) => {
  res.render("pages/editProfile", {
    //masukkan session user login dalam user
    user: req.session.user,
    title: "Edit Profile || Minify",
  });
});

router.get("/HowToOrder", (req, res) => {
  res.render("pages/HowToOrder", { title: "How To Order || Minify" });
});

router.get("/Terms", (req, res) => {
  res.render("pages/Terms", { title: "Terms || Minify" });
});

router.get("/FAQ", (req, res) => {
  res.render("pages/FAQ", { title: "FAQ || Minify" });
});

router.get("/verificationcode", (req, res) => {
  res.render("pages/verificationcode", {
    title: "Verification Code || Minify",
  });
});

router.get("/edit-product", (req, res) => {
  res.render("pages/editProduct", { title: "Edit Product || Minify" });
});

//untuk menampilkan page product dan semua product yang ada
router.get("/product", async (req, res) => {
  //mengambil data produk, kategori, dan brand yang ada pada database
  var data = await Products.find();
  const brands = await Brands.find({}, { nama: 1, _id: 0 });
  const categories = await Categories.find({}, { nama: 1, _id: 0 });

  //merender page product dan mengirim data produk, kategori, dan brand
  res.render("pages/product", {
    products: data,
    brands,
    categories,
    title: "Product || Minify",
  });
});

router.post("/productFilter", async (req, res) => {
  var data;
  //mengambil data kategori, dan brand yang ada pada database
  const brands = await Brands.find({}, { nama: 1, _id: 0 });
  const categories = await Categories.find({}, { nama: 1, _id: 0 });
  var maxPrice;

  //jika filter kategori kosong, maka akan diisi nama dari semua kategori dari database
  if (req.body.category == undefined) {
    var result = [];

    categories.forEach((t) => {
      result.push(t.nama);
    });

    req.body.category = result;
  }
  //jika filter brand kosong, maka akan diisi nama dari semua brand dari database
  if (req.body.brand == undefined) {
    var result = [];

    brands.forEach((t) => {
      result.push(t.nama);
    });

    req.body.brand = result;
  }
  //jika filter harga minimum kosong
  if (req.body.minPrice == "" || req.body.minPrice == undefined) {
    req.body.minPrice = 0;
  }

  //jika filter harga maximum kosong, harga diganti menjadi harga paling tinggi dari database
  if (req.body.maxPrice == "" || req.body.maxPrice == undefined) {
    maxPrice = await Products.find({}, { price: 1, _id: 0 })
      .sort({ price: -1 })
      .limit(1);
    req.body.maxPrice = maxPrice[0].price;
  }

  //function untuk sort data product yang telah didapat
  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  //pengambilan data product berdasarkan filter
  data = await Products.find({
    brand: req.body.brand,
    category: req.body.category,
    $and: [
      { price: { $gte: req.body.minPrice } },
      { price: { $lte: req.body.maxPrice } },
    ],
  });

  //switch case sorting
  switch (req.body.sortBy) {
    case "Rate":
      data.sort(dynamicSort("rating"));
      break;
    case "hiPrice":
      data.sort(dynamicSort("-price"));
      break;
    case "loPrice":
      data.sort(dynamicSort("price"));
      break;
    default:
      data.sort(dynamicSort("rating"));
      break;
  }
  //merender page product dan mengirim data produk yang sudah di-filter, kategori, dan brand
  res.render("pages/product", {
    products: data,
    brands,
    categories,
    title: "Product || Minify",
  });
});

//untuk menampilkan page details. Details dari product yang di pilih
router.get("/details/:id", async (req, res) => {
  var productId = req.params.id;
  var data = await Products.findById(productId);

  res.render("pages/details", {
    products: data,
    title: "Product || Minify",
  });
});

//untuk menambahkan produk ke dalam best seller
router.get("/add-to-best/:id", (req, res, next) => {
  const productId = req.params.id;
  const best = new Best(req.session.best ? req.session.best : {});

  Products.findById(productId, function (err, product) {
    if (err) {
      return res.redirect("/dashboard");
    }
    best.add(product, product.id);
    req.session.best = best;
    console.log(req.session.best);
    res.redirect("/dashboard");
  });
});

//menampilkan semua product yang ada di session.cart
router.get("/cart", (req, res) => {
  res.render("pages/cart", { title: "Cart || Minify" });
});

//untuk menampilkan page new arrival dan semua product yang ada
router.get("/newArrival", async (req, res) => {
  var data = await Products.find();
  res.render("pages/newArrival", {
    products: data,
    title: "New Arrival || Minify",
  });
});

router.get("/Company", (req, res) => {
  res.render("pages/Company", { title: "Company || Minify" });
});

//menampilkan page register
router.get("/register", (req, res) => {
  res.render("pages/register", { title: "Register || Minify" });
});

//untuk menambahkan product ke wishlist
router.get("/add-to-wish/:id", (req, res, next) => {
  const productId = req.params.id;
  const wish = new Wish(req.session.wish ? req.session.wish : {});
  //mengecek apakah sudah login atau belum
  //kalau sudah produk dimasukan ke wishlist
  if (req.session.isLoggedIn) {
    Products.findById(productId, function (err, product) {
      if (err) {
        return res.redirect("/product");
      }
      wish.add(product, product.id);
      req.session.wish = wish;
      console.log(req.session.wish);
      res.redirect("/product");
    });
  } else {
    //kalau belum akan di arahkan ke page login
    res.redirect("/login");
  }
});

router.get("/changepassword", (req, res) => {
  res.render("pages/changepassword", { title: "Change Password || Minify" });
});

router.get("/forgetpassword", (req, res) => {
  res.render("pages/forgetpassword", { title: "Forget Password || Minify" });
});

//menambahkan product ke dalam session cart berdasarkan id productnya
router.get("/add-to-cart/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Carts(req.session.cart ? req.session.cart : {});
  //jika user sudah login
  if (req.session.isLoggedIn) {
    //cari id dari product yang ingin ditambah ke cart
    Products.findById(productId, function (err, product) {
      if (err) {
        return res.redirect("/product");
      }
      //fungsi untuk menambahkan product ke cart
      cart.add(product, product.id);
      //update session cart
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect("/product");
    });
    //jika user belum login, arahkan ke page /login
  } else {
    res.redirect("/login");
  }
});

//untuk menambah sebuah product ke cart dan langsung ke page /checkout
router.get("/buyNow/:id", (req, res) => {
  const productId = req.params.id;
  const cart = new Carts(req.session.cart ? req.session.cart : {});
  //jika user sudah login
  if (req.session.isLoggedIn) {
    Products.findById(productId, function (err, product) {
      if (err) {
        return res.redirect("/product");
      }
      //tambah product ke cart
      cart.add(product, product.id);
      //update session
      req.session.cart = cart;
      console.log(req.session.cart);
      //langsung ke checkout
      res.redirect("/checkout");
    });
    //jika user belum login
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
