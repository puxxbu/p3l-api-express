import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
  dataCustomerValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import { transport } from "../utils/mail-transporter.js";
import jwt from "jsonwebtoken";
const register = async (request) => {
  const akun = validate(registerUserValidation, request.akun);
  const count = await prismaClient.akun.count();

  const countUser = await prismaClient.akun.count({
    where: {
      username: akun.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username already exists");
  }

  akun.password = await bcrypt.hash(akun.password, 10);

  if (akun.id_role === 2001) {
    const dataCustomer = validate(dataCustomerValidation, request.customer);
    dataCustomer.tanggal_dibuat = new Date();

    const countCustomer = await prismaClient.customer.findFirst({
      orderBy: {
        id_customer: "desc", // Mengurutkan berdasarkan id_customer secara menurun (descending)
      },
      take: 1, // Mengambil hanya 1 entitas dengan id_customer tertinggi
    });

    const id_akun = 20000 + count + 1;
    akun.id_akun = id_akun;
    dataCustomer.tanggal_dibuat = new Date();
    dataCustomer.id_akun = id_akun;
    dataCustomer.id_customer = countCustomer.id_customer + 1;

    return prismaClient.$transaction([
      prismaClient.akun.create({
        data: akun,
        select: {
          username: true,
          id_role: true,
        },
      }),
      prismaClient.customer.create({
        data: dataCustomer,
        select: {
          nama: true,
          jenis_customer: true,
        },
      }),
    ]);
  } else {
    akun.id_akun = 10000 + count + 1;
  }

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
    { expiresIn: "120d" }
  );

  //isToken expired
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err && err.name === "TokenExpiredError") {
        console.log(err);
        const updatedUser = await prismaClient.akun.update({
          data: {
            token: null,
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
      }
    }
  );

  if (user.token !== null && user.token !== "") {
    return prismaClient.akun.findUnique({
      where: {
        username: user.username,
      },
      select: {
        token: true,
        role: true,
      },
    });
  }

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
      token: true,
      role: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return user;
};

const getPegawai = async (username) => {
  const user = await prismaClient.pegawai.findFirst({
    where: {
      akun: {
        username: username,
      },
    },
    select: {
      id_pegawai: true,
      nama_pegawai: true,
      id_akun: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return user;
};

const changePassword = async (request, username) => {
  const { oldPassword, newPassword } = request;

  const user = await prismaClient.akun.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(401, "Old password is wrong");
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  return prismaClient.akun.update({
    where: {
      username: username,
    },
    data: {
      password: newHashedPassword,
    },
  });
};

const logout = async (username) => {
  return prismaClient.akun.update({
    where: {
      username: username,
    },
    data: {
      token: null,
    },
  });
};

export default {
  register,
  login,
  get,
  changePassword,
  logout,
  getPegawai,
};
