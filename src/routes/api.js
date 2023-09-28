import express from "express";

import { authMiddleware } from "../middleware/auth-middleware.js";

import cookieParser from "cookie-parser";

const userRouter = new express.Router();

// userRouter.get("/api/users/refreshToken", userController.refreshToken);
// userRouter.get("/api/users/logout", userController.removeToken);

userRouter.use(authMiddleware);

export { userRouter };
