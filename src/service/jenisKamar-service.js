import { format } from "path";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { formatToISO } from "../utils/date-formatter.js";
import {
  createJenisKamarValidation,
  searchJenisKamarValidation,
  showAvailabilityValidation,
} from "../validation/jenisKamar-validation.js";

import { validate } from "../validation/validation.js";

const create = async (request) => {
  const dataJenisKamar = validate(createJenisKamarValidation, request);
  const countJenisKamar = await prismaClient.jenis_kamar.findFirst({
    orderBy: {
      id_jenis_kamar: "desc", // Mengurutkan berdasarkan id_customer secara menurun (descending)
    },
    take: 1, // Mengambil hanya 1 entitas dengan id_customer tertinggi
  });

  const checkDuplicate = await prismaClient.jenis_kamar.findFirst({
    where: {
      jenis_kamar: dataJenisKamar.jenis_kamar,
      jenis_bed: dataJenisKamar.jenis_bed,
    },
  });

  if (checkDuplicate !== null) {
    throw new ResponseError(400, "Jenis kamar dan bed already exists");
  }

  dataJenisKamar.id_jenis_kamar = countJenisKamar.id_jenis_kamar + 1;

  return prismaClient.jenis_kamar.create({
    data: dataJenisKamar,
    select: {
      id_jenis_kamar: true,
      jenis_kamar: true,
      jenis_bed: true,
      kapasitas: true,
      jumlah_kasur: true,
    },
  });
};

const getJenisKamarById = async (id) => {
  if (!id) {
    throw new ResponseError(400, "id is required");
  }

  const count = await prismaClient.jenis_kamar.count({
    where: {
      id_jenis_kamar: id,
    },
  });

  if (count === 0) {
    throw new ResponseError(404, "Jenis Kamar is not found");
  }

  return prismaClient.jenis_kamar.findUnique({
    where: {
      id_jenis_kamar: id,
    },
  });
};

const update = async (request, id) => {
  const dataJenisKamar = validate(createJenisKamarValidation, request);
  const idJenisKamar = id;

  const checkJenisKamar = await prismaClient.jenis_kamar.findUnique({
    where: {
      id_jenis_kamar: idJenisKamar,
    },
  });

  const checkDuplicate = await prismaClient.jenis_kamar.findFirst({
    where: {
      jenis_kamar: dataJenisKamar.jenis_kamar,
      jenis_bed: dataJenisKamar.jenis_bed,
      NOT: {
        id_jenis_kamar: idJenisKamar,
      },
    },
  });

  if (checkDuplicate !== null) {
    throw new ResponseError(400, "Nama Season already exists");
  }

  if (checkJenisKamar === null) {
    throw new ResponseError(404, "Season is not found");
  }

  return prismaClient.jenis_kamar.update({
    where: {
      id_jenis_kamar: idJenisKamar,
    },
    data: dataJenisKamar,
    select: {
      id_jenis_kamar: true,
      jenis_kamar: true,
      jenis_bed: true,
      kapasitas: true,
      jumlah_kasur: true,
    },
  });
};

const remove = async (id) => {
  if (!id) {
    throw new ResponseError(400, "id is required");
  }

  const count = await prismaClient.jenis_kamar.count({
    where: {
      id_jenis_kamar: id,
    },
  });

  if (count === 0) {
    throw new ResponseError(404, "Jenis Kamar is not found");
  }

  return prismaClient.jenis_kamar.delete({
    where: {
      id_jenis_kamar: id,
    },
  });
};

const showAvailability = async (request) => {
  const data = validate(showAvailabilityValidation, request);

  const jumlahKamar = await prismaClient.kamar.count({
    where: {
      id_jenis_kamar: data.id_jenis_kamar,
      OR: [
        {
          NOT: {
            detail_ketersediaan_kamar: {
              some: {
                detail_booking_kamar: {
                  booking: {
                    AND: [
                      {
                        tanggal_check_in: {
                          lte: formatToISO(data.tanggal_check_out),
                        },
                      },
                      {
                        tanggal_check_out: {
                          gte: formatToISO(data.tanggal_check_in),
                        },
                      },
                    ],
                  },
                },
                status: "Booked",
              },
            },
          },
        },
        // {
        //   detail_ketersediaan_kamar: {
        //     some: {
        //       detail_booking_kamar: {
        //         booking: {
        //           AND: [
        //             {
        //               tanggal_check_in: {
        //                 lte: formatToISO(data.tanggal_check_in),
        //               },
        //             },
        //             {
        //               tanggal_check_out: {
        //                 gte: formatToISO(data.tanggal_check_out),
        //               },
        //             },
        //           ],
        //         },
        //       },
        //       status: "Tersedia",
        //     },
        //   },
        //   // detail_ketersediaan_kamar: {
        //   //   some: {
        //   //     status: "Tersedia",
        //   //   },
        //   // },
        // },
      ],
    },
  });

  return jumlahKamar;
};

const search = async (request) => {
  request = validate(searchJenisKamarValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  // filters.push({
  //   jenis_kamar: request.jenis_kamar,
  // });

  if (request.jenis_kamar) {
    filters.push({
      jenis_kamar: {
        contains: request.jenis_kamar,
        mode: "insensitive",
      },
    });
  }

  // if (request.jenis_kamar) {
  //   filters.push({
  //     jenis_bed: {
  //       contains: request.jenis_kamar,
  //     },
  //   });
  // }
  if (request.kapasitas) {
    filters.push({
      kapasitas: {
        contains: request.kapasitas,
      },
    });
  }
  if (request.jumlah_kasur) {
    filters.push({
      jumlah_kasur: {
        contains: request.jumlah_kasur,
      },
    });
  }

  console.log(filters);

  const jenisKamar = await prismaClient.jenis_kamar.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.jenis_kamar.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: jenisKamar,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  getJenisKamarById,
  update,
  remove,
  search,
  showAvailability,
};
