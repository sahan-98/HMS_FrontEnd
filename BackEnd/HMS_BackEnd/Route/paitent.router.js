const express = require("express");
const UserRoutes = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const auth = require("./Auth");
const config = require("../configure.js");
// var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
// var Mailgen = require("mailgen");

let User = require("../Models/paitents.model");
let ErrorLog = require("../Models/errorlog.model");

// add User

UserRoutes.post("/add", async (req, res) => {
  const { mobile, password, email, address, dateOfBirth, age, firstname, lastname, conpass } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  if (
    mobile == "" ||
    password == "" ||
    email == "" ||
    address == "" ||
    dateOfBirth == "" ||
    age == "" ||
    firstname == "" ||
    lastname == ""
  )
    return res.status(202).json({ warn: "Important field(s) are empty" });

  if (password !== conpass)
    return res.status(202).json({ warn: "Passwords Do not Match!" });

  const exist = await User.findOne({ email: email });
  if (exist) {
    return res
      .status(202)
      .json({ warn: "An account is Exist with this email" });
  }

  const exist2 = await User.findOne({ mobile: mobile });
  if (exist2) {
    return res
      .status(202)
      .json({ warn: "This mobile number is not available.Try another one" });
  }

  // upload

  const newUser = new User({
    mobile,
    password: passwordHash,
    email,
    address, 
    dateOfBirth, 
    age,
    firstname,
    lastname,
    status: "New",
  });

  await newUser
    .save()
    .then(async (respond) => {
      res.status(200).json({ message: "Successfull" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error!" });
      console.log("error mail:", err);
    });
});

//token validate

UserRoutes.post("/validate", async (req, res) => {
  // console.log("Secret is :" , config.JWT_SECRET);

  const { mobile, password } = req.body;

  try {
    const Login = await User.findOne({ mobile: mobile });

    if (mobile == "" || password == "")
      return res
        .status(200)
        .json({ message: "Mobile or Password field(s) are empty" });

    if (!Login)
      return res.status(200).json({ message: "Invalid login details" });

    const validate = await bcrypt.compare(password, Login.password);

    // title: {
    //   type: String,
    //   required: true,
    // },

    // //
    // type: {
    //   type: String,
    //   required: true,
    // },
    // User: {
    //   type: String,
    // },
    // description: {
    //   type: String,
    //   required: true,
    // },
    // endpoint: {
    //   type: String,
    //   required: true,
    // },
    // status: {
    //   type: Number,
    // },

    if (!validate) {
      const newErrorLog = new ErrorLog({
        mobile: mobile,
        title: "Security Alert",
        type: "invalidLoginAttempt",
        description: "An suspisious Login Attemp detected!",
        status: 0,
        endpoint: "User/validate",
        ip: req.connection.remoteAddress,
      });

      await newErrorLog.save();

      return res.status(202).json({ message: "Password is invalid!" });
    }

    //jwt secret
    const token = jwt.sign({ id: Login._id }, config.JWT_SECRET, {
      expiresIn: 3000,
    });
    res.status(200).json({
      token,
      User: {
        id: Login._id,
        mobile: Login.mobile,
        email: Login.email,
        firstname: Login.firstname,
        lastname: Login.lastname,
        img: Login.img,
      },
    });
  } catch (err) {
    console.log("validation error ", err);
    return res.status(400).json({ message: "Validation Error" });
  }
});

// User Session Validation by token
UserRoutes.get("/session-validate", async (req, res) => {
  try {
    const token = req.header("token");

    console.log("validation is :", token);
    if (!token) return res.json(false);

    const validate = jwt.verify(token, config.JWT_SECRET);
    if (!validate) return res.json(false);

    const Login = await User.findById(validate.id);
    if (!Login) return res.json(false);

    return res.json(true);
  } catch (error) {
    res.status(400).json({ message: "Validation Error" });
    console.log("Error is ", error);
  }
});

// update User
UserRoutes.post("/update/:id", async (req, res) => {
  console.log(req.body);

  try {
    User.findById(req.params.id)
      .then((userObj) => {
        userObj.firstname = req.body.firstname;
        userObj.lastname = req.body.lastname;
        userObj.email = req.body.email;

        userObj
          .save()
          .then(() => {
            return res.status(200).json("Updated");
          })
          .catch((err) => res.status(400).json({ message: err }));
      })
      .catch((err) => res.status(400).json({ message: err }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

UserRoutes.route("/:id").get(async function (req, res) {
  try {
    let id = req.params.id;

    let user = await User.findById(id);
    if (!user) {
      console.log("err");
      return res.status(400).json({ message: err });
    } else {
      // Return the organizer and associated events
      return res.status(200).json({ success: true, data: user });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

UserRoutes.get("/", async (req, res) => {
  try {
    let users = await User.find().sort({ createdAt: -1 });
    if (!users) {
      console.log("err");
      return res.status(400).json({ message: "Details not available" });
    } else {
      res.status(200).json({ success: true, data: users });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

//update product by id

module.exports = UserRoutes;
