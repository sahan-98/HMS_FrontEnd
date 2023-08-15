"use strict";
const express = require("express");
const labReportsRoutes = express.Router();

let LabReport = require("../Models/labReport.model");
let labRepBill = require("../Models/labrepbill.model");
let Appointment = require("../Models/appoinmentbill.model");

//Add Lab Report

labReportsRoutes.post("/add", async (req, res) => {
  const {
    type,
    doctorid,
    labAssistantid,
    patientid,
    appointmentId,
    LDL,
    HDL,
    TotalCholesterol,
    Triglycerides,
    VLDLlevels,
    WBCcount,
    RBCcount,
    platelets,
    contactEmail,
    hemoglobin,
    hematocrit,
  } = req.body;

  if (type === "Cholesterol report") {
    // upload

    const newLabReport1 = new LabReport({
      type,
      doctorid,
      labAssistantid,
      patientid,
      contactEmail,
      LDL,
      HDL,
      TotalCholesterol,
      Triglycerides,
      labReportFee: 2000,
      VLDLlevels,
      status: "Pending",
    });

    await newLabReport1
      .save()
      .then(async (respond) => {
        const appoiment = await Appointment.findById(appointmentId);
        console.log(appoiment);
        appoiment.labReportid = respond._id;
        await appoiment.save();
        //add report bill

        const newLabBill = new labRepBill({
          patientid,
          reportNo: respond._id,
          type,
          totalPrice: 2000,
          payStatus: "Pending",
        });

        await newLabBill
          .save()
          .then(async (respond) => {
            //add report bill

            return res.status(200).json({ message: "Successfull" });
          })
          .catch((err) => {
            res.status(400).json({ message: "Error!" });
            console.log("error :", err);
          });
        // res.status(200).json({ message: "Successfull" });
      })
      .catch((err) => {
        console.log("error :", err);
        return res.status(400).json({ message: "Error!" });
      });
  } else if (type === "Full Blood Count report") {
    const newLabReport2 = new LabReport({
      type,
      doctorid,
      labAssistantid,
      patientid,
      WBCcount,
      RBCcount,
      platelets,
      contactEmail,
      hemoglobin,
      hematocrit,
      labReportFee: 3000,
      status: "Pending",
    });

    await newLabReport2
      .save()
      .then(async (respond) => {
        const appoiment = await Appointment.findById(appointmentId);
        console.log(appoiment);
        appoiment.labReportid = respond._id;
        await appoiment.save();

        //add report bill
        const newLabBill = new labRepBill({
          patientid,
          reportNo: respond._id,
          type,
          totalPrice: 3000,
          payStatus: "Pending",
        });

        await newLabBill
          .save()
          .then(async (respond) => {
            //add report bill

            return res.status(200).json({ message: "Successfull" });
          })
          .catch((err) => {
            console.log("error :", err);
            return res.status(400).json({ message: "Error!" });
          });
      })
      .catch((err) => {
        console.log("error :", err);
        return res.status(400).json({ message: "Error!" });
      });
  }
});

// Update lab report

labReportsRoutes.post("/updateResult/:id", async (req, res) => {
  try {
    const {
      LDL,
      HDL,
      TotalCholesterol,
      Triglycerides,
      VLDLlevels,
      WBCcount,
      RBCcount,
      platelets,
      hemoglobin,
      hematocrit,
    } = req.body;
    const labreport = await LabReport.findById(req.params.id);
    if (labreport.type === "Cholesterol report") {
      labreport.LDL = LDL;
      labreport.HDL = HDL;
      labreport.TotalCholesterol = TotalCholesterol;
      labreport.Triglycerides = Triglycerides;
      labreport.VLDLlevels = VLDLlevels;
      labreport.status = "completed";
    } else if (labreport.type === "Full Blood Count report") {
      labreport.WBCcount = WBCcount;
      labreport.RBCcount = RBCcount;
      labreport.platelets = platelets;
      labreport.hemoglobin = hemoglobin;
      labreport.hematocrit = hematocrit;
      labreport.status = "completed";
    }
    await labreport.save();
    return res.status(200).json({ data: labreport });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
});

//get pending counts
labReportsRoutes.get("/pendingBillsCount", async (req, res) => {
  try {
    const pendingCount = await LabReport.find({ status: "Pending" });
    return res.status(200).json({ success: true, data: pendingCount.length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

//get all report counts
labReportsRoutes.get("/allBillsCount", async (req, res) => {
  try {
    const pendingCount = await LabReport.find({});
    return res.status(200).json({ success: true, data: pendingCount.length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// get lab report
labReportsRoutes.route("/:id").get(async function (req, res) {
  try {
    let id = req.params.id;

    let labReport = await LabReport.findById(id);
    if (!labReport) {
      console.log("err");
      return res.status(400).json({ message: err });
    } else {
      // Return the organizer and associated events
      return res.status(200).json({ success: true, data: labReport });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

// get lab report
labReportsRoutes
  .route("/get-by-lab-assistant/:labAssistantId")
  .get(async function (req, res) {
    try {
      let labAssistantId = req.params.labAssistantId;

      let labReport = await LabReport.aggregate([
        {
          $match: {
            labAssistantid: labAssistantId,
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
        { $addFields: { labAssistantid: { $toObjectId: "$labAssistantid" } } },
        {
          $lookup: {
            from: "labassistants",
            localField: "labAssistantid",
            foreignField: "_id",
            as: "labAssistant",
          },
        },
        {
          $unwind: "$labAssistant",
        },
        { $addFields: { patientid: { $toObjectId: "$patientid" } } },
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
          $project: {
            "doctor.password": 0,
            "labAssistant.password": 0,
            "patient.password": 0,
          },
        },
      ]);

      if (!labReport) {
        console.log("err");
        return res.status(400).json({ message: err });
      } else {
        // Return the organizer and associated events
        return res.status(200).json({ success: true, data: labReport });
      }
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Server Error" });
    }
  });

labReportsRoutes.get("/", async (req, res) => {
  try {
    let labReport = await LabReport.find().sort({ createdAt: -1 });
    if (!labReport) {
      console.log("err");
      return res.status(400).json({ message: "Details not available" });
    } else {
      res.status(200).json({ success: true, data: labReport });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = labReportsRoutes;
