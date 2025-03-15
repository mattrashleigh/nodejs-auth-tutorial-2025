"use strict";

const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (filePath) => {
  try {
    const res = await cloudinary.uploader.upload(filePath);
    return {
      url: res.secure_url,
      publicId: res.public_id,
    };
  } catch (error) {
    console.log("Error uploading to cloudinary", error);
    throw new Error("Error uploading to cloudinary");
  }
};

module.exports = {
  uploadToCloudinary,
};
