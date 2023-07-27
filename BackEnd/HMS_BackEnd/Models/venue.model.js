const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let venueSB = new Schema(
  {
    venueName: {
      unique: true,
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    contactMobile: {
      type: String,
      required: true,
    },

    contactEmail: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    displayAddress: {
      type: String,
      required: true,
    },

    mainCity: {
      type: String,
      required: true,
    },

    subCity: {
      type: String,
      required: true,
    },

    previewURL: {
      type: String,
      required: true,
    },

    logoURL: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
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
    timestamps: true,
    collection: "venueSB",
  }
);

module.exports = mongoose.model("venueSB", venueSB);
