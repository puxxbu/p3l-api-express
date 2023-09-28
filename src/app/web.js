import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public-api.js";
import { userRouter } from "../routes/api.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "../config/corsOptions.js";
import credentials from "../middleware/credentials.js";

export const web = express();
web.use(express.json());

//express cors
web.use(credentials);
web.use(cors(corsOptions));
web.use(express.urlencoded({ extended: true }));
web.use(cookieParser());

web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);
