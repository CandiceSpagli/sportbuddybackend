var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
});

var UserModel = mongoose.model("users", userSchema);
console.log("usermodel from models", UserModel);

module.exports = UserModel;
