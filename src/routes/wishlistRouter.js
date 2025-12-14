import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const wishlistRouter = Router();

// Define wishlist routes here
wishlistRouter.get("/", verifyJWT, getWishlist);
wishlistRouter.post("/:productId", verifyJWT, addToWishlist);
wishlistRouter.delete("/:productId", verifyJWT, removeFromWishlist);

export default wishlistRouter;
