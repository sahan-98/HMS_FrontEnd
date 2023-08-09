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

// add LabAssistant

// bedRoutes.post("/add", async (req, res) => {
//   const {
//     bedNo,
//     patientid,
//     availability,
//     wardNo,
//     allocatedDate,
//     releaseDate,
//     bedFee,
//   } = req.body;

//   //   const salt = await bcrypt.genSalt();
//   //   const passwordHash = await bcrypt.hash(password, salt);

//   if (bedNo == "" || wardNo == "" || bedFee == "")
//     return res.status(202).json({ warn: "Important field(s) are empty" });

//   //   if (password !== conpass)
//   //     return res.status(202).json({ warn: "Passwords Do not Match!" });

//   //   const exist = await LabAssistant.findOne({ email: email });
//   //   if (exist) {
//   //     return res
//   //       .status(202)
//   //       .json({ warn: "An account is Exist with this email" });
//   //   }

//   //   const exist2 = await LabAssistant.findOne({ mobile: mobile });
//   //   if (exist2) {
//   //     return res
//   //       .status(202)
//   //       .json({ warn: "This mobile number is not available.Try another one" });
//   //   }

//   // upload

//   const newBed = new Bed({
//     bedNo,
//     patientid,
//     availability: true,
//     wardNo,
//     allocatedDate,
//     releaseDate,
//     bedFee,
//   });

//   await newBed
//     .save()
//     .then(async (respond) => {
//       res.status(200).json({ message: "Successfull" });
//     })
//     .catch((err) => {
//       res.status(400).json({ message: "Error!" });
//       console.log("error mail:", err);
//     });
// });

// bed allocate
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
bedRoutes.post("/payed/:id", async (req, res) => {
  console.log(req.body);

  try {
    Bed.find({ payStatus: "completed", patientId: req.params.id })
      .then((bedObj) => {
        bedObj.patientid = req.body.patientid;
        bedObj.availability = false;
        bedObj.allocatedDate = req.body.allocatedDate;

        bedObj
          .save()
          .then(() => {
            return res.status(200).json({ allocated_bed: bedObj });
          })
          .catch((err) => res.status(400).json({ message: err }));
      })
      .catch((err) => res.status(400).json({ message: err }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

bedRoutes.post("/pending/:id", async (req, res) => {
  console.log(req.body);

  try {
    Bed.find({ payStatus: "pending", patientId: req.params.id })
      .then((bedObj) => {
        bedObj.patientid = req.body.patientid;
        bedObj.availability = false;
        bedObj.allocatedDate = req.body.allocatedDate;

        bedObj
          .save()
          .then(() => {
            return res.status(200).json({ allocated_bed: bedObj });
          })
          .catch((err) => res.status(400).json({ message: err }));
      })
      .catch((err) => res.status(400).json({ message: err }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

// //bed release
// bedRoutes.route("/releaseBed/:id").post(async function (req, res) {
//   // add to postman
//   let nowDate = moment(req.body.releaseDate);
//   try {
//     Bed.findById(req.params.id)
//       .then((bedObj) => {
//         let patient = bedObj.patientid;

//         let allocatedDate = bedObj.allocatedDate;
//         // calculate number of dates from allocatedDate to todayDate
//         const numberOfDates = nowDate.diff(allocatedDate, "days");

//         let totalPrice = numberOfDates * bedObj.bedFee;

//         bedObj.patientid = null;
//         bedObj.availability = true;
//         bedObj.allocatedDate = null;
//         bedObj.releaseDate = req.body.releaseDate;
//         bedObj.estimation = null;

//         bedObj
//           .save()
//           .then(() => {
//             const newBedBill = new BedBill({
//               bedNo: req.params.id,
//               patientid: patient,
//               availability: true,
//               wardNo,
//               allocationDate: allocatedDate,
//               totalPrice,
//               dayStayed: numberOfDates,
//               payStatus: "pending",
//             });

//             return res.status(200).json({ dates: numberOfDates });
//           })
//           .catch((err) => res.status(400).json({ message: err }));
//       })
//       .catch((err) => res.status(400).json({ message: err }));
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ message: "Server Error" });
//   }
// });

//update product by id

module.exports = bedRoutes;
