import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        product: String,
        variant: String,
        quantity: Number,
        price: Number,
      },
    ],

    totalAmount: Number,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },

    address: Object,
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
