import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  updateSubCategory,
} from "../controllers/subCategoryController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const subCategoryRouter = Router();

subCategoryRouter.get("/", getAllSubCategories);

subCategoryRouter.post("/", verifyJWT, createSubCategory);
subCategoryRouter.put("/:id", verifyJWT, updateSubCategory);
subCategoryRouter.delete("/:id", verifyJWT, deleteSubCategory);

export default subCategoryRouter;
