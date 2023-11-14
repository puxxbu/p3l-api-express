import express from "express";
import userController from "../controller/user-controller.js";
import multer from "multer";
import bookingController from "../controller/booking-controller.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.message = "LIMIT_FILE_TYPES";
    cb(error, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const publicRouter = express.Router();
publicRouter.get("/api/", (req, res) => {
  res.send("Hello World!");
});
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);

publicRouter.post("/api/upload", upload.single("file"), userController.upload);
publicRouter.post("/api/notifyEmail", userController.sendEmail);
publicRouter.get("/api/booking/kamar", bookingController.searchAvailableKamar);

export { publicRouter };
