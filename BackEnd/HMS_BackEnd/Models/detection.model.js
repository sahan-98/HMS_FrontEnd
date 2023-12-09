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
    detect_sT_Slope:{
      type:String
    },
    detect_ChestPainType:{
      type:String
    },
    detect_sex:{
      type:String
    },
    detect_maxHR:{
      type:String
    },
    detect_exerciseAngina:{
      type:String
    },
    detect_oldPeak:{
      type:String
    },
    detect_cholesterol:{
      type:String
    },
    detect_age:{
      type:String
    },
    detect_fastingBS:{
      type:String
    },
    detect_resting_ecg:{
      type:String
    },
    detect_resting_bp:{
      type:String
    }

  },
  {
    collection: "detection",
  }
);

module.exports = mongoose.model("detection", detection);
