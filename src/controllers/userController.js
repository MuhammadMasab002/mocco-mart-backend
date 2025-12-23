import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    // if (!userId) {
    //    throw new Error("User ID is required to generate token");
    // }

    const accessToken = jwt.sign(
      { _id: userId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    const refreshToken = jwt.sign(
      { _id: userId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    const user = await User.findById(userId);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const checkUserExist = await User.findOne({ email });
    if (checkUserExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist!!" });
    }

    // Hash the password before saving
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      role: "user",
    });
    await newUser.save();

    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: userResponse,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      existingUser._id
    );
    // method 1
    // const loggedInUser = await User.findById(existingUser._id).select(
    //   "-password -refreshToken"
    // );
    // method 2
    const userResponse = {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    };

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Login successful!",
        user: userResponse,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token is expired or used" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user?._id
    );

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Access token refreshed",
        user: userResponse,
      });
  } catch (error) {
    console.error("Refresh token error:", error);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Refresh token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Token refresh failed",
      error: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: { refreshToken: 1 },
      },
      {
        new: true,
      }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ success: true, message: "User logged Out", data: {} });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// GET CURRENT USER
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export { registerUser, loginUser, logoutUser, refreshAccessToken, getMe };
