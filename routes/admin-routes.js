"use strict";

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
  const { username, userId, role } = req.userInfo;
  res.json({
    message: `welcome admin home`,
    user: {
      _id: userId,
      username: username,
      role: role,
    },
  });
});

module.exports = router;
