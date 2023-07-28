const express = require("express");
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { v4: uuid_v4  } = require('uuid');
const DoctorRoutes = express.Router();

const HttpError = require('../Models/http-error');
const Doctor = require('../Models/doctor.models');
// const Payment = require('../schemas/payment-schema');
// const Role = require('../_helpers/role');


// user auth
// const authenticate = async ({ email, password }) => {
//     let user = null;
//     try{
//         user = await User.findOne({ email: email });
//       } catch(err) {
//         const error = new HttpError(
//           'Something went wrong, could not find user.',
//           500
//         );
//         return error;
//       }

// const { Doctor } = require("../_helpers/role");

//       const match = await bcrypt.compare(password, user.password);
//       if(match) {
//         const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
//         const { password, ...userWithoutPassword } = user;
//         return {
//             ...userWithoutPassword,
//             token
//         };
//       } else {
//         return res.json({success: false, message: 'passwords do not match'});
//       }
// }



// Save Docotr details
DoctorRoutes.post("/addDoctor", async (req, res, next) => {
    console.log('Adding the doctor');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs! Please check again.', 422));
    }

    const { name, email, password,  phone, fee, age, speciality, address, degree, salary,availbleTime, dateOfJoin ,gender } = req.body;

    let existingDoctor;
    try{
      existingDoctor = await Doctor.findOne({ email: email});
    } catch(err) {
      const error = new HttpError(
        'Something went wrong, could not add doctor details.',
        500
      );
      return next(error);
    }

    if(existingDoctor) {
        const error = new HttpError(
          'Doctor already exists.',
          422
        );
        return next(error);
      }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newDoctor = new Doctor({
        doctorid: uuid_v4(),
        name,
        email,
        password: hashedPassword,
        phone,
        fee, 
        age, 
        speciality, 
        address, 
        degree, 
        salary, 
        availbleTime, 
        dateOfJoin,
        gender
    });

    await newDoctor.save()
      .then(data => {
        res.status(200).send({ data: data });
      })
      .catch(error => {
        res.status(500).send({ error: error.message });
      });
});

// get all doctor details
DoctorRoutes.get("/allDoctors", async (req, res) => {
  await Doctor.find({})
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
});

// get single doctor details
DoctorRoutes.get("/singleDoctors/:id",async (req, res) => {
  await Doctor.findById(req.params.id)
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
});

// update Doctor details
DoctorRoutes.put("/updateDoctors/:id", async (req, res) => {
  console.log(req.body)
  if(!req.body){
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
    await Doctor.findByIdAndUpdate(req.params.id,req.body,{useFindAndModify : false})
      .then(data => {
        if(!data){
          res.status(400).send({ message: 'cannot update doctor details' });
        }else res.status(200).send({ data: data });
      })
      .catch(error => {
        res.status(500).send({ error: error.message });
      });
  
});

// Delete Doctor details
DoctorRoutes.delete("/deleteDoctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.params.id })
    if (!doctor) {
      return res.status(422).json({ error: "doctor not found" });
    }

    await Doctor.deleteOne({ _id: req.params.id });
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = DoctorRoutes;