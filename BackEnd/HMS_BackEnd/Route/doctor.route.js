const express = require("express");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
// const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { v4: uuid_v4 } = require("uuid");
const DoctorRoutes = express.Router();

const HttpError = require("../Models/http-error");
const Doctor = require("../Models/doctor.models");
let Appointment = require("../Models/appoinmentbill.model");

// Save Docotr details
DoctorRoutes.post("/addDoctor", async (req, res, next) => {
  console.log("Adding the doctor");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs! Please check again.", 422));
  }

  const {
    name,
    userName,
    email,
    password,
    phone,
    fee,
    speciality,
    address,
    degree,
    salary,
    availbleTime,
    dateOfJoin,
    gender,
    sunAvailbleTime,
    monAvailbleTime,
    tueAvailbleTime,
    wensAvailbleTime,
    thusAvailbleTime,
    friAvailbleTime,
    satAvailbleTime,
  } = req.body;

  let existingDoctor;
  try {
    existingDoctor = await Doctor.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not add doctor details.",
      500
    );
    return next(error);
  }

  if (existingDoctor) {
    const error = new HttpError("Doctor already exists.", 422);
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const newDoctor = new Doctor({
    doctorid: uuid_v4(),
    userName,
    name,
    email,
    password: hashedPassword,
    phone,
    fee,
    speciality,
    address,
    degree,
    salary,
    availbleTime,
    dateOfJoin,
    gender,
    availability: false,
    sunAvailbleTime,
    monAvailbleTime,
    tueAvailbleTime,
    wensAvailbleTime,
    thusAvailbleTime,
    friAvailbleTime,
    satAvailbleTime,
    status: "New",
  });

  await newDoctor
    .save()
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

// get all doctor details
DoctorRoutes.get("/allDoctors", async (req, res) => {
  await Doctor.find({})
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

// get single doctor details
DoctorRoutes.get("/singleDoctors/:id", async (req, res) => {
  await Doctor.findById(req.params.id)
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

// update Doctor details
DoctorRoutes.put("/updateDoctors/:id", async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "cannot update doctor details" });
      } else res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

// Delete Doctor details
DoctorRoutes.delete("/deleteDoctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.params.id });
    if (!doctor) {
      return res.status(422).json({ error: "doctor not found" });
    }

    await Doctor.deleteOne({ _id: req.params.id });
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//doctor login

DoctorRoutes.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Find the doctor by their username
    const doctor = await Doctor.findOne({ userName });
    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    // Compare the entered password with the hashed password in the database
    const isPasswordValid = bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Update availability property to "true"
    await Doctor.findByIdAndUpdate(doctor._id, { availability: true });
    // Send a success response
    return res
      .status(200)
      .json({ message: "Login successful", doctorId: doctor._id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

DoctorRoutes.post("/autoAllocateDoc", async (req, res) => {
  console.log(req.body);

  try {
    Doctor.findOne({ availability: true })
      .then(async (docObj) => {
        const QueAppintments = await Appointment.find({
          doctorid: docObj._id,
          bookingDate: req.body.bookingDate,
        });

        const newAppointment = new Appointment({
          doctorid: docObj._id,
          patientid: req.body.patientid,
          bookingDate: req.body.bookingDate,
          type: "urgent",
          queueNumber: QueAppintments.length + 1,
          totalPrice: docObj.fee,
          visitStatus: "pending",
        });

        newAppointment
          .save()
          .then(() => {
            return res.status(200).json({ allocated_doc: docObj });
          })
          .catch((err) => res.status(400).json({ message: err }));
      })
      .catch((err) => res.status(400).json({ message: err }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});
//Doctor Logout function

DoctorRoutes.post("/logout", async (req, res) => {
  const { doctorid } = req.body;

  try {
    // Find the doctor by their ID
    const doctor = await Doctor.findById(doctorid);
    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    // Update availability property to "false"
    await Doctor.findByIdAndUpdate(doctorid, { availability: false });
    // Send a success response
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//get available doctors
DoctorRoutes.get("/availableDoctors", async (req, res) => {
  try {
    // Find doctors with availability set to "true"
    const availableDoctors = await Doctor.find({ availability: "true" });

    // Send the list of available doctors as a response
    return res.status(200).json(availableDoctors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//give all doctor count
DoctorRoutes.get("/allDoctorsCount", async (req, res) => {
  await Doctor.find({})
    .then((data) => {
      return res.status(200).send({ data: data.length });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

module.exports = DoctorRoutes;
