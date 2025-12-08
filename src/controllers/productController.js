import { Product } from "../models/product.models.js";

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      description,
      categoryId,
      subCategoryId,
      stock,
      isActive,
      feature,
      featureExpireAt,
    } = req.body;

    if (
      !name &&
      !price &&
      !image &&
      // !description &&
      !categoryId &&
      !subCategoryId &&
      !stock &&
      !featureExpireAt &&
      !feature
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      categoryId,
      subCategoryId,
      image,
      stock,
      isActive,
      feature,
      featureExpireAt,
    });
    if (!newProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not created" });
    }
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId", "name")
      .populate("subCategoryId", "name")
      .sort({ createdAt: -1 });
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    res.status(200).json({ success: true, products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }
    const singleProduct = await Product.findById(id);
    if (!singleProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      product: singleProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getFeatureProducts = async (req, res) => {
  try {
    const { feature } = req.params;
    // only top 4 feature products
    const featureProducts = await Product.find({ feature: feature }).limit(4);
    if (!featureProducts) {
      return res
        .status(404)
        .json({ success: false, message: "No featured products found" });
    }
    res.status(200).json({ success: true, products: featureProducts });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      description,
      image,
      categoryId,
      subCategoryId,
      stock,
      isActive,
      feature,
      featureExpireAt,
    } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      price,
      description,
      image,
      categoryId,
      subCategoryId,
      stock,
      isActive,
      feature,
      featureExpireAt,
    });
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    await updatedProduct.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      products: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export {
  createProduct,
  getAllProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
  getFeatureProducts,
};
