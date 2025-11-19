import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  updateSubCategory,
} from "../controllers/subCategoryController.js";

const subCategoryRouter = Router();

subCategoryRouter.get("/", getAllSubCategories);
subCategoryRouter.post("/", createSubCategory);
subCategoryRouter.put("/:id", updateSubCategory);
subCategoryRouter.delete("/:id", deleteSubCategory);

export default subCategoryRouter;
