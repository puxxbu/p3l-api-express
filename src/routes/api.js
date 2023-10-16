import express from "express";

import { authMiddleware } from "../middleware/auth-middleware.js";

import cookieParser from "cookie-parser";
import userController from "../controller/user-controller.js";
import customerController from "../controller/customer-controller.js";
import kamarController from "../controller/kamar-controller.js";

const userRouter = new express.Router();

// userRouter.get("/api/users/refreshToken", userController.refreshToken);
// userRouter.get("/api/users/logout", userController.removeToken);

userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", userController.get);
userRouter.put("/api/users/password", userController.changePassword);

//Customer API

userRouter.post("/api/customer", customerController.create);
userRouter.get("/api/customer/:id", customerController.getProfileById);
userRouter.put("/api/customer", customerController.updateProfile);

//Kamar API
userRouter.post("/api/kamar", kamarController.create);
userRouter.get("/api/kamar/:id", kamarController.getKamarById);
userRouter.put("/api/kamar/:id", kamarController.updateKamar);
userRouter.delete("/api/kamar/:id", kamarController.remove);
userRouter.get("/api/kamar", kamarController.search);

export { userRouter };
