const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var labAssistSchema = new mongoose.Schema({
    userName: {
        required: true,
        type: String,
      },

    password: {
        required: true,
        type: String,
      },
  
      email: {
        required: true,
        unique: true,
        type: String,
      },

      firstname: {
        required: true,
        type: String,
      },

      lastname: {
        required: true,
        type: String,
      },
  
      mobile: {
        required: true,
        type: String,
      },
  
      address: {
        required: true,
        type: String,
      },
  
      dateOfBirth: {
        required: true,
        type: String,
      },
    
});

//Export the model
module.exports = mongoose.model('LabAssistant', labAssistSchema);