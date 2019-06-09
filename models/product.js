const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaProduct = new Schema({
  featured: Boolean,
  category: String,
  amount: Number,
  manufacture: String,
  image: String,
  name: String,
  tag: String,
  description: String,
  shortDescrotion: String
});

module.exports = mongoose.model("Products", schemaProduct);
