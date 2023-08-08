"use strict";
const express = require("express");
const labReportsRoutes = express.Router();

let LabReport = require("../Models/labReport.model");

//Add Lab Report

labReportsRoutes.post("/add", async (req, res) => {
  const { reportName,type,doctorid,labAssistantid,paitentid,LDL,HDL,TotalCholesterol,Triglycerides,VLDLlevels,WBCcount,RBCcount,platelets,contactEmail,hemoglobin,hematocrit } = req.body;

  // const salt = await bcrypt.genSalt();
  // const passwordHash = await bcrypt.hash(password, salt);

  // if (
  //   mobile == "" ||
  //   userName == "" ||
  //   password == "" ||
  //   email == "" ||
  //   address == "" ||
  //   dateOfBirth == "" ||
  //   firstname == "" ||
  //   lastname == ""
  // )
  //   return res.status(202).json({ warn: "Important field(s) are empty" });

  if (type === "Cholesterol report"){
    // return res.status(202).json({ warn: "Passwords Do not Match!" });

  // const exist = await LabAssistant.findOne({ email: email });
  // if (exist) {
  //   return res
  //     .status(202)
  //     .json({ warn: "An account is Exist with this email" });
  // }

  // const exist2 = await LabReports.findOne({ mobile: mobile });
  // if (exist2) {
  //   return res
  //     .status(202)
  //     .json({ warn: "This mobile number is not available.Try another one" });
  // }

  // upload

  const newLabReport1 = new LabReport({
    reportName,
    type,
    doctorid,
    labAssistantid,
    paitentid,
    contactEmail,
    LDL,
    HDL,
    TotalCholesterol,
    Triglycerides,
    VLDLlevels,
    status: "Pending",
  });

  await newLabReport1
    .save()
    .then(async (respond) => {
      res.status(200).json({ message: "Successfull" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error!" });
      console.log("error mail:", err);
    });
  }

  else if (type === "Full Blood Count report") {

    const newLabReport2 = new LabReport({
      reportName,
      type,
      doctorid,
      labAssistantid,
      paitentid,
      WBCcount,
      RBCcount,
      platelets,
      contactEmail,
      hemoglobin,
      hematocrit,
      status: "Pending",
    });
  
    await newLabReport2
      .save()
      .then(async (respond) => {
        res.status(200).json({ message: "Successfull" });
      })
      .catch((err) => {
        res.status(400).json({ message: "Error!" });
        console.log("error mail:", err);
      });

  }
});


// Update lab report

labReportsRoutes.post("/update/:id", async (req, res) => {
  console.log(req.body);

  const {type} = req.body;

  if(type === "Cholesterol report"){

  try {
    LabReport.find(req.params.id)
      .then((labReportObj) => {
        labReportObj.LDL = req.body.LDL;
        labReportObj.HDL = req.body.HDL;
        labReportObj.TotalCholesterol = req.body.TotalCholesterol;
        labReportObj.Triglycerides = req.body.Triglycerides;
        labReportObj.VLDLlevels = req.body.VLDLlevels;
        labReportObj.status = "completed";

        labReportObj
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

else if(type === "Full Blood Count report"){

  try {
    LabReport.find(req.params.id)
      .then((labReportObj) => {
        labReportObj.WBCcount = req.body.WBCcount;
        labReportObj.RBCcount = req.body.RBCcount;
        labReportObj.platelets = req.body.platelets;
        labReportObj.hemoglobin = req.body.hemoglobin;
        labReportObj.hematocrit = req.body.hematocrit;
        labReportObj.status = "completed";

        labReportObj
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

//update product by id

module.exports = labReportsRoutes;
