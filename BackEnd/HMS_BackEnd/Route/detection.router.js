"use strict";
const express = require("express");
const axios = require("axios");
const detectionRoutes = express.Router();

let detection = require("../Models/detection.model");

//add event
detectionRoutes.post("/add", async (req, res) => {
  //  data = request.get_json((force = True));
  //  age = data["age"];
  //  sex = data["sex"];
  //  chest_pain_type = data["chest_pain_type"];
  //  resting_bp = data["resting_bp"];
  //  cholesterol = data["cholesterol"];
  //  fasting_bs = data["fasting_bs"];
  //  resting_ecg = data["resting_ecg"];
  //  max_hr = data["max_hr"];
  //  exercise_angina = data["exercise_angina"];
  //  oldpeak = data["oldpeak"];
  //  st_slope = data["st_slope"];
  console.log(req.body.chest_pain_type);
  await axios
    .post(`http://localhost:5000/predict`, {
      age: req.body.age,
      sex: req.body.sex,
      chest_pain_type: req.body.chest_pain_type,
      resting_bp: req.body.resting_bp,
      cholesterol: req.body.cholesterol,
      resting_ecg: req.body.resting_ecg,
      fasting_bs: req.body.fasting_bs,
      max_hr: req.body.max_hr, 
      exercise_angina: req.body.exercise_angina,
      oldpeak: req.body.oldpeak,
      st_slope: req.body.st_slope,
    })
    .then(async (flaskRes) => {
      console.log("==========Flask Response is============");
      console.log(flaskRes);
      console.log("====================================");

      const newdetection = new detection({
        patientId: req.body.patientId,
        label: flaskRes.data.prediction,
        accuracy: flaskRes.data.accuracy,
        sT_Slope: flaskRes.data.prediction_expblAI_index[10],
        ChestPainType: flaskRes.data.prediction_expblAI_index[2],
        sex: flaskRes.data.prediction_expblAI_index[1],
        maxHR: flaskRes.data.prediction_expblAI_index[7],
        ageAndMaxHR: flaskRes.data.prediction_expblAI_index[12],
        exerciseAngina: flaskRes.data.prediction_expblAI_index[8],
        oldPeak: flaskRes.data.prediction_expblAI_index[9],
        cholesterol: flaskRes.data.prediction_expblAI_index[4],
        age: flaskRes.data.prediction_expblAI_index[0],
        oldPeakAndSt_Slope: flaskRes.data.prediction_expblAI_index[20],
        fastingBS: flaskRes.data.prediction_expblAI_index[5],
        restingECGAndSt_Slope: flaskRes.data.prediction_expblAI_index[18],
        ageAndOldPeak: flaskRes.data.prediction_expblAI_index[13],
        ageAndSt_Slope: flaskRes.data.prediction_expblAI_index[14],
        cholesterolAndOldPeak: flaskRes.data.prediction_expblAI_index[16],
      });

      await newdetection
        .save()
        .then((data) => {
          let urgency = false;

          if (flaskRes.data.prediction) {
            if (req.body.chest_pain_type !== "3" && req.body.exercise_angina === "1") {
              urgency = true;
            }
          }
          return res.json({
            prediction: flaskRes.data.prediction,
            urgentStatus: urgency,
            data
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).send({ error: error.message });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json("Error " + err);
    });
});


// get events list by a host
detectionRoutes.get("/patient/:key", async (req, res) => {
  try {
    let key = req.params.key;
    console.log(key);
    let detectionData = await detection.find({ patientId: key }).sort({
      updatedAt: -1,
    });
    if (!detectionData) {
      return res.status(402).json({ code: "DERROR", warn: "DATABASE ERROR" });
    } else {
      return res.status(200).json({ success: true, data: detectionData });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

// get events by id
detectionRoutes.route("/:id").get(async function (req, res) {
  try {
    let id = req.params.id;

    let detection = await detection.findById(id);
    if (!detection) {
      // console.log("err");
      return res
        .status(402)
        .json({ code: "DEMPTY", warn: "DATABASE SCHEMA IS EMPTY" });
    } else {
      return res.status(200).json({ success: true, data: detection });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});
//get all
detectionRoutes.get("/", async (req, res) => {
  try {
    let detections = await detection.find().sort({ createdAt: -1 });
    if (!detections) {
      return res
        .status(402)
        .json({ code: "DEMPTY", warn: "DATABASE SCHEMA IS EMPTY" });
    } else {
      res.status(200).json({ success: true, data: detections });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = detectionRoutes;
