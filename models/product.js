const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaProduct = new Schema({
  featured: Boolean,
  category: String,
  amount: Number,
  manufacture: String,
  image: String,
  name: String
});

module.exports = mongoose.model("Products", schemaProduct);
