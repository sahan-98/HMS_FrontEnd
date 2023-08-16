// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let labRepBill = new Schema(
  {
    patientid: {
      required: true,
      type: String,
    },
    reportNo: {
      required: true,
      type: String,
    },

    totalPrice: {
      type: Number,
    },
    payStatus: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "labRepBill",
  }
);

module.exports = mongoose.model("labRepBill", labRepBill);
