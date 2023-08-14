// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let appoinmentBill = new Schema(
  {
    patientid: {
      required: true,
      type: String,
    },
    visitStatus: {
      required: true,
      type: String,
    },
    doctorid: {
      required: true,
      type: String,
    },
    labReportid: {
      required: true,
      type: String,
    },
    bookingDate: {
      required: true,
      type: Date,
    },
    doctorAvailability: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
    queueNumber: {
      type: Number,
    },
    totalPrice: {
      required: true,
      type: Number,
    },
  },
  {
    collection: "appoinmentBill",
  }
);

module.exports = mongoose.model("appoinmentBill", appoinmentBill);
