const express = require("express");
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const auth = require("./Auth");
const config = require("../configure.js");
var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
var Mailgen = require("mailgen");
require("dotenv").config();

let user = require("../Models/admin.model");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRD_DKEY);

console.log("========key=============");
console.log(process.env.SENDGRD_DKEY);
console.log("====================================");

//email configurarion
// function sendMail(mailOptions) {
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "ravindudeshaninfo@gmail.com",
//       pass: "Homagama502",
//     },
//   });

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log("Email error Occured", error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// }

// add user

userRoutes.post("/add", async (req, res) => {
  try {
    const { username, password, email, conpass } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    if (username == "" || password == "" || email == "")
      return res.status(200).json({ warn: "Important field(s) are empty" });

    if (password !== conpass)
      return res.status(200).json({ warn: "Passwords Do not Match!" });

    const exist = await user.findOne({ email: email });
    if (exist) {
      return res
        .status(200)
        .json({ warn: "An account is Exist with this email" });
    }

    const exist2 = await user.findOne({ username: username });
    if (exist2) {
      return res
        .status(200)
        .json({ warn: "This Username is already taken.Try another one" });
    }

    // upload

    const newUser = new user({ username, password: passwordHash, email });

    await newUser
      .save()
      .then(async (respond) => {
        //  send mail
      })
      .catch((err) => {
        res.status(400).json({ msg: "Error!" });
        console.log("error mail:", err);
      });
  } catch (err) {
    res.status(400).json({ msg: "Error!", code: 400 });
    console.log("error mail:", err);
  }
});

// test email

userRoutes.post("/test", async (req, res) => {
  try {
    const msg = {
      to: "ravindudeshan9865@gmail.com", // Change to your recipient
      from: "ravindudeshaninfo@gmail.com", // Change to your verified sender
      templateId: "d-1b2bae4c2d284e51bcf6172e67f94dc9",
      dynamic_template_data: {
        textdata: "sample",
        MSG: "messagessss",
        ids: "87v747r7774",
      },
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        return res.status(200).json({ msg: "Successfull", code: 200 });
      })
      .catch((error) => {
        res.status(400).json({ msg: "Error!", code: 403 });
        console.log("error mail:", error);
      });
  } catch (err) {
    res.status(400).json({ msg: "Error!", code: 400 });
    console.log("error mail:", err);
  }
});

//token validate

userRoutes.post("/validate", async (req, res) => {
  // console.log("Secret is :" , config.JWT_SECRET);

  try {
    const { username, password } = req.body;
    if (username == "" || password == "")
      return res
        .status(200)
        .json({ msg: "Username or Password fields are empty" });

    const Login = await user.findOne({ username: username });

    if (!Login)
      return res
        .status(400)
        .json({ msg: "Invalid Username or Password", code: 401 });

    const validate = await bcrypt.compare(password, Login.password);

    if (!validate)
      return res
        .status(400)
        .json({ msg: "Invalid Username or Password", code: 402 });

    //jwt secret

    res.status(200).json({
      daata: {
        id: Login._id,
        username: Login.username,
        email: Login.email,
      },
    });
  } catch (err) {
    res.status(400).json({ msg: "Server Error", code: 400 });
    console.log("Error is ", err);
  }
});

userRoutes.post("/update/:id", async (req, res) => {
  console.log(req.body);

  user
    .findById(req.params.id)
    .then((productObj) => {
      productObj.username = req.body.username;
      productObj.email = req.body.email;

      console.log(productObj);
      productObj
        .save()
        .then(() => res.json("Updated"))
        .catch((err) => res.status(400).json("Erro " + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

userRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  user.findOne({ _id: id }, function (err, User) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, User: User });
    }
  });
});

userRoutes.get("/", async (req, res) => {
  await user
    .find(function (err, users) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ success: true, data: users });
      }
    })
    .sort({ updatedAt: 1 });
});

//update product by id

module.exports = userRoutes;
