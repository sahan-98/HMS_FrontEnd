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
  },
  {
    collection: "detection",
  }
);

module.exports = mongoose.model("detection", detection);
