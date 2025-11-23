import express from "express";
import cors from "cors";
import userRouter from "./src/routes/userRouter.js";
import cookieParser from "cookie-parser";
import categoryRouter from "./src/routes/categoryRouter.js";
import subCategoryRouter from "./src/routes/subCategoryRouter.js";
import productRouter from "./src/routes/productRouter.js";
import wishlistRouter from "./src/routes/wishlistRouter.js";

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Welcome to Moco Mart API");
});
app.use("/api/auth/user", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/sub-categories", subCategoryRouter);
app.use("/api/products", productRouter);
app.use("/api/wishlist", wishlistRouter)

export default app;
