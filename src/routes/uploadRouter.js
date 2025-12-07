import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadImageController } from "../controllers/uploadController.js";

const uploadRouter = express.Router();

uploadRouter.post(
  "/",
  upload.single("image"),
  uploadImageController
);

export default uploadRouter;
