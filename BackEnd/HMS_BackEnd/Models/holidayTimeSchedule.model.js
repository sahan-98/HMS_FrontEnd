const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let holidayScheduleSB = new Schema(
  {
    holidayType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "holidayTypeSB",
      required: true,
      index: true,
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
    collection: "holidayScheduleSB",
  }
);

module.exports = mongoose.model("holidayScheduleSB", holidayScheduleSB);
