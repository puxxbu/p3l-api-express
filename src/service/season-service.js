import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createSeasonValidation,
  searchSeasonValidation,
} from "../validation/season-validation.js";
import { validate } from "../validation/validation.js";

const create = async (request) => {
  const dataSeason = validate(createSeasonValidation, request);
  const countSeason = await prismaClient.season.findFirst({
    orderBy: {
      id_season: "desc", // Mengurutkan berdasarkan id_customer secara menurun (descending)
    },
    take: 1, // Mengambil hanya 1 entitas dengan id_customer tertinggi
  });

  const checkDuplicate = await prismaClient.season.findFirst({
    where: {
      nama_season: dataSeason.nama_season,
    },
  });

  if (checkDuplicate !== null) {
    throw new ResponseError(400, "Nama Season already exists");
  }

  dataSeason.id_season = countSeason.id_season + 1;

  return prismaClient.season.create({
    data: dataSeason,
    select: {
      id_season: true,
      nama_season: true,
      tanggal_mulai: true,
      tanggal_selesai: true,
    },
  });
};

const getSeasonById = async (id) => {
  if (!id) {
    throw new ResponseError(400, "id is required");
  }

  const countSeason = await prismaClient.season.count({
    where: {
      id_season: id,
    },
  });

  if (countSeason === 0) {
    throw new ResponseError(404, "Season is not found");
  }

  return prismaClient.season.findUnique({
    where: {
      id_season: id,
    },
  });
};

const update = async (request, id) => {
  const dataSeason = validate(createSeasonValidation, request);
  const idSeason = id;

  const checkSeason = await prismaClient.season.findUnique({
    where: {
      id_season: idSeason,
    },
  });

  const checkDuplicate = await prismaClient.season.findFirst({
    where: {
      nama_season: dataSeason.nama_season,
      NOT: {
        id_season: idSeason,
      },
    },
  });

  if (checkDuplicate !== null) {
    throw new ResponseError(400, "Nama Season already exists");
  }

  if (checkSeason === null) {
    throw new ResponseError(404, "Season is not found");
  }

  return prismaClient.season.update({
    where: {
      id_season: idSeason,
    },
    data: dataSeason,
    select: {
      id_season: true,
      nama_season: true,
      tanggal_mulai: true,
      tanggal_selesai: true,
    },
  });
};

const remove = async (id) => {
  if (!id) {
    throw new ResponseError(400, "id is required");
  }

  const countSeason = await prismaClient.season.count({
    where: {
      id_season: id,
    },
  });

  if (countSeason === 0) {
    throw new ResponseError(404, "Season is not found");
  }

  return prismaClient.season.delete({
    where: {
      id_season: id,
    },
  });
};

const search = async (request) => {
  request = validate(searchSeasonValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    nama_season: {
      contains: request.nama_season,
      mode: "insensitive",
    },
  });

  const season = await prismaClient.season.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.season.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: season,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  getSeasonById,
  update,
  remove,
  search,
};
