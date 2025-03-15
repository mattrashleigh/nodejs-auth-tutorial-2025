"use strict";

require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Need to login",
    });
  }

  // decode token
  try {
    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userInfo = tokenInfo;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

module.exports = authMiddleware;
