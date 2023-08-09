// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let appoinmentBill = new Schema(
  {
    patientId: {
      required: true,
      type: String,
    },
    doctorId: {
      required: true,
      type: String,
    },
    bookingDate: {
      required: true,
      type: Date,
    },
    // emergancy
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
