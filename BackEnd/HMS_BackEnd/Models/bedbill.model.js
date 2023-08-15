// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let bedAllocation = new Schema(
  {
    patientid: {
      required: true,
      type: String,
    },
    bedNo: {
      required: true,
      type: Number,
    },
    allocationDate: {
      required: true,
      type: Date,
    },

    totalPrice: {
      type: Number,
    },

    dayStayed: {
      type: Number,
    },

    //

    payStatus: {
      required: true,
      type: String,
    },

    // // bed status
    // bedStatus: {
    //   required: true,
    //   type: String,
    // },
  },
  {
    collection: "bedAllocation",
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bedAllocation", bedAllocation);
