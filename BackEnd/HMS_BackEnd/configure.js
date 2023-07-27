// DB.js
require("dotenv").config({ path: __dirname + "/.env" });

const MONGO_DB_PASSWORD = process.env["MONGO_DB_PASSWORD"];

module.exports = {
  DB: `mongodb+srv://hospital_MS:${MONGO_DB_PASSWORD}@hospitalms.zw6pwlv.mongodb.net/?retryWrites=true&w=majority`,

  JWT_SECRET: "F9qy&s)?4=33s%$2h#F~ggg",
};
