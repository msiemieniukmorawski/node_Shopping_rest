const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaProduct = new Schema({
  IdUser: String,
  IdProduct: [String]
});

module.exports = mongoose.model("Baskets", schemaProduct);
