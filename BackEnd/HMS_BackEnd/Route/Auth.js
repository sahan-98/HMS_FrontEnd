const jwt = require("jsonwebtoken");
const config = require("../configure.js");

//validate authentication

const auth = (req, res, location) => {
  try {
    const token = req.header("token");
    console.log("Token is in auth : ", token);

    if (!token) {
      console.log(
        `Token not found from request IP ${req.connection.remoteAddress}`
      );

      return res.status(401).json({ message: "Access Denied !" });
    }

    const validate = jwt.verify(token, config.JWT_SECRET);

    if (!validate)
      res
        .status(401)
        .json({ message: "Faild Token Verification. Access Denied!" });

    res.Login = validate.id;

    location();
  } catch (err) {
    res.status(500).json({ erro: err });
  }
};
module.exports = auth;
