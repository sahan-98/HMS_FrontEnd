const express = require("express");
const AppointmentRoutes = express.Router();
const bcrypt = require("bcrypt");

const moment = require("moment");
// const session = require("express-session");
// const auth = require("./Auth");
// const config = require("../configure.js");
// var nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// var Mailgen = require("mailgen");

let Appointment = require("../Models/appoinmentbill.model");
let Doctor = require("../Models/doctor.models");

// add LabAssistant

AppointmentRoutes.post("/add", async (req, res) => {
  const { doctorId, patientid, bookingDate, type, queueNumber, totalPrice } =
    req.body;

  // upload

  const doc = Appointment.findById(doctorId);

  const newAppointment = new Appointment({
    doctorId,
    patientid,
    bookingDate,
    type,
    queueNumber,
    totalPrice: doc.fee,
  });

  await newAppointment
    .save()
    .then(async (respond) => {
      return res.status(200).json({ message: "Successfull" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error!" });
      console.log("error mail:", err);
    });
});

// Appointment allocate
// AppointmentRoutes.post("/allocateAppointment/:id", async (req, res) => {
//   console.log(req.body);

//   try {
//     Appointment.findById(req.params.id)
//       .then((AppointmentObj) => {
//         AppointmentObj.patientid = req.body.patientid;
//         AppointmentObj.bookingDate = false;
//         AppointmentObj.queueNumber = req.body.queueNumber;

//         AppointmentObj.save()
//           .then(() => {
//             return res.status(200).json("allocated");
//           })
//           .catch((err) => res.status(400).json({ message: err }));
//       })
//       .catch((err) => res.status(400).json({ message: err }));
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// Appointment allocate
// AppointmentRoutes.post("/autoAllocateAppointment", async (req, res) => {
//   console.log(req.body);

//   try {
//     Appointment.findOne({ bookingDate: true })
//       .then((AppointmentObj) => {
//         AppointmentObj.patientid = req.body.patientid;
//         AppointmentObj.bookingDate = false;
//         AppointmentObj.queueNumber = req.body.queueNumber;

//         AppointmentObj.save()
//           .then(() => {
//             return res
//               .status(200)
//               .json({ allocated_Appointment: AppointmentObj });
//           })
//           .catch((err) => res.status(400).json({ message: err }));
//       })
//       .catch((err) => res.status(400).json({ message: err }));
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ message: "Server Error" });
//   }
// });

//Appointment release
// AppointmentRoutes.route("/releaseAppointment/:id").post(async function (
//   req,
//   res
// ) {
//   // add to postman
//   let nowDate = moment(req.body.releaseDate);
//   try {
//     Appointment.findById(req.params.id)
//       .then((AppointmentObj) => {
//         let queueNumber = AppointmentObj.queueNumber;
//         // calculate number of dates from queueNumber to todayDate
//         const numberOfDates = nowDate.diff(queueNumber, "days");

//         AppointmentObj.patientid = null;
//         AppointmentObj.bookingDate = true;
//         AppointmentObj.queueNumber = null;
//         AppointmentObj.releaseDate = req.body.releaseDate;
//         AppointmentObj.estimation = null;

//         AppointmentObj.save()
//           .then(() => {
//             // generate invoice and attach to patient
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

// get all doctor details
AppointmentRoutes.get("/", async (req, res) => {
  await Appointment.find({})
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

// get single Appointment details
AppointmentRoutes.get("/patient/:id", async (req, res) => {
  await Appointment.find({ patientId: req.params.id })
    .then((data) => {
      return res.status(200).send({ data: data });
    })
    .catch((error) => {
      return res.status(500).send({ error: error.message });
    });
});

module.exports = AppointmentRoutes;
