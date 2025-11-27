import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    // This will throw an error if token is expired or invalid
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Access Token. User not found.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    // Handle JWT expiration or invalid token - MUST return 401
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid access token.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired.",
      });
    }

    // Any other error
    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
      error: error.message,
    });
  }
};
