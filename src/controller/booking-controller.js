import bookingService from "../service/booking-service.js";

const create = async (req, res, next) => {
  try {
    const result = await tarifService.create(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getTarifById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await tarifService.getTarifById(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateTarif = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await tarifService.update(req.body, id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await tarifService.remove(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const result = await tarifService.search(req.query);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

const searchAvailableKamar = async (req, res, next) => {
  try {
    const result = await bookingService.searchAvailableKamar(req.query);
    res.status(200).json({
      data: result.data,
      ketersediaan: result.ketersediaan,
      jumlahKamar: result.jumlahKamar,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

const createBook = async (req, res, next) => {
  try {
    // const fakeIdCustomer = [1, 5, 6, 7, 9];
    // const monthList = [
    //   "01",
    //   "02",
    //   "03",
    //   "04",
    //   "05",
    //   "06",
    //   "07",
    //   "08",
    //   "09",
    //   "10",
    //   "11",
    //   "12",
    // ];

    // const month = Math.floor(Math.random() * 12);
    // const body = {
    //   booking: {
    //     id_customer: fakeIdCustomer[Math.floor(Math.random() * 5)],
    //     tanggal_booking: `2023-${month}-19`,
    //     tanggal_check_in: `2023-${month}-28 08:00:00`,
    //     tanggal_check_out: `2023-${month}-30 10:00:00`,
    //     tamu_dewasa: 2,
    //     tamu_anak: 8,
    //     jenis_booking: "Personal",
    //     status_booking: "Booked",
    //   },
    //   detail_booking: [
    //     {
    //       id_jenis_kamar: Math.floor(Math.random() * 5),
    //       jumlah: 1,
    //       sub_total: 480000,
    //     },
    //   ],
    // };
    const result = await bookingService.createBook(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await bookingService.updateStatusBooking(req.body, id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await bookingService.cancelBooking(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const searchBooking = async (req, res, next) => {
  try {
    const result = await bookingService.searchBooking(req.query);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

const searchBookingByCheckin = async (req, res, next) => {
  try {
    const result = await bookingService.searchBookingByCheckin(req.query);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

const updateNomorRekening = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await bookingService.updateNomorRekening(req.body, id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateFasilitas = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await bookingService.updateFasilitas(req.body, id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const createInvoice = async (req, res, next) => {
  try {
    const result = await bookingService.createInvoice(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  getTarifById,
  updateTarif,
  remove,
  search,
  searchAvailableKamar,
  createBook,
  updateBookingStatus,
  cancelBooking,
  searchBooking,
  updateNomorRekening,
  searchBookingByCheckin,
  updateFasilitas,
  createInvoice,
};
