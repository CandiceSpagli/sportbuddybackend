var express = require("express");
var router = express.Router();

var uid2 = require("uid2");
var bcrypt = require("bcrypt");

var UserModel = require("../models/users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* POST SIGN UP*/
router.post("/sign-up", async function (req, res, next) {
  console.log("req.body", req.body);
  console.log("req.body.usernameFromFront", req.body.username);
  console.log("req.body.emailFromFront", req.body.email);
  console.log("req.body.passwordFromFront", req.body.password);
  var newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    token: "azert",
  });

  var userSaved = await newUser.save();

  // var result = false;
  // var user = null;
  // var error = [];
  // var token = null;
  // if (req.body.emailFromFront === "" || req.body.passwordFromFront === "") {
  //   error.push("champs vides");
  // }
  // if (error.length === 0) {
  //   user = await UserModel.findOne({
  //     email: req.body.emailFromFront,
  //   });
  //   if (user) {
  //     if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
  //       result = true;
  //       token = user.token;
  //     } else {
  //       result = false;
  //       error.push("mot de passe incorrect");
  //     }
  //   } else {
  //     error.push("email incorrect");
  //   }
  // }
  // res.json({ result, user, error, token });
  res.json({ userSaved });
});

/* POST SIGN IN*/
router.post("/sign-in", async function (req, res, next) {
  console.log("req.body-sign-in", req.body);
  var searchUser = await UserModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  console.log("---------searchUser", searchUser);
  if (searchUser === null) {
    res.json({ result: false });
  } else {
    res.json({ result: true });
  }
});

module.exports = router;
