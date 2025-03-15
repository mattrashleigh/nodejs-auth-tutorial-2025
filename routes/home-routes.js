"use strict";

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");

router.get("/welcome", authMiddleware, (req, res) => {
  const { username, userId, role } = req.userInfo;
  res.json({
    message: `welcome home`,
    user: {
      _id: userId,
      username: username,
      role: role,
    },
  });
});

module.exports = router;
