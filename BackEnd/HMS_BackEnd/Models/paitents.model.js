// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let paitents = new Schema(
  {
    password: {
      required: true,
      type: String,
    },

    email: {
      required: true,
      unique: true,
      type: String,
    },
    firstname: {
      required: true,
      type: String,
    },
    lastname: {
      required: true,
      type: String,
    },

    mobile: {
      required: true,
      unique: true,
      type: String,
    },

    email: {
      required: true,
      unique: true,
      type: String,
    },

    address: {
      required: true,
      unique: true,
      type: String,
    },

    dateOfBirth: {
      required: true,
      unique: true,
      type: String,
    },

    age: {
      required: true,
      unique: true,
      type: String,
    },

    labReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabsReports",
      required: true,
      index: true,
    },

    // imgURL: {
    //   type: String,
    // },

    // // New, Active , Banned
    // status: {
    //   type: String,
    // },
  },
  {
    collection: "paitents",
  }
);

module.exports = mongoose.model("paitents", paitents);
