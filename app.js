const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  User = require("./models/user"),
  Product = require("./models/product"),
  Basket = require("./models/basket"),
  bodyParser = require("body-parser"),
  cors = require('cors');

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

app.use(cors()),
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, access-token, Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(authMiddleware);

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
