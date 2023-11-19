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
let Paitent = require("../Models/paitents.model");
let Detection = require("../Models/detection.model");

// add a appoiment
AppointmentRoutes.post("/add", async (req, res) => {
  try {
    const {
      doctorid,
      patientid,
      bookingDate,
      type,
      doctorAvailability,
      detectionId,
    } = req.body;

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
      detectionId,
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

AppointmentRoutes.post("/update-appointment", async (req, res) => {
  try {
    const {
      appointmentId,
      doctorid,
      doctorAvailability,
      detectionId,
    } = req.body;

    const doc = await Doctor.findOne({ doctorid: doctorid });

    let fee = doc.fee;

    console.log(doc);
    console.log(fee);

    const QueAppintments = await Appointment.find({
      doctorid: doctorid,
      doctorAvailability: doctorAvailability,
    });

    const updateAppointment = await Appointment.findById(appointmentId);
    if(updateAppointment){
      updateAppointment.doctorid = doctorid;
      updateAppointment.doctorAvailability = doctorAvailability;
      updateAppointment.detectionId = detectionId;
      updateAppointment.totalPrice= fee;
      updateAppointment.queueNumber = QueAppintments.length + 1;
    }

    await updateAppointment
      .save()
      .then(async (respond) => {
        return res.status(200).json({ message: "Successfull" ,updateAppointment});
      })
      .catch((err) => {
        res.status(400).json({ message: "Error!" });
        console.log("error mail:", err);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

AppointmentRoutes.post("/add-urgent", async (req, res) => {
  try {
    const { patientid, bookingDate, type } = req.body;

    const newAppointment = new Appointment({
      patientid,
      bookingDate,
      type:"Urgent",
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// get all appoinment details
AppointmentRoutes.get("/", async (req, res) => {
  Appointment.aggregate([
    {
      $match: {
        appointmentType: { $eq: "Urgent" },
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
    {
      $sort: {
        bookingDate: -1,
        queueNumber: -1,
      },
    },
  ])
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

AppointmentRoutes.get("/get-urgent", async (req, res) => {
  Appointment.aggregate([
    {
      $match: {
        type: { $eq: "Urgent" },
      },
    },
    {
      $lookup: {
        from: "Paitent",
        localField: "patientid",
        foreignField: "_id",
        as: "patient",
      },
    },
    {
      $unwind: "$patient",
    },
    {
      $sort: {
        bookingDate: -1,
        queueNumber: -1,
      },
    }, 
  ])
    .then(async (data) => {
      //get patient details. the aggregation is not possible because it is stored as string.
      // const appoinmentList = [];
      // for (let i = 0; i < data.length; i++) {
      //   const patient = await Paitent.findById(data[i].patientid);
      //   console.log(patient);
      //   appoinmentList.push({
      //     ...data[i],
      //     patient: patient,
      //   }); 
      // }
      res.status(200).send({ data: data });  
      console.log("Response sent");
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

// get all appoinment details
AppointmentRoutes.get("/bill-by-patient/:id", async (req, res) => {
  await Appointment.find({ patientid: req.params.id })
    .sort({ bookingDate: -1, queueNumber: -1 })
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
      {
        $sort: {
          bookingDate: -1,
          queueNumber: -1,
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
    const appointmentsUrgent = await Appointment.aggregate([
      {
        $match: {
          doctorid: req.params.doctorId,
          type: "Urgent",
        },
      },
      {
        $lookup: {
          from: "detection",
          localField: "detectionId",
          foreignField: "_id",
          as: "detection",
        },
      },
      {
        $unwind: "$detection",
      },
      {
        $sort: {
          bookingDate: -1,
          queueNumber: -1,
        },
      },
    ]);
    const appointmentsNormal = await Appointment.aggregate([
      {
        $match: {
          doctorid: req.params.doctorId,
          type: {
            $ne: "Urgent",
          },
        },
      },
      
      {
        $sort: {
          bookingDate: -1,
          queueNumber: -1,
        },
      },
    ]);
    // for(let i=0; i<appointmentsUrgent.length; i++){
    //   const detection = await Detection.findById(appointmentsUrgent.detectionId)
    //   appointmentsUrgent[i].detection = detection;
    // }
    // for(let i=0; i<appointmentsNormal.length; i++){
    //   const detection = await Detection.findById(appointmentsNormal.detectionId)
    //   appointmentsNormal[i].detection = detection;
    // }
    const appointments = [...appointmentsUrgent, ...appointmentsNormal];
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
