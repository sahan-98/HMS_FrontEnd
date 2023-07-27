const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let errorLogSB = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    //
    type: {
      type: String,
      required: true,
    },
    user: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
    },

    ip: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "errorLogSB",
  }
);

module.exports = mongoose.model("errorLogSB", errorLogSB);
