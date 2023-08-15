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

  const exist = await Bed.findOne({ patientid: patientid });
  if (exist) {
    return res
      .status(202)
      .json({ warn: "A bed is Exist with this patient Id" });
  }

  if (bedNo == "" || wardNo == "" || bedFee == "")
    return res.status(202).json({ warn: "Important field(s) are empty" });

  const newBed = new Bed({
    bedNo,
    patientid,
    availability: true,
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
bedRoutes.post("/allocateBed/:id", async (req, res) => {
  console.log(req.body);
  try {

    const {
      patientid,
    } = req.body;

    const exist = await Bed.findOne({ patientid: patientid });
  if (exist) {
    return res
      .status(202)
      .json({ warn: "A bed is Exist with this patientId" });
  }
    Bed.findById(req.params.id)
      .then((bedObj) => {
        bedObj.patientid = req.body.patientid;
        bedObj.availability = false;
        bedObj.allocatedDate = req.body.allocatedDate;

        bedObj
          .save()
          .then(() => {
            return res.status(200).json("allocated");
          })
          .catch((err) => res.status(400).json({ message: err }));
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
        const numberOfDates = nowDate.diff(allocatedDate, "days");

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

            await newBedBill
            .save();

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
    return res.status(200).json({ success: true, count: availbleBedCount.length });
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
