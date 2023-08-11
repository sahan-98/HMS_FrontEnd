const express = require("express");
const bedRoutes = express.Router();
const bcrypt = require("bcrypt");

const moment = require("moment");
// const session = require("express-session");
// const auth = require("./Auth");
// const config = require("../configure.js");
// var nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// var Mailgen = require("mailgen");

let Bed = require("../Models/bed.models");
let BedBill = require("../Models/bedbill.model");

// bed bill allocate
bedRoutes.post("/pay/:id", async (req, res) => {
  console.log(req.body);

  try {
    Bed.findById(req.params.id)
      .then((bedObj) => {
        bedObj.payStatus = "completed";

        bedObj
          .save()
          .then(() => {
            return res.status(200).json("completed");
          })
          .catch((err) => res.status(400).json({ message: err }));
      })
      .catch((err) => res.status(400).json({ message: err }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

// bed allocate
bedRoutes.get("/payed/:id", async (req, res) => {
  console.log(req.body);

  try {
    Bed.find({ payStatus: "completed", patientId: req.params.id })
      .then((bedObj) => {
        return res.status(200).json({ data: bedObj });
      })
      .catch((err) => res.status(400).json({ message: err }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

bedRoutes.get("/pending/:id", async (req, res) => {
  console.log(req.body);

  try {
    Bed.find({ payStatus: "pending", patientId: req.params.id })
      .then((bedObj) => {
        return res.status(200).json({ data: bedObj });
      })
      .catch((err) => res.status(400).json({ message: err }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = bedRoutes;
