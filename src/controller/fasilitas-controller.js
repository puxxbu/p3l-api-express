import fasilitasService from "../service/fasilitas-service.js";

const create = async (req, res, next) => {
  try {
    const result = await fasilitasService.create(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getFasilitasById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await fasilitasService.getFasilitasById(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateFasilitas = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await fasilitasService.update(req.body, id);
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
    const result = await fasilitasService.remove(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const result = await fasilitasService.search(req.query);
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
  getFasilitasById,
  updateFasilitas,
  remove,
  search,
};
