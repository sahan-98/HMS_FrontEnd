const express = require("express");
const PaitentRoutes = express.Router();
const bcrypt = require("bcrypt");
// const session = require("express-session");
// const auth = require("./Auth");
// const config = require("../configure.js");
// var nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// var Mailgen = require("mailgen");

let Paitent = require("../Models/paitents.model");
let ErrorLog = require("../Models/errorlog.model");

// add User

PaitentRoutes.post("/add", async (req, res) => {
  const { mobile, userName, password, email, address, dateOfBirth, gender, firstname, lastname, conpass } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  if (
    mobile == "" ||
    userName == "" ||
    password == "" ||
    email == "" ||
    address == "" ||
    dateOfBirth == "" ||
    gender == "" ||
    firstname == "" ||
    lastname == ""
  )
    return res.status(202).json({ warn: "Important field(s) are empty" });

  if (password !== conpass)
    return res.status(202).json({ warn: "Passwords Do not Match!" });

  const exist = await Paitent.findOne({ email: email });
  if (exist) {
    return res
      .status(202)
      .json({ warn: "An account is Exist with this email" });
  }

  const exist2 = await Paitent.findOne({ mobile: mobile });
  if (exist2) {
    return res
      .status(202)
      .json({ warn: "This mobile number is not available.Try another one" });
  }

  // upload

  const newPaitent = new Paitent({
    mobile,
    userName,
    password: passwordHash,
    email,
    address, 
    dateOfBirth, 
    gender,
    firstname,
    lastname,
    status: "New",
  });

  await newPaitent
    .save()
    .then(async (respond) => {
      res.status(200).json({ message: "Successfull" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error!" });
      console.log("error mail:", err);
    });
});

//token validate

// PaitentRoutes.post("/validate", async (req, res) => {
//   // console.log("Secret is :" , config.JWT_SECRET);

//   const { mobile, password } = req.body;

//   try {
//     const Login = await Paitent.findOne({ mobile: mobile });

//     if (mobile == "" || password == "")
//       return res
//         .status(200)
//         .json({ message: "Mobile or Password field(s) are empty" });

//     if (!Login)
//       return res.status(200).json({ message: "Invalid login details" });

//     const validate = await bcrypt.compare(password, Login.password);

//     // title: {
//     //   type: String,
//     //   required: true,
//     // },

//     // //
//     // type: {
//     //   type: String,
//     //   required: true,
//     // },
//     // User: {
//     //   type: String,
//     // },
//     // description: {
//     //   type: String,
//     //   required: true,
//     // },
//     // endpoint: {
//     //   type: String,
//     //   required: true,
//     // },
//     // status: {
//     //   type: Number,
//     // },

//     if (!validate) {
//       const newErrorLog = new ErrorLog({
//         mobile: mobile,
//         title: "Security Alert",
//         type: "invalidLoginAttempt",
//         description: "An suspisious Login Attemp detected!",
//         status: 0,
//         endpoint: "Paitent/validate",
//         ip: req.connection.remoteAddress,
//       });

//       await newErrorLog.save();

//       return res.status(202).json({ message: "Password is invalid!" });
//     }

//     //jwt secret
//     const token = jwt.sign({ id: Login._id }, config.JWT_SECRET, {
//       expiresIn: 3000,
//     });
//     res.status(200).json({
//       token,
//       Paitent: {
//         id: Login._id,
//         mobile: Login.mobile,
//         email: Login.email,
//         firstname: Login.firstname,
//         lastname: Login.lastname,
//         img: Login.img,
//       },
//     });
//   } catch (err) {
//     console.log("validation error ", err);
//     return res.status(400).json({ message: "Validation Error" });
//   }
// });

// // Paitent Session Validation by token
// PaitentRoutes.get("/session-validate", async (req, res) => {
//   try {
//     const token = req.header("token");

//     console.log("validation is :", token);
//     if (!token) return res.json(false);

//     const validate = jwt.verify(token, config.JWT_SECRET);
//     if (!validate) return res.json(false);

//     const Login = await Paitent.findById(validate.id);
//     if (!Login) return res.json(false);

//     return res.json(true);
//   } catch (error) {
//     res.status(400).json({ message: "Validation Error" });
//     console.log("Error is ", error);
//   }
// });

// update Paitent
PaitentRoutes.post("/update/:id", async (req, res) => {
  console.log(req.body);

  try {
    Paitent.findById(req.params.id)
      .then((paitentObj) => {
        paitentObj.firstname = req.body.firstname;
        paitentObj.lastname = req.body.lastname;
        paitentObj.email = req.body.email;

        paitentObj
          .save()
          .then(() => {
            return res.status(200).json("Updated");
          })
          .catch((err) => res.status(400).json({ message: err }));
      })
      .catch((err) => res.status(400).json({ message: err }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

PaitentRoutes.route("/:id").get(async function (req, res) {
  try {
    let id = req.params.id;

    let paitent = await Paitent.findById(id);
    if (!paitent) {
      console.log("err");
      return res.status(400).json({ message: err });
    } else {
      // Return the organizer and associated events
      return res.status(200).json({ success: true, data: paitent });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

PaitentRoutes.get("/", async (req, res) => {
  try {
    let paitents = await Paitent.find().sort({ createdAt: -1 });
    if (!paitents) {
      console.log("err");
      return res.status(400).json({ message: "Details not available" });
    } else {
      res.status(200).json({ success: true, data: paitents });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

//update product by id

module.exports = PaitentRoutes;
