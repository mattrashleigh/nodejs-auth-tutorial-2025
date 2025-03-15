"use strict";

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const {
  uploadImage,
  getAllImages,
  getImage,
  updateImage,
  deleteImage,
} = require("../controllers/image-controller");

// all routes related to images
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImage
);
router.get("/get", authMiddleware, getAllImages);
router.get("/get/:id", authMiddleware, getImage);
router.put("/update/:id", authMiddleware, adminMiddleware, updateImage);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteImage);

module.exports = router;
