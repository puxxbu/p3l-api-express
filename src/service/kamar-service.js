import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createKamarValidation,
  searchKamarValidation,
} from "../validation/kamar-validation.js";
import { validate } from "../validation/validation.js";

const create = async (request) => {
  const dataKamar = validate(createKamarValidation, request);
  const countKamar = await prismaClient.kamar.findFirst({
    orderBy: {
      id_kamar: "desc", // Mengurutkan berdasarkan id_customer secara menurun (descending)
    },
    take: 1, // Mengambil hanya 1 entitas dengan id_customer tertinggi
  });

  const checkDuplicate = await prismaClient.kamar.findFirst({
    where: {
      nomor_kamar: dataKamar.nomor_kamar,
    },
  });

  if (checkDuplicate !== null) {
    throw new ResponseError(400, "Nomor Kamar already exists");
  }

  dataKamar.id_kamar = countKamar.id_kamar + 1;

  const checkJenisKamar = await prismaClient.jenis_kamar.findFirst({
    where: {
      id_jenis_kamar: dataKamar.id_jenis_kamar,
    },
  });

  if (checkJenisKamar === null) {
    throw new ResponseError(404, "Jenis Kamar is not found");
  }

  return prismaClient.kamar.create({
    data: dataKamar,
    select: {
      id_kamar: true,
      id_jenis_kamar: true,
      nomor_kamar: true,
    },
  });
};

const getKamarById = async (id) => {
  if (!id) {
    throw new ResponseError(400, "id is required");
  }

  const countKamar = await prismaClient.kamar.count({
    where: {
      id_kamar: id,
    },
  });

  if (countKamar === 0) {
    throw new ResponseError(404, "Kamar is not found");
  }

  return prismaClient.kamar.findUnique({
    where: {
      id_kamar: id,
    },
  });
};

const update = async (request, id) => {
  const dataKamar = validate(createKamarValidation, request);
  const idKamar = id;

  const checkKamar = await prismaClient.kamar.findUnique({
    where: {
      id_kamar: idKamar,
    },
  });

  const checkDuplicate = await prismaClient.kamar.findFirst({
    where: {
      nomor_kamar: dataKamar.nomor_kamar,
      NOT: {
        id_kamar: idKamar,
      },
    },
  });

  if (checkDuplicate !== null) {
    throw new ResponseError(400, "Nomor Kamar already exists");
  }

  if (checkKamar === null) {
    throw new ResponseError(404, "Kamar is not found");
  }

  const checkJenisKamar = await prismaClient.jenis_kamar.findFirst({
    where: {
      id_jenis_kamar: dataKamar.id_jenis_kamar,
    },
  });

  if (checkJenisKamar === null) {
    throw new ResponseError(404, "Jenis Kamar is not found");
  }

  return prismaClient.kamar.update({
    where: {
      id_kamar: idKamar,
    },
    data: dataKamar,
    select: {
      id_kamar: true,
      id_jenis_kamar: true,
      nomor_kamar: true,
    },
  });
};

const remove = async (id) => {
  if (!id) {
    throw new ResponseError(400, "id is required");
  }

  const countKamar = await prismaClient.kamar.count({
    where: {
      id_kamar: id,
    },
  });

  if (countKamar === 0) {
    throw new ResponseError(404, "Kamar is not found");
  }

  return prismaClient.kamar.delete({
    where: {
      id_kamar: id,
    },
  });
};

// const search = async (request) => {
//   const { limit, page, search } = request;
//   const offset = (page - 1) * limit;

//   const dataKamar = await prismaClient.kamar.findMany({
//     where: {
//       nomor_kamar: {
//         contains: search,
//         mode: "insensitive",
//       },
//     },
//     skip: offset,
//     take: limit,
//     select: {
//       id_kamar: true,
//       id_jenis_kamar: true,
//       nomor_kamar: true,
//     },
//   });

//   const countKamar = await prismaClient.kamar.count({
//     where: {
//       nomor_kamar: {
//         contains: search,
//         mode: "insensitive",
//       },
//     },
//   });

//   return {
//     data: dataKamar,
//     paging: {
//       count: countKamar,
//       total_page: Math.ceil(countKamar / limit),
//       current_page: page,
//       per_page: limit,
//     },
//   };
// };

const search = async (request) => {
  request = validate(searchKamarValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    nomor_kamar: request.nomor_kamar,
  });

  const kamar = await prismaClient.kamar.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.kamar.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: kamar,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  getKamarById,
  update,
  remove,
  search,
};
