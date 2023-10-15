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
import jwt from "jsonwebtoken";

const create = async (request) => {
  const dataCustomer = validate(dataCustomerValidation, request);
  const countCustomer = await prismaClient.customer.findFirst({
    orderBy: {
      id_customer: "desc", // Mengurutkan berdasarkan id_customer secara menurun (descending)
    },
    take: 1, // Mengambil hanya 1 entitas dengan id_customer tertinggi
  });
  dataCustomer.tanggal_dibuat = new Date();
  dataCustomer.id_customer = countCustomer.id_customer + 1;

  return prismaClient.customer.create({
    data: dataCustomer,
    select: {
      nama: true,
      jenis_customer: true,
    },
  });
};

const getProfileById = async (id) => {
  if (!id) {
    throw new ResponseError(400, "id is required");
  }

  const countCustomer = await prismaClient.customer.count({
    where: {
      id_customer: id,
    },
  });

  if (countCustomer === 0) {
    throw new ResponseError(404, "Customer is not found");
  }

  return prismaClient.customer.findUnique({
    where: {
      id_customer: id,
    },
  });
};

const updateProfile = async (request) => {
  const dataCustomer = validate(dataCustomerValidation, request.customer);
  if (request.password !== undefined) {
    const { username, oldPassword, newPassword } = request.password;

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

    return prismaClient.$transaction([
      prismaClient.akun.update({
        where: {
          username: username,
        },
        data: {
          token: null,
        },
      }),
      prismaClient.customer.update({
        where: {
          id_customer: dataCustomer.id_customer,
        },
        data: dataCustomer,
      }),
    ]);
  }

  return prismaClient.customer.update({
    where: {
      id_customer: dataCustomer.id_customer,
    },
    data: dataCustomer,
  });
};

export default {
  create,
  getProfileById,
  updateProfile,
};
