import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";

const productRouter = Router();

// Define product routes here
productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", singleProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
