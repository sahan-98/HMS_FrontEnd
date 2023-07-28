const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let labsReports = new Schema(
  {
    reportName: {
      unique: true,
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    LDL: {
      type: String,
    },

    HDL: {
      type: String,
    },

    TotalCholesterol: {
      type: String,
    },

    Triglycerides: {
      type: String,
    },

    VLDLlevels: {
      type: String,
    },

    WBCcount: {
      type: String,
    },

    RBCcount: {
      type: String,
    },

    platelets: {
      type: String,
    },

    contactEmail: {
      type: String,
    },

    hemoglobin: {
      type: String,
    },

    hematocrit: {
      type: String,
    },

  },
  {
    timestamps: true,
    collection: "labsReports",
  }
);

module.exports = mongoose.model("labsReports", labsReports);
