import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(localFilePath, {
        resource_type: "auto",
      })
      .catch((error) => {
        console.error("Cloudinary Upload Error:", error);
        return null;
      });
    // console.log(uploadResult);

    fs.unlinkSync(localFilePath);
    return uploadResult;
  } catch (error) {
    console.error("Cloudinary Upload Exception:", error);
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
