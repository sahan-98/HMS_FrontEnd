const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var bedSchema = new mongoose.Schema({
  bedNo: {
    required: true,
    type: String,
  },

  wardNo: {
    required: true,
    type: String,
  },

  patientid: {
    required: false,
    type: String,
  },

  availability: {
    required: true,
    type: Boolean,
  },

  allocatedDate: {
    required: false,
    type: Date,
  },

  releaseDate: {
    required: false,
    type: Date,
  },

  bedFee: {
    required: true,
    type: Number,
  },
  estimation: {
    required: true,
    type: Number,
  },
});

//Export the model
module.exports = mongoose.model("Beds", bedSchema);
