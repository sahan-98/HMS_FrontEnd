const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let holidayTypeSB = new Schema(
  {
    code: {
      type: String,
      required: true,
    },

    holidayName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "holidayTypeSB",
  }
);

module.exports = mongoose.model("holidayTypeSB", holidayTypeSB);
