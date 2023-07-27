// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let userSB = new Schema(
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

    imgURL: {
      type: String,
    },

    // New, Active , Banned
    status: {
      type: String,
    },
  },
  {
    collection: "userSB",
  }
);

module.exports = mongoose.model("userSB", userSB);
