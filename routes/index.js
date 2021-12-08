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
  var error = [];
  var result = false;
  var saveUser = null;
  var token = null;

  const data = await UserModel.findOne({
    email: req.body.email,
  });

  if (data !== null) {
    error.push("utilisateur déjà présent");
  }

  if (
    req.body.username === "" ||
    req.body.email === "" ||
    req.body.password === ""
  ) {
    error.push("champs vides");
  }

  if (error.length === 0) {
    var hash = bcrypt.hashSync(req.body.password, 10);
    var newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      token: uid2(32),
    });
    console.log("newUser:user+mail+password+token", newUser);

    saveUser = await newUser.save();

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }

  res.json({ result, saveUser, error, token });
  console.log("token", res.json.token);
});

// router.post("/sign-up", async function (req, res, next) {
//   console.log("req.body", req.body);
//   console.log("req.body.usernameFromFront", req.body.username);
//   console.log("req.body.emailFromFront", req.body.email);
//   console.log("req.body.passwordFromFront", req.body.password);
//   var newUser = new UserModel({
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     token: "azert",
//   });

//   var userSaved = await newUser.save();

//   res.json({ userSaved });
// });

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

router.post("/settings", async function (req, res, next) {
  console.log("req.body.");
});

module.exports = router;
