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
      enum: ["FLASH_SALES", "BEST_SELLERS", "NEW_ARRIVALS", "NONE"],
      default: "NONE",
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
    // discount: {
    //   type: Number,
    //   default: 10,
    // },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
