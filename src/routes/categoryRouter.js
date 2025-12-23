import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
} from "../controllers/categoryController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);

categoryRouter.get("/:slug", getCategoryBySlug);

categoryRouter.post("/", verifyJWT, verifyAdmin, createCategory);
categoryRouter.patch("/:id", verifyJWT, verifyAdmin, updateCategory);
categoryRouter.delete("/:id", verifyJWT, verifyAdmin, deleteCategory);

export default categoryRouter;
