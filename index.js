const path = require("path");
const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const jwt = require("passport-jwt");
const Categories = require("./models/category");
const app = express();

const http = require('http');
const PORT = process.env.PORT || 3000; 

// app.set( 'port', ( process.env.PORT || 3000 ));



// use layouts
app.use(layouts);
app.set("layout", path.join(__dirname, "views/layouts/main.ejs"));

// place all styles block in the layout at the head
app.set("layout extractStyles", true);
// place all scripts block in the layout at the end
app.set("layout extractScripts", true);

app.use(bodyParser.urlencoded());

app.use(
  session({
    secret: "stringacak",
    cookie: {},
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.use("/public", express.static("public"));
app.set("view engine", "ejs");

mongoose.connect(
  // "mongodb://localhost:27017/webpro?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
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

// mongoose.connect(
//   "mongodb://localhost:27017/webpro?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
//   {
//     useNewUrlParser: true,
//   }
// );
const db = mongoose.connection;

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const categoryBrandRouter = require("./routes/categoryBrand");
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes/checkout");
const wishRouter = require("./routes/wish");
const dashboardRouter = require("./routes/dashboard");
const bestRouter = require("./routes/best");
const editProfileRouter = require("./routes/editProfile");

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  next();
});
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});
app.use(async (req, res, next) => {
  res.locals.categories = await Categories.find({}, { nama: 1, _id: 0 });
  next();
});

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



app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Berjalan di port ${PORT}`);
});

// // Start node server
// app.listen( app.get( 'port' ), function() {
//   console.log( 'Node server is running on port ' + app.get( 'port' ));
//   });

