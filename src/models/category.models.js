import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Virtual Populate
categorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "categoryId",
});

// Include virtuals in JSON response
categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });

export const Category = mongoose.model("Category", categorySchema);
