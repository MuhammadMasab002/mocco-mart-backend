import mongoose, { Schema } from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    variant: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);
