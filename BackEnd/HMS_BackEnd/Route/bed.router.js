const express = require("express");
const bedRoutes = express.Router();
const bcrypt = require("bcrypt");
const axios = require("axios");

const moment = require("moment");
// const session = require("express-session");
// const auth = require("./Auth");
// const config = require("../configure.js");
// var nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// var Mailgen = require("mailgen");

let Bed = require("../Models/bed.models");
let BedBill = require("../Models/bedbill.model");

// add a new bed
bedRoutes.post("/add", async (req, res) => {
  const {
    bedNo,
    patientid,
    availability,
    wardNo,
    allocatedDate,
    releaseDate,
    bedFee,
  } = req.body;

  // const exist = await Bed.findOne({ patientid: patientid });
  // if (exist) {
  //   return res
  //     .status(202)
  //     .json({ warn: "A bed is Exist with this patient Id" });
  // }

  if (bedNo == "" || wardNo == "" || bedFee == "")
    return res.status(202).json({ warn: "Important field(s) are empty" });

  const newBed = new Bed({
    bedNo,
    patientid,
    availability,
    wardNo,
    allocatedDate,
    releaseDate,
    bedFee,
  });

  await newBed
    .save()
    .then(async (respond) => {
      res.status(200).json({ message: "Successfull" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error!" });
      console.log("error mail:", err);
    });
});

// bed manual allocate
bedRoutes.post("/allocateBed", async (req, res) => {
  try {
    const { patientid, bedNo, wardNo } = req.body;

    const exist = await Bed.findOne({ patientid: patientid });
    if (exist) {
      return res
        .status(202)
        .json({ warn: "A bed is Exist with this patientId" });
    }
    Bed.find({ bedNo: bedNo, wardNo: wardNo, availability: true })
      .then((bedObjs) => {
        if (bedObjs.length === 0) {
          return res.status(202).json({ warn: "No bed available" });
        }
        const bedObj = bedObjs[0];
        bedObj.patientid = req.body.patientid;
        bedObj.availability = false;
        bedObj.allocatedDate = req.body.allocatedDate;

        bedObj
          .save()
          .then(() => {
            return res.status(200).json("allocated");
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ message: err });
          });
      })
      .catch((err) => res.status(400).json({ message: err }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

// bed auto allocate
bedRoutes.post("/autoAllocateBed", async (req, res) => {
  console.log(req.body);

  try {
    Bed.findOne({ availability: true })
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

//bed release
bedRoutes.route("/releaseBed/:id").post(async function (req, res) {
  let nowDate = moment(req.body.releaseDate);
  try {
    Bed.findById(req.params.id)
      .then(async (bedObj) => {
        let patient = bedObj.patientid;

        let allocatedDate = bedObj.allocatedDate;
        // calculate number of dates from allocatedDate to todayDate
        let numberOfDates = nowDate.diff(allocatedDate, "days");
        if(numberOfDates === 0){
          numberOfDates = 1;
        }

        let totalPrice = numberOfDates * bedObj.bedFee;

        bedObj.patientid = null;
        bedObj.availability = true;
        bedObj.allocatedDate = null;
        bedObj.releaseDate = req.body.releaseDate;
        bedObj.estimation = null;

        await bedObj
          .save()
          .then(async (respond) => {
            const newBedBill = new BedBill({
              bedNo: respond.bedNo,
              patientid: patient,
              availability: true,
              wardNo: respond.wardNo,
              allocationDate: allocatedDate,
              totalPrice,
              dayStayed: numberOfDates,
              payStatus: "pending",
            });

            await newBedBill.save();

            return res.status(200).json({ bill: newBedBill });
          })
          .catch((err) => res.status(400).json({ message: err }));
      })
      .catch((err) => res.status(400).json({ message: err }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

bedRoutes.route("/release-all-beds").post(async function (req, res) {
  let nowDate = moment(req.body.releaseDate);
  try {
    const beds = await Bed.find({ availability: false });
    for (let i = 0; i < beds.length; i++) {
      const bedObj = beds[i];
      let patient = bedObj.patientid;

      let allocatedDate = bedObj.allocatedDate;
      // calculate number of dates from allocatedDate to todayDate
      const numberOfDates = nowDate.diff(allocatedDate, "days");

      let totalPrice = numberOfDates * bedObj.bedFee;

      bedObj.patientid = null;
      bedObj.availability = true;
      bedObj.allocatedDate = null;
      bedObj.releaseDate = req.body.releaseDate;
      bedObj.estimation = null;

      await bedObj.save().then(async (respond) => {
        const newBedBill = new BedBill({
          bedNo: respond.bedNo,
          patientid: patient,
          availability: true,
          wardNo: respond.wardNo,
          allocationDate: allocatedDate,
          totalPrice,
          dayStayed: numberOfDates,
          payStatus: "pending",
        });

        await newBedBill.save();
      });
    }
    return res
      .status(200)
      .json({ message: "success", data: `released ${beds.length} beds` });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

//estimate bed stay days
bedRoutes.post("/stayDays", async (req, res) => {
  await axios
    .post(`http://127.0.0.1:5001/predict`, {
      Available_Extra_Rooms_in_Hospital:
        req.body.Available_Extra_Rooms_in_Hospital,
      staff_available: req.body.staff_available,
      Visitors_with_Patient: req.body.Visitors_with_Patient,
      Admission_Deposit: req.body.Admission_Deposit,
      Ward_Facility_Code_B: req.body.Ward_Facility_Code_B,
      Ward_Facility_Code_C: req.body.Ward_Facility_Code_C,
      Ward_Facility_Code_D: req.body.Ward_Facility_Code_D,
      Ward_Facility_Code_E: req.body.Ward_Facility_Code_E,
      Ward_Facility_Code_F: req.body.Ward_Facility_Code_F,
      Age_20_Nov: req.body.Age_20_Nov,
      Age_21_30: req.body.Age_21_30,
      Age_31_40: req.body.Age_31_40,
      Age_41_50: req.body.Age_41_50,
      Age_51_60: req.body.Age_51_60,
      Age_61_70: req.body.Age_61_70,
      Age_71_80: req.body.Age_71_80,
      Age_81_90: req.body.Age_81_90,
      Age_91_100: req.body.Age_91_100,
      gender_Male: req.body.gender_Male,
      gender_Other: req.body.gender_Other,
      Type_of_Admission_Trauma: req.body.Type_of_Admission_Trauma,
      Type_of_Admission_Urgent: req.body.Type_of_Admission_Urgent,
      Severity_of_Illness_Minor: req.body.Severity_of_Illness_Minor,
      Severity_of_Illness_Moderate: req.body.Severity_of_Illness_Moderate,
      Insurance_Yes: req.body.Insurance_Yes,
    })
    .then(async (flaskRes) => {
      console.log("==========Flask Response is============");
      console.log(flaskRes.data.predicted_stay);
      console.log("====================================");

      try {
        const estimateValue = flaskRes.data.predicted_stay.toString();
        const bedid = req.body._id;
        const bedObj = await Bed.findOne({ _id: bedid });

        if (!bedObj) {
          return res.status(404).json({ message: "Bed not found" });
        }

        bedObj.estimation = estimateValue;

        await bedObj.save();
        return res.status(200).json({ data: bedObj });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json("Error " + err);
    });
});

// get patient for bed details
bedRoutes.get("/allocateBed/:id", async (req, res) => {
  await Bed.find({ patientid: req.params.id })
    .then((data) => {
      return res.status(200).send({ data: data });
    })
    .catch((error) => {
      return res.status(500).send({ error: error.message });
    });
});

//get extra bed count
bedRoutes.get("/availableBedCount", async (req, res) => {
  try {
    const availbleBedCount = await Bed.find({ availability: "true" });
    return res
      .status(200)
      .json({ success: true, count: availbleBedCount.length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

bedRoutes.get("/", async (req, res) => {
  try {
    let data = await Bed.find().sort({ createdAt: -1 });
    if (!data) {
      console.log("err");
      return res.status(400).json({ message: "Details not available" });
    } else {
      res.status(200).json({ success: true, data: data });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = bedRoutes;
