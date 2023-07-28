"use strict";
const express = require("express");
const companyRoutes = express.Router();

let Company = require("../Models/labReport.model");

//add event
companyRoutes.post("/add", async (req, res) => {
  try {
    const companyName = req.body.companyName;
    const category = req.body.category;
    const contactMobile = req.body.contactMobile;
    const contactEmail = req.body.contactEmail;

    let newCompany = new Company({
      companyName,
      category,
      contactMobile,
      contactEmail,
    });

    console.log("company is", newCompany);

    await newCompany
      .save()
      .then(async (CompanyData) => {
        return res.status(200).json({ data: CompanyData });
      })
      .catch(async (err) => {
        let exist = await Company.find({ companyName: companyName });
        if (exist) {
          return res
            .status(402)
            .json({ code: "DDUP", warn: "KEY DUPPLICATION" });
        }
        return res.status(502).json({ code: "DERROR", warn: "DATABASE ERROR" });

        console.log("Error is", err);
      });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

companyRoutes.post("/update/:id", async (req, res) => {
  // console.log(req.body);

  try {
    Company.findById(req.params.id)
      .then((responseObj) => {
        responseObj.category = req.body.category;
        responseObj.contactMobile = req.body.contactMobile;
        responseObj.contactEmail = req.body.contactEmail;

        responseObj
          .save()
          .then(() => {
            return res.status(200).json({ success: true });
          })
          .catch((err) => {
            return res
              .status(402)
              .json({ code: "DERROR", warn: "DATABASE ERROR" });
          });
      })
      .catch((err) => res.status(500).json({ warn: err }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

// get events list by a host
companyRoutes.get("/name/:key", async (req, res) => {
  try {
    let key = req.params.key;
    console.log(key);
    let CompanyData = await Company.find({ companyName: key }).sort({
      updatedAt: -1,
    });
    if (!CompanyData) {
      return res.status(402).json({ code: "DERROR", warn: "DATABASE ERROR" });
    } else {
      return res.status(200).json({ success: true, data: CompanyData });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

// get events list by a host
companyRoutes.get("/email/:key", async (req, res) => {
  try {
    let key = req.params.key;
    console.log(key);
    let CompanyData = await Company.find({ contactEmail: key }).sort({
      updatedAt: -1,
    });
    if (!CompanyData) {
      return res.status(402).json({ code: "DERROR", warn: "DATABASE ERROR" });
    } else {
      res.status(200).json({ success: true, data: CompanyData });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

// update rates of an event

// search by category
companyRoutes.route("/category/:key").get(async function (req, res) {
  try {
    let key = req.params.key;
    let CompanyData = await Company.find({
      category: { $regex: key, $options: "i" },
    });
    if (!CompanyData) {
      return res.status(402).json({ code: "DERROR", warn: "DATABASE ERROR" });
    } else {
      res.status(200).json({ success: true, data: CompanyData });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

// search by event name
// companyRoutes.route("/search-name/:key").get(function (req, res) {
//   let key = req.params.key;
//   Company.find(
//     { name: { $regex: key, $options: "i" } },
//     function (err, CompanyData) {
//       if (err) {
//         console.log(err);
//         res.status(400).json("Erro " + err);
//       } else {
//         res.status(200).json({ success: true, data: CompanyData });
//       }
//     }
//   ).sort({ visits: -1 });
// });

// // search by venue
// companyRoutes.route("/search-venue/:key").get(function (req, res) {
//   let key = req.params.key;

//   Company.find(
//     {
//       $or: [
//         { city: { $regex: key, $options: "i" } },
//         { address: { $regex: key, $options: "i" } },
//         { country: { $regex: key, $options: "i" } },
//         { province: { $regex: key, $options: "i" } },
//         { premise: { $regex: key, $options: "i" } },
//       ],
//     },
//     function (err, events) {
//       if (err) {
//         res.send(err);
//       }
//       res.status(200).json({ success: true, data: events });
//     }
//   ).sort({ visits: -1 });
// });

// // search by All

// companyRoutes.route("/search-all/:key").get(function (req, res) {
//   let key = String(req.params.key);

//   if (key == "" || key == undefined) {
//     Company.find(function (err, events) {
//       if (err) {
//         res.send(err);
//       }
//       res.status(200).json({ success: true, data: events });
//     }).sort({ visits: -1 });
//   } else {
//     Company.find(
//       {
//         $or: [
//           { name: { $regex: key, $options: "i" } },
//           { category: { $regex: key, $options: "i" } },
//           { description: { $regex: key, $options: "i" } },
//           { address: { $regex: key, $options: "i" } },
//           { country: { $regex: key, $options: "i" } },
//           { province: { $regex: key, $options: "i" } },
//           { premise: { $regex: key, $options: "i" } },
//           { organizer: { $regex: key, $options: "i" } },
//         ],
//       },
//       function (err, events) {
//         if (err) {
//           res.send(err);
//         }
//         res.status(200).json({ success: true, data: events });
//       }
//     ).sort({ visits: -1 });
//   }

//   console.log("===========key is============");
//   console.log(key);
//   console.log("====================================");
// });

// Company.find({ category: userObj.categories[0] }, function (err, CompanyData) {
//   if (err) {
//     console.log(err);
//     res.status(400).json("Erro " + err);
//   } else {
//     eventsArr.push(CompanyData);
//   }
// });

// Company.find({ category: userObj.categories[2] }, function (err, CompanyData) {
//   if (err) {
//     console.log(err);
//     res.status(400).json("Erro " + err);
//   } else {
//     eventsArr.push(CompanyData);
//   }
// });
// });

// Company.find({ category: key }, function (err, CompanyData) {
//   if (err) {
//     console.log(err);
//     res.status(400).json("Erro " + err);
//   } else {
//     res.status(200).json({ success: true, data: CompanyData });
//   }
// });
// });

// get events by id
companyRoutes.route("/:id").get(async function (req, res) {
  try {
    let id = req.params.id;

    let company = await Company.findById(id);
    if (!company) {
      // console.log("err");
      return res
        .status(402)
        .json({ code: "DEMPTY", warn: "DATABASE SCHEMA IS EMPTY" });
    } else {
      return res.status(200).json({ success: true, data: company });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});
//get all
companyRoutes.get("/", async (req, res) => {
  try {
    let companies = await Company.find().sort({ createdAt: -1 });
    if (!companies) {
      return res
        .status(402)
        .json({ code: "DEMPTY", warn: "DATABASE SCHEMA IS EMPTY" });
    } else {
      res.status(200).json({ success: true, data: companies });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = companyRoutes;
