import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { createFasilitasValidation } from "../validation/fasilitas-validation.js";

import { validate } from "../validation/validation.js";

const create = async (request) => {
  const dataFasilitas = validate(createFasilitasValidation, request);
  const countFasilitas = await prismaClient.layanan.findFirst({
    orderBy: {
      id_fasilitas: "desc", // Mengurutkan berdasarkan id_customer secara menurun (descending)
    },
    take: 1, // Mengambil hanya 1 entitas dengan id_customer tertinggi
  });

  const checkDuplicate = await prismaClient.layanan.findFirst({
    where: {
      nama_layanan: dataFasilitas.nama_layanan,
    },
  });

  if (checkDuplicate !== null) {
    throw new ResponseError(400, "Nama Fasilitas already exists");
  }

  dataFasilitas.id_fasilitas = countFasilitas.id_fasilitas + 1;

  return prismaClient.layanan.create({
    data: dataFasilitas,
    select: {
      id_fasilitas: true,
      nama_layanan: true,
      harga: true,
    },
  });
};

const getFasilitasById = async (id) => {
  if (!id) {
    throw new ResponseError(400, "id is required");
  }

  const countSeason = await prismaClient.layanan.count({
    where: {
      id_fasilitas: id,
    },
  });

  if (countSeason === 0) {
    throw new ResponseError(404, "Season is not found");
  }

  return prismaClient.layanan.findUnique({
    where: {
      id_fasilitas: id,
    },
  });
};

const update = async (request, id) => {
  const dataFasilitas = validate(createFasilitasValidation, request);
  const idFasilitas = id;

  const checkFasilitas = await prismaClient.layanan.findUnique({
    where: {
      id_fasilitas: idFasilitas,
    },
  });

  const checkDuplicate = await prismaClient.layanan.findFirst({
    where: {
      nama_layanan: dataFasilitas.nama_layanan,
      NOT: {
        id_fasilitas: idFasilitas,
      },
    },
  });

  if (checkDuplicate !== null) {
    throw new ResponseError(400, "Nama Season already exists");
  }

  if (checkFasilitas === null) {
    throw new ResponseError(404, "Season is not found");
  }

  return prismaClient.layanan.update({
    where: {
      id_fasilitas: idFasilitas,
    },
    data: dataFasilitas,
    select: {
      id_fasilitas: true,
      nama_layanan: true,
      harga: true,
    },
  });
};

const remove = async (id) => {
  if (!id) {
    throw new ResponseError(400, "id is required");
  }

  const countFasilitas = await prismaClient.layanan.count({
    where: {
      id_fasilitas: id,
    },
  });

  if (countFasilitas === 0) {
    throw new ResponseError(404, "Season is not found");
  }

  return prismaClient.layanan.delete({
    where: {
      id_fasilitas: id,
    },
  });
};

const search = async (request) => {
  request = validate(searchSeasonValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    nama_layanan: {
      contains: request.nama_layanan,
    },
  });

  const fasilitas = await prismaClient.layanan.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.layanan.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: fasilitas,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  getFasilitasById,
  update,
  remove,
  search,
};
