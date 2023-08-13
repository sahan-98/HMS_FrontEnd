const express = require("express");
const PaitentRoutes = express.Router();
const bcrypt = require("bcrypt");
// const session = require("express-session");
// const auth = require("./Auth");
// const config = require("../configure.js");
// var nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// var Mailgen = require("mailgen");

let Paitent = require("../Models/paitents.model");
let ErrorLog = require("../Models/errorlog.model");

// add User

PaitentRoutes.post("/add", async (req, res) => {
  const {
    mobile,
    userName,
    password,
    email,
    address,
    dateOfBirth,
    gender,
    firstname,
    lastname,
    conpass,
  } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);
  if (
    mobile == "" ||
    userName == "" ||
    password == "" ||
    email == "" ||
    address == "" ||
    dateOfBirth == "" ||
    gender == "" ||
    firstname == "" ||
    lastname == ""
  )
    return res.status(202).json({ warn: "Important field(s) are empty" });

  if (password !== conpass)
    return res.status(202).json({ warn: "Passwords Do not Match!" });

  const exist = await Paitent.findOne({ email: email });
  if (exist) {
    return res
      .status(202)
      .json({ warn: "An account is Exist with this email" });
  }

  const exist2 = await Paitent.findOne({ mobile: mobile });
  if (exist2) {
    return res
      .status(202)
      .json({ warn: "This mobile number is not available.Try another one" });
  }

  // upload

  const newPaitent = new Paitent({
    mobile,
    userName,
    password: passwordHash,
    email,
    address,
    dateOfBirth,
    gender,
    firstname,
    lastname,
    status: "New",
  });

  await newPaitent
    .save()
    .then(async (respond) => {
      res.status(200).json({ message: "Successfull" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error!" });
      console.log("error mail:", err);
    });
});

// update Paitent
PaitentRoutes.post("/update/:id", async (req, res) => {
  console.log(req.body);

  try {
    Paitent.findById(req.params.id)
      .then((paitentObj) => {
        paitentObj.firstname = req.body.firstname;
        paitentObj.lastname = req.body.lastname;
        paitentObj.userName = req.body.userName;
        paitentObj.password = req.body.password;
        paitentObj.email = req.body.email;
        paitentObj.mobile = req.body.mobile;
        paitentObj.address = req.body.address;
        paitentObj.dateOfBirth = req.body.dateOfBirth;
        paitentObj.gender = req.body.gender;

        paitentObj
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

//get all patient count
PaitentRoutes.get("/getAllCountPatient", async (req, res) => {
  try {
    let paitents = await Paitent.find();
    if (!paitents) {
      console.log("err");
      return res.status(400).json({ message: "Details not available" });
    } else {
      return res.status(200).json({ success: true, data: paitents.length });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

PaitentRoutes.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Find the patient by their username
    const patient = await Paitent.findOne({ userName });
    // Check if the patient exists
    if (!patient) {
      return res.status(404).json({ message: "Paitent not found" });
    }
    // Compare the entered password with the hashed password in the database
    const isPasswordValid = bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Send a success response
    return res
      .status(200)
      .json({ message: "Login successful", patient: patient });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

PaitentRoutes.route("/:id").get(async function (req, res) {
  try {
    let id = req.params.id;

    let paitent = await Paitent.findById(id);
    if (!paitent) {
      console.log("err");
      return res.status(400).json({ message: err });
    } else {
      // Return the organizer and associated events
      return res.status(200).json({ success: true, data: paitent });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

PaitentRoutes.get("/", async (req, res) => {
  try {
    let paitents = await Paitent.find().sort({ createdAt: -1 });
    if (!paitents) {
      console.log("err");
      return res.status(400).json({ message: "Details not available" });
    } else {
      res.status(200).json({ success: true, data: paitents });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = PaitentRoutes;
