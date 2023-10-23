import express from "express";

import { authMiddleware } from "../middleware/auth-middleware.js";

import cookieParser from "cookie-parser";
import userController from "../controller/user-controller.js";
import customerController from "../controller/customer-controller.js";
import kamarController from "../controller/kamar-controller.js";
import seasonController from "../controller/season-controller.js";
import jenisKamarController from "../controller/jenisKamar-controller.js";

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

//JenisKamar API
userRouter.post("/api/jenis-kamar", jenisKamarController.create);
userRouter.get("/api/jenis-kamar/:id", jenisKamarController.getJenisKamarById);
userRouter.put("/api/jenis-kamar/:id", jenisKamarController.updateJenisKamar);
userRouter.delete("/api/jenis-kamar/:id", jenisKamarController.remove);
userRouter.get("/api/jenis-kamar", jenisKamarController.search);

//Season API
userRouter.post("/api/season", seasonController.create);
userRouter.get("/api/season/:id", seasonController.getSeasonById);
userRouter.put("/api/season/:id", seasonController.updateSeason);
userRouter.delete("/api/season/:id", seasonController.remove);
userRouter.get("/api/season", seasonController.search);

export { userRouter };
