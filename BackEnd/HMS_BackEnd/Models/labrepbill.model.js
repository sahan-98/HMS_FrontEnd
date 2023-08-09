// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let labRepBill = new Schema(
  {
    patientId: {
      required: true,
      type: String,
    },
    reportNo: {
      required: true,
      type: Number,
    },

    totalPrice: {
      type: Number,
    },

    //

    payStatus: {
      required: true,
      type: String,
    },
  },
  {
    collection: "labRepBill",
  }
);

module.exports = mongoose.model("labRepBill", labRepBill);
