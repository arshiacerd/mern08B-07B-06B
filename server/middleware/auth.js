const User = require("../models/user");
var cookieParser = require("cookie-parser");
const express = require("express");

const app = express();

app.use(cookieParser());
var jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: "Invalid token" });
    }
    var { _id } = jwt.verify(token, "mern@jwt!");
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = authUser;
