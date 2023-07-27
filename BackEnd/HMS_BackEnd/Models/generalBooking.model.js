// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let generalBookingSB = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSB",
      required: true,
      index: true,
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "venueSB",
      index: true,
    },

    court: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courtSB",
      required: true,
      index: true,
    },

    bookingOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookingOrderSB",
      required: true,
      index: true,
    },

    date: {
      required: true,
      type: Date,
    },

    scheduleIndex: {
      required: true,
      type: Number,
    },

    startTime: {
      required: true,
      type: Date,
    },

    endTime: {
      required: true,
      type: Date,
    },

    // online , cashAtCounter
    paymentType: {
      type: String,
    },
    // 0= not done , 1 - completed
    paymentStatus: {
      type: Number,
    },

    fee: {
      required: true,
      type: Number,
    },
  },
  {
    collection: "generalBookingSB",
  }
);

module.exports = mongoose.model("generalBookingSB", generalBookingSB);
