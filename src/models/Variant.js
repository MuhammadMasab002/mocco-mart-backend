import mongoose, { Schema } from "mongoose";

const variantSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    attributes: {
      size: String,
      color: String,
      storage: String,
    },

    price: {
      type: Number,
      required: true,
    },

    sku: {
      type: String,
      unique: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Variant", variantSchema);
