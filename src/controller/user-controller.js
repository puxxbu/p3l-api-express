import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await userService.get(username);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const username = req.user.username;
    const request = req.body;
    request.username = username;

    const result = await userService.update(request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.username);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

const upload = async (req, res, next) => {
  if (!req.file) {
    res.status(400).json({
      error: "Please upload a file",
    });
  } else {
    res.status(200).json({
      data: req.file.filename,
    });
  }
};

const sendEmail = async (req, res, next) => {
  try {
    const info = await userService.notifyEmail(req.body.text);
    console.log("Email terkirim: " + JSON.stringify(req.body));

    res.status(200).json({
      data: info,
    });
  } catch (e) {
    next(e);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const response = await userService.handleRefreshToken(req.cookies);
    console.log(response);

    res.status(200).json({
      data: response,
    });
  } catch (e) {
    next(e);
  }
};

const removeToken = async (req, res, next) => {
  try {
    const response = await userService.removeToken(req.cookies);
    console.log(response);

    res.clearCookie("jwt", { httpOnly: true });
    res.clearCookie("jwtRefresh", { httpOnly: true });

    if (!response) {
      res.status(200).json({
        data: response,
      });
    }

    res.status(200).json({
      data: "Logout Success",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  get,
  update,
  logout,
  upload,
  sendEmail,
  refreshToken,
  removeToken,
};
