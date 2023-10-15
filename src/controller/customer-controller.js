import customerService from "../service/customer-service.js";

const create = async (req, res, next) => {
  try {
    const result = await customerService.create(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getProfileById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await customerService.getProfileById(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const result = await customerService.updateProfile(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  getProfileById,
  updateProfile,
};
