var mongoose = require("mongoose");

var sessionSchema = mongoose.Schema({
  date: Date
  location: {
      long: Number,
      lat: Number
  }
});

var SessionModel = mongoose.model("session",sessionSchema);
console.log("Sessionmodel from models", SessionModel);

module.exports = SessionModel;