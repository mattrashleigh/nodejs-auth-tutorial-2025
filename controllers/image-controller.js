"use strict";

const path = require("path");
const fs = require("fs");

const cloudinary = require("../config/cloudinary");
const Image = require("../models/Image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: `File is required`,
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const image = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await image.save();

    // Delete the local image
    fs.unlinkSync(req.file.path);

    if (image) {
      res.status(201).json({
        success: true,
        message: `Uploaded image [${path.basename(req.file.path)}]`,
        image: image,
      });
    } else {
      res.status(400).json({
        success: false,
        message: `Unable to register user`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getAllImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);
    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
    if (images) {
      res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: totalPages,
        totalImages: totalImages,
        limitPerPage: limit,
        data: images,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (image) {
      res.status(200).json({
        success: true,
        message: "Image found",
        data: image,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updateImage = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    // Find image
    const imageId = req.params.id;
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Ensure image is owned by logged in user
    if (req.userInfo.userId !== image.uploadedBy.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete images you uploaded",
      });
    }

    // Delete from cloudinary storage
    await cloudinary.uploader.destroy(image.publicId);

    // Delete from mongodb
    await Image.findByIdAndDelete(imageId);

    res.status(200).json({
      success: true,
      message: "Image deleted",
      data: image,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { uploadImage, getAllImages, getImage, updateImage, deleteImage };
