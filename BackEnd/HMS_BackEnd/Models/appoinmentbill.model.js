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
      type: String,
    },
    doctorAvailability: {
      type: String,
    },
    bookingDate: {
      required: true,
      type: Date,
    },
    type: {
      required: true,
      type: String,
    },
    appointmentType:{
      required: false,
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
