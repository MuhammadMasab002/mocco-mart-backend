import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rating: Number,
    comment: String,
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
