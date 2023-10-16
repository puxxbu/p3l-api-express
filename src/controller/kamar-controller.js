import kamarService from "../service/kamar-service.js";

const create = async (req, res, next) => {
  try {
    const result = await kamarService.create(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getKamarById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await kamarService.getKamarById(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateKamar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await kamarService.update(req.body, id);
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
    const result = await kamarService.remove(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const result = await kamarService.search(req.query);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  getKamarById,
  updateKamar,
  remove,
  search,
};
