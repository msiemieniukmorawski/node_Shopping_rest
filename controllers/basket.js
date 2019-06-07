"use strict";

const mongoose = require("mongoose"),
  Basket = mongoose.model("Baskets");

exports.create_a_basket = (req, res) => {
  const new_basket = new Basket(req.body);
  new_basket.save((err, basket) => {
    if (err) res.send(err);
    res.json(basket);
  });
};

exports.read_a_basket = (req, res) => {
  Basket.findById(req.params.basketId, (err, basket) => {
    if (err) res.send(err);
    res.json(basket);
  });
};

exports.update_a_basket = (req, res) => {
  Basket.findOneAndUpdate(
    {
      _id: req.params.basketId
    },
    { $push: req.body },
    { new: true },
    (err, basket) => {
      if (err) res.send(err);
      res.json(basket);
    }
  );
};

exports.delete_a_basket = (req, res) => {
  Basket.remove(
    {
      _id: req.params.basketId
    },
    (err, basket) => {
      if (err) res.send(err);
      res.json({ message: "Basket successfully deleted" });
    }
  );
};

exports.delete_a_product_in_basket = (req, res) => {
  Basket.findOneAndUpdate(
    {
      _id: req.params.basketId
    },
    { $pull: { IdProduct: req.params.productId } },
    { new: true },
    (err, basket) => {
      if (err) res.send(err);
      res.json(basket);
    }
  );
};
