const express = require("express");
const MedOfficerRoutes = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const auth = require("./Auth.js");
const config = require("../configure.js");
// var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
// var Mailgen = require("mailgen");

let MedOfficer = require("../Models/medOfficer.model.js");
let ErrorLog = require("../Models/errorlog.model.js");

// add MedOfficer

MedOfficerRoutes.post("/add", async (req, res) => {
  const { mobile, password, email, firstname, lastname, userName, address, gender, conpass } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  if (
    mobile == "" ||
    password == "" ||
    email == "" ||
    firstname == "" ||
    lastname == "" ||
    userName == "" ||
    address == "" ||
    gender == "" ||
    conpass == "" 
  )
    return res.status(202).json({ warn: "Important field(s) are empty" });

  if (password !== conpass)
    return res.status(202).json({ warn: "Passwords Do not Match!" });

  const exist = await MedOfficer.findOne({ email: email });
  if (exist) {
    return res
      .status(202)
      .json({ warn: "An account is Exist with this email" });
  }

  const exist2 = await MedOfficer.findOne({ mobile: mobile });
  if (exist2) {
    return res
      .status(202)
      .json({ warn: "This mobile number is not available.Try another one" });
  }

  // upload

  const newUser = new MedOfficer({
    mobile,
    password: passwordHash,
    email,
    firstname,
    lastname,
    userName,
    address,
    gender,
    status: "New",
  });

  await newUser
    .save()
    .then(async (respond) => {
      res.status(200).json({ message: "Successfull", data:newUser });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error!" });
      console.log("error mail:", err);
    });
});



// update MedOfficer
MedOfficerRoutes.post("/update/:id", async (req, res) => {
  console.log(req.body);

  try {
    MedOfficer.findById(req.params.id)
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

MedOfficerRoutes.route("/:id").get(async function (req, res) {
  try {
    let id = req.params.id;

    let medOfficer = await MedOfficer.findById(id);
    if (!medOfficer) {
      console.log("err");
      return res.status(400).json({ message: "Not found" });
    } else {
      // Return the organizer and associated events
      return res.status(200).json({ success: true, data: medOfficer });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

MedOfficerRoutes.get("/", async (req, res) => {
  try {
    let users = await MedOfficer.find().sort({ createdAt: -1 });
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

//Med officer login
MedOfficerRoutes.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    // Find the Med officer by their username
    const medOfficer = await MedOfficer.findOne({ userName });
    // Check if the Med officer exists
    if (!medOfficer) {
      return res.status(404).json({ message: "Med officer not found" });
    }
    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, medOfficer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Send a success response
    return res
      .status(200)
      .json({ message: "Login successful", medOfficer: medOfficer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = MedOfficerRoutes;
