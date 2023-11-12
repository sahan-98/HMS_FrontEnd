// medOfficer.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for medOfficers
let medOfficers = new Schema(
  {
    userName: {
      required: true,
      type: String,
    },

    password: {
      required: true,
      type: String,
    },

    firstname: {
      required: true,
      type: String,
    },

    lastname: {
      required: true,
      type: String,
    },

    mobile: {
      required: true,
      type: String,
    },

    email: {
      required: true,
      unique: true,
      type: String,
    },

    address: {
      required: true,
      type: String,
    },

    gender: {
      required: true,
      type: String,
    },

  },
  {
    collection: "MedOfficer",
  }
);

module.exports = mongoose.model("MedOfficer", medOfficers);
