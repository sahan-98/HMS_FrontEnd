// server.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080;
const cors = require("cors");
const session = require("express-session");
const fileupload = require("express-fileupload");

const mongoose = require("mongoose");

const config = require("./configure.js");

const paitentRoute = require("./Route/paitent.router.js");
const labReportRoute = require("./Route/labReports.router.js");
const doctorRoute = require("./Route/doctor.route.js");
const labAssistantRoute = require("./Route/labAssistants.router.js");
const bedRoute = require("./Route/bed.router.js");

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.log("Can not connect to the database" + err);
    }
  );

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

app.use("/report", labReportRoute);
app.use("/paitent", paitentRoute);
app.use("/doctor", doctorRoute);
app.use("/labAssistant", labAssistantRoute);
app.use("/bed", bedRoute);

app.listen(PORT, function () {
  console.log("Server is running on Port:", PORT);
});
