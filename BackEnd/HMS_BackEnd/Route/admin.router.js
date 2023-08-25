const express = require("express");
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const auth = require("./Auth");
const config = require("../configure.js");

require("dotenv").config();

let user = require("../Models/admin.model");

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
    const { userName, password, email } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    if (userName == "" || password == "" || email == "")
      return res.status(200).json({ warn: "Important field(s) are empty" });

    // if (password !== conpass)
    //   return res.status(200).json({ warn: "Passwords Do not Match!" });

    const exist = await user.findOne({ email: email });
    if (exist) {
      return res
        .status(200)
        .json({ warn: "An account is Exist with this email" });
    }

    const exist2 = await user.findOne({ userName: userName });
    if (exist2) {
      return res
        .status(200)
        .json({ warn: "This Username is already taken.Try another one" });
    }

    // upload

    const newUser = new user({ userName, password: passwordHash, email });

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

// Admin login
userRoutes.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Find the admin by their username
    const userObj = await user.findOne({ userName });
    // Check if the admin exists
    if (!userObj) {
      return res.status(404).json({ message: "User not found" });
    }
    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, userObj.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Send a success response
    return res
      .status(200)
      .json({ message: "Login successful", userObj: userObj });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

userRoutes.post("/update/:id", async (req, res) => {
  console.log(req.body);

  user
    .findById(req.params.id)
    .then((productObj) => {
      productObj.userName = req.body.userName;
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

module.exports = userRoutes;
