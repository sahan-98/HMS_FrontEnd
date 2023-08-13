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

// add a appoiment
AppointmentRoutes.post("/add", async (req, res) => {
  const { doctorid, patientid, bookingDate, type, doctorAvailability } =
    req.body;

  const doc = await Doctor.findOne({ doctorid: doctorid });

  let fee = doc.fee;

  console.log(doc);
  console.log(fee);

  const QueAppintments = await Appointment.find({
    doctorid: doctorid,
    doctorAvailability: doctorAvailability,
  });

  const newAppointment = new Appointment({
    doctorid,
    patientid,
    bookingDate,
    doctorAvailability,
    type,
    queueNumber: QueAppintments.length + 1,
    totalPrice: fee,
    visitStatus: "pending",
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

// get all appoinment details
AppointmentRoutes.get("/", async (req, res) => {
  await Appointment.find()
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

AppointmentRoutes.get("/patient/:patientId", async (req, res, next) => {
  try {
    const appointments = await Appointment.aggregate([
      {
        $match: {
          patientid: req.params.patientId,
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorid",
          foreignField: "doctorid",
          as: "doctor",
        },
      },
      {
        $unwind: "$doctor",
      },
      {
        $project: {
          "doctor.password": 0,
        },
      },
    ]);
    res.status(200).json({ data: appointments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
    return next(err);
  }
});

AppointmentRoutes.get("/doctor/:doctorId", async (req, res, next) => {
  try {
    console.log(req.params.doctorId);
    const appointments = await Appointment.aggregate([
      {
        $match: {
          doctorid: "fba5eb15-da3f-4ed6-b763-ac19bf45b45a",
        },
      },
    ]);
    res.status(200).json({ data: appointments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
    return next(err);
  }
});

// get single Appointment details
AppointmentRoutes.get("/patient/:id", async (req, res) => {
  await Appointment.find({ patientid: req.params.id })
    .then((data) => {
      return res.status(200).send({ data: data });
    })
    .catch((error) => {
      return res.status(500).send({ error: error.message });
    });
});

// get completed single Appointment details
AppointmentRoutes.get("/patient-completed/:id", async (req, res) => {
  await Appointment.find({ patientid: req.params.id, visitStatus: "completed" })
    .then((data) => {
      return res.status(200).send({ data: data });
    })
    .catch((error) => {
      return res.status(500).send({ error: error.message });
    });
});

AppointmentRoutes.get("/patient-pending/:id", async (req, res) => {
  await Appointment.find({ patientid: req.params.id, visitStatus: "pending" })
    .then((data) => {
      return res.status(200).send({ data: data });
    })
    .catch((error) => {
      return res.status(500).send({ error: error.message });
    });
});

AppointmentRoutes.post("/updateVisitStatus/:id", async (req, res) => {
  try {
    Appointment.findById(req.params.id)
      .then(async (appointmentObj) => {
        appointmentObj.visitStatus = "completed";

        await appointmentObj
          .save()
          .then(() => {
            return res.status(200).json({ data: appointmentObj });
          })
          .catch((err) => {
            console.error(err);
            return res.status(400).json({ message: err });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: err });
      });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = AppointmentRoutes;
