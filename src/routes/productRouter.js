import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const productRouter = Router();

// Define product routes here
productRouter.get("/", getAllProducts);
productRouter.get("/:id", singleProduct);

productRouter.post("/", verifyJWT, createProduct);
productRouter.put("/:id", verifyJWT, updateProduct);
productRouter.delete("/:id", verifyJWT, deleteProduct);

export default productRouter;
