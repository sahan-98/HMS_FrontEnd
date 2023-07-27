const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let notificationSB = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    status: {
      type: Number,
    },
  },
  {
    timestamps: true,
    collection: "notificationSB",
  }
);

module.exports = mongoose.model("notificationSB", notificationSB);
