const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let specialTimeScheduleSB = new Schema(
  {
    date: {
      type: Date,

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
    collection: "specialTimeScheduleSB",
  }
);

module.exports = mongoose.model("specialTimeScheduleSB", specialTimeScheduleSB);
