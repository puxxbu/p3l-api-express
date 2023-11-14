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

const search = async (req, res, next) => {
  try {
    const result = await customerService.search(req.query);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

const getCurrentProfile = async (req, res, next) => {
  try {
    const username = req.user.username;

    const result = await customerService.getCurrentProfile(username);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getBookHistory = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await customerService.getUserBookingHistory(req.query, id);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await customerService.getBookingById(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getGroupCustomer = async (req, res, next) => {
  try {
    const result = await customerService.searchGroup(req.query);
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
  getProfileById,
  updateProfile,
  search,
  getCurrentProfile,
  getBookHistory,
  getBookingById,
  getGroupCustomer,
};
