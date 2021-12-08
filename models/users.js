var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  fisrtname: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
  gender: String,
  age: Number,
  picture: String,
  desc: String,
  location: {
    long: Number,
    lat: Number,
  },
  token: String,
});

var UserModel = mongoose.model("users", userSchema);
console.log("usermodel from models", UserModel);

module.exports = UserModel;
