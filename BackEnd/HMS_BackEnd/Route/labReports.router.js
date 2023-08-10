"use strict";
const express = require("express");
const labReportsRoutes = express.Router();

let LabReport = require("../Models/labReport.model");
let labRepBill = require("../Models/labrepbill.model");

//Add Lab Report

labReportsRoutes.post("/add", async (req, res) => {
  const {
    type,
    doctorid,
    labAssistantid,
    patientid,
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
  console.log(req.body);

  const { type } = req.body;

  if (type === "Cholesterol report") {
    try {
      LabReport.findById(req.params.id)
        .then(async (labReportObj) => {
          labReportObj.LDL = req.body.LDL;
          labReportObj.HDL = req.body.HDL;
          labReportObj.TotalCholesterol = req.body.TotalCholesterol;
          labReportObj.Triglycerides = req.body.Triglycerides;
          labReportObj.VLDLlevels = req.body.VLDLlevels;
          labReportObj.status = "completed";

          await labReportObj
            .save()
            .then(() => {
              return res.status(200).json({ data: labReportObj });
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
  } else if (type === "Full Blood Count report") {
    try {
      LabReport.find(req.params.id)
        .then(async (labReportObj) => {
          labReportObj.WBCcount = req.body.WBCcount;
          labReportObj.RBCcount = req.body.RBCcount;
          labReportObj.platelets = req.body.platelets;
          labReportObj.hemoglobin = req.body.hemoglobin;
          labReportObj.hematocrit = req.body.hematocrit;
          labReportObj.status = "completed";

          await labReportObj
            .save()
            .then(() => {
              return res.status(200).json("Updated");
            })
            .catch((err) => res.status(400).json({ message: err }));
        })
        .catch((err) => res.status(400).json({ message: err }));
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Server Error" });
    }
  }
});

//get pending counts
labReportsRoutes.get("/pendingBillsCount", async (req, res) => {
  try {
    const pendingCount = await LabReport.find({ status: "Pending" });
    return res.status(200).json({ success: true, count: pendingCount.length });
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
