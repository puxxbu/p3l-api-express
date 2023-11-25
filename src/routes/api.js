import express from "express";

import { authMiddleware } from "../middleware/auth-middleware.js";

import cookieParser from "cookie-parser";
import laporanController from "../controller/laporan-controller.js";
import userController from "../controller/user-controller.js";
import customerController from "../controller/customer-controller.js";
import kamarController from "../controller/kamar-controller.js";
import seasonController from "../controller/season-controller.js";
import jenisKamarController from "../controller/jenisKamar-controller.js";
import fasilitasController from "../controller/fasilitas-controller.js";
import tarifController from "../controller/tarif-controller.js";
import bookingController from "../controller/booking-controller.js";
import { publicRouter } from "./public-api.js";

const userRouter = new express.Router();

// userRouter.get("/api/users/refreshToken", userController.refreshToken);
// userRouter.get("/api/users/logout", userController.removeToken);

userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", userController.get);
userRouter.get("/api/pegawai/current", userController.getPegawai);
userRouter.put("/api/users/password", userController.changePassword);

//Customer API

userRouter.post("/api/customer", customerController.create);
userRouter.get("/api/customer/group", customerController.getGroupCustomer);
userRouter.get("/api/customer/current", customerController.getCurrentProfile);
userRouter.get("/api/customer/:id", customerController.getProfileById);
userRouter.put("/api/customer", customerController.updateProfile);
userRouter.get("/api/customer", customerController.search);
userRouter.get(
  "/api/customer/:id/booking-history",
  customerController.getBookHistory
);
userRouter.get("/api/customer/booking/:id", customerController.getBookingById);

//Kamar API
userRouter.post("/api/kamar", kamarController.create);
userRouter.get("/api/kamar/:id", kamarController.getKamarById);
userRouter.put("/api/kamar/:id", kamarController.updateKamar);
userRouter.delete("/api/kamar/:id", kamarController.remove);
userRouter.get("/api/kamar", kamarController.search);

//JenisKamar API
userRouter.post("/api/jenis-kamar", jenisKamarController.create);
publicRouter.get(
  "/api/jenis-kamar/status",
  jenisKamarController.showAvailability
);
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

//Fasilitas API
userRouter.post("/api/fasilitas", fasilitasController.create);
userRouter.get("/api/fasilitas/:id", fasilitasController.getFasilitasById);
userRouter.put("/api/fasilitas/:id", fasilitasController.updateFasilitas);
userRouter.delete("/api/fasilitas/:id", fasilitasController.remove);
userRouter.get("/api/fasilitas", fasilitasController.search);

userRouter.post("/api/tarif", tarifController.create);
userRouter.get("/api/tarif/:id", tarifController.getTarifById);
userRouter.put("/api/tarif/:id", tarifController.updateTarif);
userRouter.delete("/api/tarif/:id", tarifController.remove);
userRouter.get("/api/tarif", tarifController.search);

//Booking API

userRouter.post("/api/booking", bookingController.createBook);
userRouter.post("/api/invoice", bookingController.createInvoice);
userRouter.get("/api/booking/search", bookingController.searchBooking);
userRouter.put("/api/booking/cancel/:id", bookingController.cancelBooking);
userRouter.put(
  "/api/booking/change-status/:id",
  bookingController.updateBookingStatus
);
userRouter.put(
  "/api/booking/no-rekening/:id",
  bookingController.updateNomorRekening
);
userRouter.get(
  "/api/booking/check-in/search",
  bookingController.searchBookingByCheckin
);

userRouter.put("/api/booking/fasilitas/:id", bookingController.updateFasilitas);

// Laporan
userRouter.get(
  "/api/laporan/jumlah-tamu",
  laporanController.getLaporanJumlahTamu
);
userRouter.get(
  "/api/laporan/pendapatan-bulanan",
  laporanController.getLaporanPendapatanBulanan
);

export { userRouter };
