import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config();

const connectDB = async () => {
  try {
    // Connect to MongoDB and connect to the database
    await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`);
    console.log("MongoDB connected successfully!!");
  } catch (error) {
    console.log("MongoDB connection failed::->", error);
    throw error;
  }
};

export default connectDB;
