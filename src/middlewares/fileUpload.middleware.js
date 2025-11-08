// middlewares/fileupload.middleware.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Middleware to upload file directly to Cloudinary
export const uploadToCloudinary = async (req, res, next) => {
  try {
    // Check if file is attached
    if (!req.files || !req.files.imageUrl) {
      return res.status(400).json({ message: "No image file uploaded." });
    }

    const file = req.files.imageUrl;
    console.log("Received file:", file.name);

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'uploads',
      resource_type: 'auto',
    });

    console.log("Uploaded to Cloudinary:", uploadResponse.secure_url);

    // Attach Cloudinary URL to req for next middleware/controller
    req.imageUrl = uploadResponse.secure_url;

    next(); // go to next controller (like addProduct)
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return res.status(500).json({ message: "Image upload failed", error: err.message });
  }
};