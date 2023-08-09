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

    invoiceDate: {
      required: true,
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
