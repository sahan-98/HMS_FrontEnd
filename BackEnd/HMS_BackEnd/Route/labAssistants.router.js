const express = require("express");
const LabAssistantRoutes = express.Router();
const bcrypt = require("bcrypt");
// const session = require("express-session");
// const auth = require("./Auth");
// const config = require("../configure.js");
// var nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// var Mailgen = require("mailgen");

let LabAssistant = require("../Models/labAssistant.model");
let ErrorLog = require("../Models/errorlog.model");

// add LabAssistant

LabAssistantRoutes.post("/add", async (req, res) => {
  const { mobile, userName, password, email, address, dateOfBirth, firstname, lastname, conpass } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  if (
    mobile == "" ||
    userName == "" ||
    password == "" ||
    email == "" ||
    address == "" ||
    dateOfBirth == "" ||
    firstname == "" ||
    lastname == ""
  )
    return res.status(202).json({ warn: "Important field(s) are empty" });

  if (password !== conpass)
    return res.status(202).json({ warn: "Passwords Do not Match!" });

  const exist = await LabAssistant.findOne({ email: email });
  if (exist) {
    return res
      .status(202)
      .json({ warn: "An account is Exist with this email" });
  }

  const exist2 = await LabAssistant.findOne({ mobile: mobile });
  if (exist2) {
    return res
      .status(202)
      .json({ warn: "This mobile number is not available.Try another one" });
  }

  // upload

  const newLabAssistant = new LabAssistant({
    mobile,
    userName,
    password: passwordHash,
    email,
    address, 
    dateOfBirth, 
    firstname,
    lastname,
    status: "New",
  });

  await newLabAssistant
    .save()
    .then(async (respond) => {
      res.status(200).json({ message: "Successfull" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error!" });
      console.log("error mail:", err);
    });
});


// update LabAssistant
LabAssistantRoutes.post("/update/:id", async (req, res) => {
  console.log(req.body);

  try {
    LabAssistant.findById(req.params.id)
      .then((labAssistantObj) => {
        labAssistantObj.firstname = req.body.firstname;
        labAssistantObj.lastname = req.body.lastname;
        labAssistantObj.email = req.body.email;
        labAssistantObj.userName = req.body.userName;
        labAssistantObj.password = req.body.password;
        labAssistantObj.address = req.body.address;
        labAssistantObj.dateOfBirth = req.body.dateOfBirth;
        labAssistantObj.mobile = req.body.mobile;

        labAssistantObj
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

//Lab Assistant login
LabAssistantRoutes.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Find the Lab Assistant by their username
    const labAssistant = await LabAssistant.findOne({ userName });
    // Check if the Lab Assistant exists
    if (!labAssistant) {
      return res.status(404).json({ message: "Lab Assistant not found" });
    }
    // Compare the entered password with the hashed password in the database
    const isPasswordValid = bcrypt.compare(password, labAssistant.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Send a success response
    return res
      .status(200)
      .json({ message: "Login successful", labAssistant: labAssistant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

LabAssistantRoutes.route("/:id").get(async function (req, res) {
  try {
    let id = req.params.id;

    let labAssistant = await LabAssistant.findById(id);
    if (!labAssistant) {
      console.log("err");
      return res.status(400).json({ message: err });
    } else {
      // Return the organizer and associated events
      return res.status(200).json({ success: true, data: labAssistant });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

LabAssistantRoutes.get("/", async (req, res) => {
  try {
    let uselabAssistants = await LabAssistant.find().sort({ createdAt: -1 });
    if (!uselabAssistants) {
      console.log("err");
      return res.status(400).json({ message: "Details not available" });
    } else {
      res.status(200).json({ success: true, data: uselabAssistants });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

//update product by id

module.exports = LabAssistantRoutes;
