import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const localFilePath = req.file.path;

    const uploadResult = await uploadOnCloudinary(localFilePath);

    if (!uploadResult) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary upload failed",
      });
    }

    return res.status(200).json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { uploadImageController };
