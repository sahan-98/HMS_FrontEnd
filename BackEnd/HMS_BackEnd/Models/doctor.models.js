const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    doctorid: { type: String, required: [true, 'User ID is required'] },  
    name: { type: String, required: [true, 'Username is required'] },
    userName: { type: String, required: [true, 'user name is required'] },
    email: { type: String, required: [true, 'E-mail is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    phone: { type: String, required: [true, 'phoneNumber is required'] },
    fee: { type: String, required: [true, 'fee is required'] },
    speciality: { type: String, required: [true, 'speciality is required'] },
    address: { type: String, required: [true, 'ad is required'] },
    degree: { type: String, required: [true, 'degree is required'] },
    salary: { type: String, required: [true, 'phoneNumber is required'] },
    availbleTime: { type: String, required: [true, 'availableTime is required'] },
    dateOfJoin: { type: String, required: [true, 'Date of join is required'] },
    gender: { type: String, required: [true, 'gender is required'] },
    availability: { type: Boolean }
})

module.exports =  mongoose.model('Doctor', doctorSchema);