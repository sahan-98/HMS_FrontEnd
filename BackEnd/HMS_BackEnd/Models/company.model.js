const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let companySB = new Schema(
  {
    companyName: {
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
  },
  {
    timestamps: true,
    collection: "companySB",
  }
);

module.exports = mongoose.model("companySB", companySB);
