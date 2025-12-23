import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  getMe,
} from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", verifyJWT, logoutUser);
userRouter.post("/refresh-token", refreshAccessToken);

userRouter.get("/me", verifyJWT, getMe);

export default userRouter;
