const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var bedSchema = new mongoose.Schema({
  bedNo: {
    required: false,
    type: String,
  },

  wardNo: {
    required: false,
    type: String,
  },

  patientid: {
    required: false,
    type: String,
  },

  availability: {
    required: false,
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
    required: false,
    type: Number,
  },
  
  estimation: {
    type: String,
  },
});

//Export the model
module.exports = mongoose.model("Beds", bedSchema);
