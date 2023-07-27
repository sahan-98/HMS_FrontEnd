const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let generalScheduleSB = new Schema(
  {
    day: {
      type: String,
      required: true,
    },

    status: {
      type: Number,
      required: true,
    },

    openTime: {
      type: Date,
      required: true,
    },

    closeTime: {
      type: Date,
      required: true,
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
    collection: "generalScheduleSB",
  }
);

module.exports = mongoose.model("generalScheduleSB", generalScheduleSB);
