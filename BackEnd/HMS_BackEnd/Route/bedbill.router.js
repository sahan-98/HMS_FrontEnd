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

let BedBill = require("../Models/bedbill.model");

// bed bill update
bedRoutes.post("/pay/:id", async (req, res) => {
  console.log(req.body);

  try {
    BedBill.findById(req.params.id)
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

// payed bed bills for patient
bedRoutes.get("/payed/:id", async (req, res) => {
  console.log(req.body);

  try {
    BedBill.find({ payStatus: "completed", patientid: req.params.id })
      .then((bedObj) => {
        return res.status(200).json({ data: bedObj });
      })
      .catch((err) => res.status(400).json({ message: err }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

// pending bed bills for patient
bedRoutes.get("/pending/:id", async (req, res) => {
  console.log(req.body);

  try {
    BedBill.find({ payStatus: "pending", patientid: req.params.id })
      .then((bedObj) => {
        return res.status(200).json({ data: bedObj });
      })
      .catch((err) => res.status(400).json({ message: err }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

bedRoutes.get("/by-patient/:id", async (req, res) => {
  try {
    BedBill.find({ patientid: req.params.id })
      .sort({ createdAt: -1 })
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
