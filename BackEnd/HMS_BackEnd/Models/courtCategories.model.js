const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let courtCategorySB = new Schema(
  {
    name: {
      unique: true,
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "courtCategorySB",
  }
);

module.exports = mongoose.model("courtCategorySB", courtCategorySB);
