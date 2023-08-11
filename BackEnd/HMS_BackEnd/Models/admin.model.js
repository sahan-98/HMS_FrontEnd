// user.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Users
let admin = new Schema({
    
    userName: {
        required:true,
        unique:true,
        type: String
    },

    password: {
        required:true,
        type: String
    },

    email: {
        required:true,
        unique:true,
        type:String
    }

}, {
    collection: 'admin'
});

module.exports = mongoose.model('admin', admin);
