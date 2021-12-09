var mongoose = require("mongoose");

var sessionSchema = mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  buddyId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: Date,
  level: Number,
  sport: String,
  location: {
    long: Number,
    lat: Number,
  },
});

var SessionModel = mongoose.model("session", sessionSchema);
console.log("SessionModel from models", SessionModel);

module.exports = SessionModel;
