import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  dataCustomerValidation,
  searchGroupValidation,
  searchUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

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
  const idCustomer = request.id_customer;

  if (request.akun !== undefined) {
    const { username, oldPassword, newPassword } = request.akun;

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

    return prismaClient.$transaction([
      prismaClient.akun.update({
        where: {
          username: username,
        },
        data: {
          password: newHashedPassword,
        },
      }),
      prismaClient.customer.update({
        where: {
          id_customer: idCustomer,
        },
        data: dataCustomer,
      }),
    ]);
  }

  return prismaClient.customer.update({
    where: {
      id_customer: idCustomer,
    },
    data: dataCustomer,
  });
};

const search = async (request) => {
  request = validate(searchUserValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.user_attribute !== undefined) {
    filters.push({
      nama: {
        contains: request.user_attribute,
        mode: "insensitive",
      },
    });
  }

  let where = {};

  if (filters.length > 1) {
    where = {
      OR: filters,
    };
  } else {
    where = {
      AND: filters,
    };
  }

  const customer = await prismaClient.customer.findMany({
    where,
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.customer.count({
    where,
  });

  return {
    data: customer,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

const getCurrentProfile = async (username) => {
  const user = await prismaClient.akun.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User Tidak Ditemukan");
  }

  return prismaClient.customer.findFirst({
    where: {
      id_akun: user.id_akun,
    },
  });
};

const getUserBookingHistory = async (request, id) => {
  request = validate(searchUserValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    id_customer: id,
  });

  if (request.search_params !== undefined) {
    filters.push({
      customer: {
        nama: {
          contains: request.search_params,
          mode: "insensitive",
        },
      },
    });
    filters.push({
      id_booking: {
        contains: request.search_params,
        mode: "insensitive",
      },
    });
    filters.push({
      status_booking: {
        contains: request.search_params,
        mode: "insensitive",
      },
    });
  }

  let where = {};

  if (filters.length > 1) {
    where = {
      OR: filters,
    };
  } else {
    where = {
      AND: filters,
    };
  }

  const booking = await prismaClient.booking.findMany({
    where,
    take: request.size,
    skip: skip,
    select: {
      id_booking: true,
      pegawai_1: true,
      pegawai_2: true,
      tanggal_booking: true,
      tanggal_check_in: true,
      tanggal_check_out: true,
      status_booking: true,
      status_booking: true,
    },
  });

  const totalItems = await prismaClient.booking.count({
    where,
  });

  return {
    data: booking,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

const getBookingById = async (id) => {
  if (!id) {
    throw new ResponseError(400, "id is required");
  }

  console.log(id);

  const countBooking = await prismaClient.booking.count({
    where: {
      id_booking: id,
    },
  });

  if (countBooking === 0) {
    throw new ResponseError(404, "booking is not found");
  }

  return prismaClient.booking.findFirst({
    where: {
      id_booking: id,
    },
    select: {
      id_booking: true,
      customer: true,
      pegawai_1: true,
      pegawai_2: true,
      no_rekening: true,
      status_booking: true,
      jenis_booking: true,
      tanggal_booking: true,
      tanggal_check_in: true,
      tanggal_check_out: true,
      tamu_dewasa: true,
      tamu_anak: true,
      tanggal_pembayaran: true,

      detail_booking_kamar: {
        select: {
          id_detail_booking_kamar: true,
          id_booking: true,
          jenis_kamar: true,
          jumlah: true,
          sub_total: true,
          detail_ketersediaan_kamar: {
            select: {
              kamar: {
                select: {
                  jenis_kamar: true,
                  nomor_kamar: true,
                },
              },
            },
          },
        },
      },
      detail_booking_layanan: {
        select: {
          layanan: true,
          jumlah: true,
          sub_total: true,
          tanggal: true,
        },
      },
      invoice: true,
    },
  });
};

const searchGroup = async (request) => {
  request = validate(searchGroupValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.user_attribute !== undefined) {
    filters.push({
      nama: {
        contains: request.user_attribute,
        mode: "insensitive",
      },
    });
  }

  let where = {};

  if (filters.length > 1) {
    where = {
      OR: filters,
    };
  } else {
    where = {
      AND: filters,
    };
  }

  const customer = await prismaClient.customer.findMany({
    where: {
      jenis_customer: "Group",
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.customer.count({
    where: {
      jenis_customer: "Group",
    },
  });

  return {
    data: customer,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  getProfileById,
  updateProfile,
  search,
  getCurrentProfile,
  getUserBookingHistory,
  getBookingById,
  searchGroup,
};
