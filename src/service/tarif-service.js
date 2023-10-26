import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createTarifValidation,
  searchTarifValidation,
} from "../validation/tarif-validation.js";

import { validate } from "../validation/validation.js";

const create = async (request) => {
  const dataTarif = validate(createTarifValidation, request);
  const count = await prismaClient.tarif.findFirst({
    orderBy: {
      id_tarif: "desc", // Mengurutkan berdasarkan id_customer secara menurun (descending)
    },
    take: 1, // Mengambil hanya 1 entitas dengan id_customer tertinggi
  });

  const checkDuplicate = await prismaClient.tarif.findFirst({
    where: {
      id_jenis_kamar: dataTarif.id_jenis_kamar,
      id_season: dataTarif.id_season,
    },
  });

  if (checkDuplicate !== null) {
    throw new ResponseError(400, "Tarif is already exists");
  }

  dataTarif.id_tarif = count.id_tarif + 1;

  return prismaClient.tarif.create({
    data: dataTarif,
    select: {
      id_tarif: true,
      jenis_kamar: true,
      season: true,
      harga: true,
    },
  });
};

const getTarifById = async (id) => {
  if (!id) {
    throw new ResponseError(400, "id is required");
  }

  const count = await prismaClient.tarif.count({
    where: {
      id_tarif: id,
    },
  });

  if (count === 0) {
    throw new ResponseError(404, "Tarif is not found");
  }

  return prismaClient.tarif.findUnique({
    where: {
      id_tarif: id,
    },
  });
};

const update = async (request, id) => {
  const dataTarif = validate(createTarifValidation, request);
  const idTarif = id;

  const checkTarif = await prismaClient.tarif.findUnique({
    where: {
      id_tarif: idTarif,
    },
  });

  const checkDuplicate = await prismaClient.tarif.findFirst({
    where: {
      id_jenis_kamar: dataTarif.id_jenis_kamar,
      id_season: dataTarif.id_season,
      NOT: {
        id_tarif: idTarif,
      },
    },
  });

  if (checkDuplicate !== null) {
    throw new ResponseError(400, "Tarif already exists");
  }

  if (checkTarif === null) {
    throw new ResponseError(404, "Tarif is not found");
  }

  return prismaClient.tarif.update({
    where: {
      id_tarif: idTarif,
    },
    data: dataTarif,
    select: {
      id_tarif: true,
      jenis_kamar: true,
      season: true,
      harga: true,
    },
  });
};

const remove = async (id) => {
  if (!id) {
    throw new ResponseError(400, "id is required");
  }

  const count = await prismaClient.tarif.count({
    where: {
      id_tarif: id,
    },
  });

  if (count === 0) {
    throw new ResponseError(404, "tarif is not found");
  }

  return prismaClient.tarif.delete({
    where: {
      id_tarif: id,
    },
  });
};

const search = async (request) => {
  request = validate(searchTarifValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.tarif_attribute !== undefined) {
    if (/^\d+$/.test(request.tarif_attribute)) {
      filters.push({
        harga: parseInt(request.tarif_attribute),
      });
    } else {
      filters.push({
        season: {
          nama_season: {
            contains: request.tarif_attribute,
            mode: "insensitive",
          },
        },
      });
      filters.push({
        jenis_kamar: {
          jenis_kamar: {
            contains: request.tarif_attribute,
            mode: "insensitive",
          },
        },
      });
    }
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

  const tarif = await prismaClient.tarif.findMany({
    where,
    take: request.size,
    skip: skip,
    select: {
      id_tarif: true,
      jenis_kamar: true,
      season: true,
      harga: true,
    },
  });

  const totalItems = await prismaClient.tarif.count({
    where,
  });

  return {
    data: tarif,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  getTarifById,
  update,
  remove,
  search,
};
