import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import { transport } from "../utils/mail-transporter.js";
import jwt from "jsonwebtoken";
const register = async (request) => {
  const akun = validate(registerUserValidation, request);

  const count = await prismaClient.akun.count();

  if (akun.id_role === 2001) {
    akun.id_akun = 20000 + count + 1;
  } else {
    akun.id_akun = 10000 + count + 1;
  }

  const countUser = await prismaClient.akun.count({
    where: {
      username: akun.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username already exists");
  }

  akun.password = await bcrypt.hash(akun.password, 10);

  return prismaClient.akun.create({
    data: akun,
    select: {
      username: true,
      id_role: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  console.log(loginRequest.username);

  const user = await prismaClient.akun.findUnique({
    where: {
      username: loginRequest.username,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    console.log("password error");
    throw new ResponseError(401, "Username or password wrong");
  }

  const accessToken = jwt.sign(
    { username: loginRequest.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "6d" }
  );
  const refreshToken = jwt.sign(
    { username: loginRequest.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const updatedUser = await prismaClient.akun.update({
    data: {
      token: accessToken,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
      role: true,
    },
  });

  return updatedUser;
};

const get = async (username) => {
  const user = await prismaClient.akun.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      id_role: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return user;
};

export default {
  register,
  login,
  get,
};
