"use strict";
const express = require("express");
const labRepBillsRoutes = express.Router();

let labRepBill = require("../Models/labrepbill.model");

//Add Lab Report

// Update lab report

labRepBillsRoutes.post("/updatePayment/:id", async (req, res) => {
  try {
    labRepBill
      .findById(req.params.id)
      .then(async (labRepBillObj) => {
        labRepBillObj.payStatus = "completed";

        await labRepBillObj
          .save()
          .then(() => {
            return res.status(200).json({ data: labRepBillObj });
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

// get lab report

labRepBillsRoutes.route("/:id").get(async function (req, res) {
  try {
    let id = req.params.id;

    let labRepBill = await labRepBill.findById(id);
    if (!labRepBill) {
      console.log("err");
      return res.status(400).json({ message: err });
    } else {
      // Return the organizer and associated events
      return res.status(200).json({ success: true, data: labRepBill });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

labRepBillsRoutes.route("/patient/:id").get(async function (req, res) {
  try {
    let id = req.params.id;

    let labRepBill = await labRepBill.find({ patientid: id });
    if (!labRepBill) {
      console.log("err");
      return res.status(400).json({ message: err });
    } else {
      // Return the organizer and associated events
      return res.status(200).json({ success: true, data: labRepBill });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

labRepBillsRoutes.route("/completed/:id").get(async function (req, res) {
  try {
    let id = req.params.id;

    let labRepBill = await labRepBill.find({
      payStatus: "completed",
      patientid: id,
    });
    if (!labRepBill) {
      console.log("err");
      return res.status(400).json({ message: err });
    } else {
      // Return the organizer and associated events
      return res.status(200).json({ success: true, data: labRepBill });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

labRepBillsRoutes.route("/pending/:id").get(async function (req, res) {
  try {
    let id = req.params.id;

    let labRepBill = await labRepBill.find({
      payStatus: "pending",
      patientid: id,
    });
    if (!labRepBill) {
      console.log("err");
      return res.status(400).json({ message: err });
    } else {
      // Return the organizer and associated events
      return res.status(200).json({ success: true, data: labRepBill });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

labRepBillsRoutes.get("/", async (req, res) => {
  try {
    let labRepBill = await labRepBill.find().sort({ createdAt: -1 });
    if (!labRepBill) {
      console.log("err");
      return res.status(400).json({ message: "Details not available" });
    } else {
      res.status(200).json({ success: true, data: labRepBill });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

//update product by id

module.exports = labRepBillsRoutes;
