// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let clientAdminSB = new Schema(
  {
    username: {
      required: true,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },

    email: {
      required: true,
      unique: true,
      type: String,
    },

    contactMobile: {
      type: String,
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companySB",
      required: true,
      index: true,
    },
  },
  {
    collection: "clientAdminSB",
  }
);

module.exports = mongoose.model("clientAdminSB", clientAdminSB);
