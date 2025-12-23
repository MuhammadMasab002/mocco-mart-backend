import { Category } from "../models/category.models.js";
import { Product } from "../models/product.models.js";

const slugify = (str) =>
  str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/**
 * POST /api/categories (ADMIN)
 */
const createCategory = async (req, res) => {
  try {
    const { name, parent = null, isActive } = req.body;

    if (!name?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });
    }

    const slug = slugify(name);

    const existingBySlug = await Category.findOne({ slug });
    if (existingBySlug) {
      return res.status(409).json({
        success: false,
        message: "Category with this slug already exists",
      });
    }

    let parentRef = null;
    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid parent category" });
      }
      parentRef = parentCategory._id;
    }

    const newCategory = new Category({
      name: name.trim(),
      slug,
      parent: parentRef,
      isActive: isActive ?? true,
    });

    await newCategory.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

/**
 * GET /api/categories
 * GET /api/categories?parent=<id>
 */
const getAllCategories = async (req, res) => {
  try {
    const { parent, isActive } = req.query;

    const filter = {};
    if (typeof isActive !== "undefined") filter.isActive = isActive === "true";
    if (parent === "null") filter.parent = null;
    else if (parent) filter.parent = parent;

    const categories = await Category.find(filter).sort({ createdAt: -1 });

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

/**
 * GET /api/categories/:slug
 */
const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Category slug is required" });
    }

    const category = await Category.findOne({ slug: slug.toLowerCase() });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

/**
 * PATCH /api/categories/:id (ADMIN)
 */

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parent, isActive } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    if (typeof name !== "undefined" && name?.trim()) {
      const nextSlug = slugify(name);
      const conflict = await Category.findOne({
        slug: nextSlug,
        _id: { $ne: id },
      });
      if (conflict) {
        return res.status(409).json({
          success: false,
          message: "Another category with this slug already exists",
        });
      }
      category.name = name.trim();
      category.slug = nextSlug;
    }

    if (typeof isActive !== "undefined") category.isActive = !!isActive;

    if (typeof parent !== "undefined") {
      if (parent === null) category.parent = null;
      else {
        const parentCategory = await Category.findById(parent);
        if (!parentCategory) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid parent category" });
        }
        category.parent = parentCategory._id;
      }
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

/**
 * DELETE /api/categories/:id (ADMIN)
 * Soft delete recommended in production
 */
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    await Category.updateMany({ parent: id }, { $set: { parent: null } });
    await Product.deleteMany({ category: id });

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
