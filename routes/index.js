var express = require("express");
var router = express.Router();
var fs = require("fs");
var uniqid = require("uniqid");

var uid2 = require("uid2");
var bcrypt = require("bcrypt");

var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "de1o88p9o",
  api_key: "172944832267927",
  api_secret: "pms6k9XCrnas-dVekWDf8pj-Kmw",
});

var SessionModel = require("../models/sessions");
var UserModel = require("../models/users");
const { token } = require("morgan");

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
      firstname: req.body.firstname,
      lastname: req.body.lastname,
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
  // var searchUser = await UserModel.findOne({
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  // console.log("---------searchUser", searchUser);
  // if (searchUser === null) {
  //   res.json({ result: false });
  // } else {
  //   res.json({ result: true });
  // }

  var result = false;
  var user = null;
  var error = [];
  var token = null;

  if (req.body.email == "" || req.body.password == "") {
    error.push("champs vides");
  }

  if (error.length === 0) {
    user = await UserModel.findOne({
      email: req.body.email,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        result = true;
        token = user.token;
      } else {
        result = false;
        error.push("mot de passe incorrect");
      }
    } else {
      error.push("email incorrect");
    }
  }

  res.json({ result, user, error, token });
});

/* POST SETTINGS*/
router.post("/settings", async function (req, res, next) {
  console.log("BODY FROM SETTINGS", req.body);

  const updateUser = await UserModel.updateOne(
    { token: req.body.token },
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      // dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      // picture: resultCloudinary.secure_url,
      sports: [
        {
          name: req.body.sportName1,
          level: req.body.sportLevel1,
        },
        {
          name: req.body.sportName2,
          level: req.body.sportLevel2,
        },
        {
          name: req.body.sportName3,
          level: req.body.sportLevel3,
        },
      ],
    }
  );
  console.log("UPDATE USER", updateUser);

  res.json({ updateUser });
});
router.get("/settings", async function (req, res, next) {
  console.log("REQ QUERY SETTINGS", req.query);

  const userStay = await UserModel.findOne({
    token: req.query.token,
  });

  const firstNameLoaded = userStay.firstname;
  const lastNameLoaded = userStay.lastname;
  const genderLoaded = userStay.gender;
  const sportsLoaded = userStay.sports;

  console.log("FIRSTNAME LOADED", firstNameLoaded);
  console.log("LASTNAME LOADED", lastNameLoaded);
  console.log("GENDER", genderLoaded);
  console.log("USERSTAY", userStay);
  console.log("SPORTLOADED", sportsLoaded);
  res.json({ firstNameLoaded, lastNameLoaded, sportsLoaded });
});

/* POST SESSION page. */
router.post("/sessions", async function (req, res, next) {
  console.log("BODY FROM SESSION", req.body);
  const data = await UserModel.findOne({
    token: req.body.token,
  });
  console.log("DATA token FROM SESSIONS", data);

  const newSession = new SessionModel({
    creatorId: data._id,
    date: req.body.date,
    level: req.body.level,
    sport: req.body.sport,
    location: {
      long: req.body.long,
      lat: req.body.lat,
    },
  });

  var sessionSaved = await newSession.save();

  res.json({ sessionSaved });
});

//SETTINGS

router.post("/picupload", async function (req, res, next) {
  var pictureName = "./tmp/" + uniqid() + ".jpg";
  var resultCopy = await req.files.avatar.mv(pictureName);
  if (!resultCopy) {
    var resultCloudinary = await cloudinary.uploader.upload(pictureName);
    res.json({
      resultCloudinary,
    });
    console.log("resultCloudinary", resultCloudinary);
  } else {
    res.json({ error: resultCopy });
  }
  fs.unlinkSync(pictureName);
});

router.get("/buddiesScreen", async function (req, res, next) {
  console.log("<<<back /buddiesScreen");
  var sessions = await SessionModel.find().populate("creatorId").exec();
  // console.log('sessions.creatorId',sessions);

  var filteredBySportSessions = await SessionModel.find({ sport: "yoga" });
  console.log("filteredBySportSessions", filteredBySportSessions);

  res.json({
    result: true,
    sessions,
  });
});

router.get("/searchScreen", async function (req, res, next) {
  console.log("<<<back /searchScreen");
  var users = await UserModel.find();
  // console.log('users search',users);
  res.json({
    result: true,
    users,
  });
});

module.exports = router;
