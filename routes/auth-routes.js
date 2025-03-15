"use strict";

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware");
const { registerUser, loginUser, changePassword } = require("../controllers/auth-controller");

// all routes related to authentication and authorization
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/changePassword", authMiddleware, changePassword);

module.exports = router;
