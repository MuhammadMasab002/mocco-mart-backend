import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    feature: {
      type: String,
      enum: ["Flash Sales", "Best Sellers", "New Arrivals", "None"],
      default: "None",
    },
    featureExpireAt: {
      type: Date,
      default: null,
    },
    // stockStatus: {
    //   type: String,
    //   enum: ["in stock", "out of stock", "preorder"],
    //   default: "in stock",
    // },
    image: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
