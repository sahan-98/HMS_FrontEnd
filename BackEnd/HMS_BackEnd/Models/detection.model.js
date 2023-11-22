// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let detection = new Schema(
  {
    patientId: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },

    accuracy: {
      type: Number,
    },

    sT_Slope: {
      type: Number,
    },
    ChestPainType: {
      type: Number,
    },
    sex: {
      type: Number,
    },
    maxHR: {
      type: Number,
    },
    ageAndMaxHR: {
      type: Number,
    },
    exerciseAngina: {
      type: Number,
    },
    oldPeak: {
      type: Number,
    },
    cholesterol: {
      type: Number,
    },
    age: {
      type: Number,
    },
    oldPeakAndSt_Slope: {
      type: Number,
    },
    fastingBS: {
      type: Number,
    },
    restingECGAndSt_Slope: {
      type: Number,
    },
    ageAndOldPeak: {
      type: Number,
    },
    ageAndSt_Slope: {
      type: Number,
    },
    cholesterolAndOldPeak: {
      type: Number,
    },

  },
  {
    collection: "detection",
  }
);

module.exports = mongoose.model("detection", detection);
