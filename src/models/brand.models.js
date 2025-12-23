import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema(
  {
    name: String,
    slug: String,
    isActive: Boolean,
  },
  { timestamps: true }
);

export const Brand = mongoose.model("Brand", brandSchema);
