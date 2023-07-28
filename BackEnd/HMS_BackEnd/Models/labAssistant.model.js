const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var labAssistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    labReport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LabsReports",
        required: true,
        index: true,
      },
    
});

//Export the model
module.exports = mongoose.model('LabAssistants', labAssistSchema);