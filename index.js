const path = require("path");
const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const Categories = require("./models/category");
const app = express();
const PORT = process.env.PORT || 3000;

// menggunakan layout
app.use(layouts);
app.set("layout", path.join(__dirname, "views/layouts/main.ejs"));
// mengekstrak script dan style dari page ejs
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(bodyParser.urlencoded());

app.use(
  session({
    secret: "stringacak",
    cookie: {},
  })
);

app.use(express.static("public"));
app.use("/public", express.static("public"));
app.set("view engine", "ejs");

//menyambungkan aplikasi dengan database mongodb
mongoose.connect(
  "mongodb+srv://minify:minify1234@cluster0.nodgj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (err, res) => {
    if (err) {
      console.error(err);
      console.log("not connect");
    } else {
      console.log("Database terhubung");
    }
  }
);
const db = mongoose.connection;

//menginisialisasi router untuk digunakan
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const categoryBrandRouter = require("./routes/categoryBrand");
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes/checkout");
const wishRouter = require("./routes/wish");
const dashboardRouter = require("./routes/dashboard");
const bestRouter = require("./routes/best");
const editProfileRouter = require("./routes/editprofile");

//function untuk menyimpan status login user pada variabel global
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  next();
});
//function untuk menyimpan jenis user yang login pada variabel global
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});
//function untuk menyimpan kategori produk yang ada pada variabel global
app.use(async (req, res, next) => {
  res.locals.categories = await Categories.find({}, { nama: 1, _id: 0 });
  next();
});

//menggunakan router yang telah diinisialisasi
app.use("/checkout", checkoutRouter);
app.use("/cart", cartRouter);
app.use("/categoryBrand", categoryBrandRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/", indexRouter);
app.use("/wishlist", wishRouter);
app.use("/dashboard", dashboardRouter);
app.use("/bestseller", bestRouter);
app.use("/editProfile", editProfileRouter);

app.listen(PORT, () => {
  console.log(`Server Berjalan di port ${PORT}`);
});
