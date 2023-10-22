import seasonService from "../service/season-service.js";

const create = async (req, res, next) => {
  try {
    const result = await seasonService.create(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getSeasonById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await seasonService.getSeasonById(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateSeason = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await seasonService.update(req.body, id);
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
    const result = await seasonService.remove(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const result = await seasonService.search(req.query);
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
  getSeasonById,
  updateSeason,
  remove,
  search,
};
