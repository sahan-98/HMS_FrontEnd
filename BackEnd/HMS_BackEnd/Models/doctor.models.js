const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctorid: { type: String, required: [true, "User ID is required"] },
  name: { type: String, required: [true, "Username is required"] },
  userName: { type: String, required: [true, "user name is required"] },
  email: { type: String, required: [true, "E-mail is required"] },
  password: { type: String, required: [true, "Password is required"] },
  phone: { type: String, required: [true, "phoneNumber is required"] },
  fee: { type: Number, required: [true, "fee is required"] },
  speciality: { type: String, required: [true, "speciality is required"] },
  address: { type: String, required: [true, "ad is required"] },
  degree: { type: String, required: [true, "degree is required"] },
  salary: { type: String, required: [true, "phoneNumber is required"] },
  sunAvailbleTime: { type: String },
  monAvailbleTime: { type: String },
  tueAvailbleTime: { type: String },
  wensAvailbleTime: { type: String },
  thusAvailbleTime: { type: String },
  friAvailbleTime: { type: String },
  satAvailbleTime: { type: String },
  dateOfJoin: { type: String, required: [true, "Date of join is required"] },
  gender: { type: String, required: [true, "gender is required"] },
  availability: { type: Boolean },
  status: { type: String },
});

module.exports = mongoose.model("Doctor", doctorSchema);
