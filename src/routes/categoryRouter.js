import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);

categoryRouter.post("/", verifyJWT, createCategory);
categoryRouter.put("/:id", verifyJWT, updateCategory);
categoryRouter.delete("/:id", verifyJWT, deleteCategory);

export default categoryRouter;
