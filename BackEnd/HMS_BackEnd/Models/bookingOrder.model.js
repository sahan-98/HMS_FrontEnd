// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let bookingOrderSB = new Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSB",
      index: true,
    },

    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "venueSB",
      required: true,
      index: true,
    },

    bookingDate: {
      required: true,
      type: Date,
    },

    mobile: {
      type: String,
    },

    // online , cashAtCounter
    paymentType: {
      type: String,
      required: true,
    },
    // 0= not done , 1 - completed
    paymentStatus: {
      type: Number,
      required: true,
    },

    Totalfee: {
      required: true,
      type: Number,
    },
  },
  {
    collection: "bookingOrderSB",
  }
);

module.exports = mongoose.model("bookingOrderSB", bookingOrderSB);
