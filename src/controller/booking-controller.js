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
    const result = await bookingService.createBook(req.body);
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
};
