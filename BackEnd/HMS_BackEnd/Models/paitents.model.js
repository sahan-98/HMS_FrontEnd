// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let paitents = new Schema(
  {
    userName: {
      required: true,
      type: String,
    },

    password: {
      required: true,
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
      type: String,
    },

    email: {
      required: true,
      unique: true,
      type: String,
    },

    address: {
      required: true,
      type: String,
    },

    dateOfBirth: {
      required: true,
      type: String,
    },

    gender: {
      required: true,
      type: String,
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
    collection: "Paitent",
  }
);

module.exports = mongoose.model("Paitent", paitents);
