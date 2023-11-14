import jenisKamarService from "../service/jenisKamar-service.js";

const create = async (req, res, next) => {
  try {
    const result = await jenisKamarService.create(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getJenisKamarById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await jenisKamarService.getJenisKamarById(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateJenisKamar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await jenisKamarService.update(req.body, id);
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
    const result = await jenisKamarService.remove(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const result = await jenisKamarService.search(req.query);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

const showAvailability = async (req, res, next) => {
  try {
    const result = await jenisKamarService.showAvailability(req.query);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  getJenisKamarById,
  updateJenisKamar,
  remove,
  search,
  showAvailability,
};
