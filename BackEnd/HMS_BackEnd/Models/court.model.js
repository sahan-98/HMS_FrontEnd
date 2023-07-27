const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let venueSB = new Schema(
  {
    courtLabel: {
      unique: true,
      type: String,
      required: true,
    },

    chargeUnit: {
      type: Number,
      required: true,
    },

    rate: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    previewURL: {
      type: String,
      required: true,
    },

    courtCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courtCategorySB",
      required: true,
      index: true,
    },

    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "venueSB",
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
