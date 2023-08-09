// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let invoice = new Schema(
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
      type: Date,
    },
    queueNumber: {
      type: Date,
    },
    totalPrice: {
      required: true,
      type: Date,
    },
  },
  {
    collection: "invoice",
  }
);

module.exports = mongoose.model("invoice", invoice);
