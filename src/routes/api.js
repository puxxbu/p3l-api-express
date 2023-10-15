import express from "express";

import { authMiddleware } from "../middleware/auth-middleware.js";

import cookieParser from "cookie-parser";
import userController from "../controller/user-controller.js";

const userRouter = new express.Router();

// userRouter.get("/api/users/refreshToken", userController.refreshToken);
// userRouter.get("/api/users/logout", userController.removeToken);

userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", userController.get);
userRouter.put("/api/users/password", userController.changePassword);

export { userRouter };
