import { SubCategory } from "../models/subCategory.models.js";

const createSubCategory = async (req, res) => {
  const { name, categoryId, description, isActive } = req.body;
  try {
    if (!name || !categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "Name and Category ID are required" });
    }
    // Prevent duplicate category names
    const existingCategory = await SubCategory.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Sub Category with this name already exists",
      });
    }

    const newCategory = new SubCategory({
      name,
      description,
      categoryId,
      isActive: isActive ?? true,
    });
    if (!newCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create sub-category" });
    }
    await newCategory.save();
    return res.status(201).json({
      success: true,
      message: "Sub Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getAllSubCategories = async (req, res) => {
  try {
    const categories = await SubCategory.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive, categoryId } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Sub Category ID is required" });
    }

    if (!name || !categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "Name and Category ID are required" });
    }
    const category = await SubCategory.findByIdAndUpdate(
      id,
      { name, description, isActive, categoryId },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Sub Category not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Sub Category updated successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Sub Category ID is required" });
    }
    const category = await SubCategory.findByIdAndDelete(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Sub Category not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Sub Category deleted successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export {
  createSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
};
