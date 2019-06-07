const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  User = require("./models/user"),
  Product = require("./models/product"),
  Basket = require("./models/basket"),
  bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/shopping", {
  useNewUrlParser: true
});

const authMiddleware = (req, res, next) => {
  var str = req.url;
  var patt = new RegExp("baskets");
  var test = patt.test(str);
  if (req.method === "PUT" && test) {
    if (req.headers["access-token"] === "NodeJS the best") {
      next();
    } else {
      res.status(401).send("bad password");
    }
  } else {
    next();
  }
};

app.use(authMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routesUser = require("./routes/user.router");
const routesProduct = require("./routes/product.router");
const routesBasket = require("./routes/basket.router");

routesUser(app);
routesProduct(app);
routesBasket(app);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("todo list RESTful API server started on: " + port);
