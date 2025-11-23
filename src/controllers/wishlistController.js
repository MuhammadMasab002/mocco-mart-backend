import { Product } from "../models/product.models.js";
import { User } from "../models/user.models.js";

const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("wishlist");
    return res.status(200).json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }

    const user = await User.findById(userId);

    // If product already exists in wishlist
    if (user.wishlist.includes(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Added to wishlist successfully",
      wishlist: user.wishlist,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    const user = await User.findById(userId);
    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== productId
    );
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Removed from wishlist",
      removedProduct: product,
      // wishlist: user.wishlist, // user wishlist after deleting item from list
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export { getWishlist, addToWishlist, removeFromWishlist };
