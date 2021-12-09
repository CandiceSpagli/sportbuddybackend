var mongoose = require("mongoose");

var sportSchema = mongoose.Schema({
  type: String,
  level: Number,
});

var userSchema = mongoose.Schema({
  lastname: String,
  firstname: String,
  username: String,
  email: String,
  password: String,
  gender: String,
  age: Number,
  picture: String,
  desc: String,
  dateOfBirth: Date,
  location: {
    long: Number,
    lat: Number,
  },
  token: String,
  sports: [sportSchema],
});

var UserModel = mongoose.model("users", userSchema);
console.log("usermodel from models", UserModel);

module.exports = UserModel;
