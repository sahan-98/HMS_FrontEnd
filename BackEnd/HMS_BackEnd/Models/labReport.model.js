const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define collection for events
let labsReports = new Schema(
  {
    type: {
      type: String,
      required: true,
    },

    doctorid: {
      type: String,
      required: true,
    },

    labAssistantid: {
      type: String,
      required: true,
    },

    patientid: {
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

    status: {
      type: String,
    },

    labReportFee: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
    collection: "LabsReports",
  }
);

module.exports = mongoose.model("LabsReports", labsReports);
