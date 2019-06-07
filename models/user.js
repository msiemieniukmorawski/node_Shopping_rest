const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  username: String,
  password: String,
  name: String
});

module.exports = mongoose.model("Users", UserSchema);
