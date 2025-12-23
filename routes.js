import express from "express";

import wishlistRouter from "./src/routes/wishlistRouter";
import categoryRouter from "./src/routes/categoryRouter";
import productRouter from "./src/routes/productRouter";
import uploadRouter from "./src/routes/uploadRouter";
import userRouter from "./src/routes/userRouter";

const router = express.Router();

router.use("/auth/user", userRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/wishlist", wishlistRouter);

router.use("/upload-image", uploadRouter);

export default router;
