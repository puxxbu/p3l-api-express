import moment from "moment";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createBookingValidation,
  detailBookingValidation,
  detailFasilitasValidation,
  searchKamarValidation,
} from "../validation/booking-validation.js";
import {
  createTarifValidation,
  searchTarifValidation,
} from "../validation/tarif-validation.js";

import { validate } from "../validation/validation.js";
import { PrismaClient } from "@prisma/client";
import { formatToISO } from "../utils/date-formatter.js";

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

// TODO Inject ketersediaan kamar pada list
const searchAvailableKamar = async (request) => {
  request = validate(searchKamarValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.kamar_attribute !== undefined) {
    if (/^\d+$/.test(request.kamar_attribute)) {
      filters.push({
        base_harga: parseInt(request.kamar_attribute),
      });
    } else {
      filters.push({
        jenis_bed: {
          contains: request.kamar_attribute,
          mode: "insensitive",
        },
      });
      filters.push({
        jenis_kamar: {
          contains: request.kamar_attribute,
          mode: "insensitive",
        },
      });
    }
  }

  let tanggal_check_in = new Date();
  let tanggal_check_out = new Date();

  // request.tanggal_check_in = "2023-09-12T11:00:00.000Z";

  if (request.tanggal_check_in !== undefined) {
    tanggal_check_in = new Date(request.tanggal_check_in);
  }
  if (request.tanggal_check_out !== undefined) {
    tanggal_check_out = new Date(request.tanggal_check_out);
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

  const ketersediaanKamar = await prismaClient.jenis_kamar.findMany({
    select: {
      id_jenis_kamar: true,
    },
  });

  const updatedKetersediaanKamar = await Promise.all(
    ketersediaanKamar.map(async (data) => {
      const jumlahKamar = await prismaClient.kamar.count({
        where: {
          id_jenis_kamar: data.id_jenis_kamar,
          NOT: {
            detail_ketersediaan_kamar: {
              some: {
                detail_booking_kamar: {
                  booking: {
                    AND: [
                      {
                        tanggal_check_in: {
                          lte: tanggal_check_out.toISOString(),
                        },
                      },
                      {
                        tanggal_check_out: {
                          gte: tanggal_check_in.toISOString(),
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      });

      return {
        ...data,
        ketersediaan_kamar: jumlahKamar,
      };
    })
  );

  if (ketersediaanKamar.length === 0) {
    return {
      data: [],
      ketersediaan: [],
      paging: {
        page: request.page,
        total_item: 0,
        total_page: 0,
      },
    };
  }

  // const kamarMap = new Map();
  // ketersediaanKamar.forEach((kamar) => {
  //   const key = JSON.stringify(kamar);
  //   const count = kamarMap.get(key) || 0;
  //   kamarMap.set(key, count + 1);
  // });

  // const ketersediaanSederhana = Array.from(kamarMap.entries()).map(
  //   ([key, count]) => {
  //     const { id_jenis_kamar, booking } = JSON.parse(key);
  //     return {
  //       id_jenis_kamar,
  //       booking,
  //       jumlah: count,
  //     };
  //   }
  // );

  const jenisKamarCounts = await prismaClient.kamar.groupBy({
    by: ["id_jenis_kamar"],
    _count: {
      id_jenis_kamar: true,
      as: "jumlah",
    },
  });

  const kamar = await prismaClient.jenis_kamar.findMany({
    where,
    take: request.size,
    skip: skip,
    select: {
      id_jenis_kamar: true,
      jenis_bed: true,
      jenis_kamar: true,
      tarif: {
        where: {
          AND: [
            {
              season: {
                tanggal_mulai: {
                  lte: tanggal_check_in,
                },
              },
            },
            {
              season: {
                tanggal_selesai: {
                  gte: tanggal_check_in,
                },
              },
            },
          ],
        },
        select: {
          id_tarif: true,
          harga: true,
          season: {
            select: {
              id_season: true,
              nama_season: true,
              tanggal_mulai: true,
              tanggal_selesai: true,
            },
          },
        },
      },
      base_harga: true,
      kapasitas: true,
    },
  });

  const totalItems = await prismaClient.jenis_kamar.count({
    where,
  });

  const kamarTersedia = kamar.filter((kamarItem) => {
    const idJenisKamar = kamarItem.id_jenis_kamar;
    const ketersediaan = updatedKetersediaanKamar.find(
      (ketersediaanItem) => ketersediaanItem.id_jenis_kamar === idJenisKamar
    );

    return ketersediaan && ketersediaan.ketersediaan_kamar > 0;
  });

  return {
    data: kamarTersedia,
    ketersediaan: updatedKetersediaanKamar,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

async function isBookingIdUnique(bookingId) {
  const existingBooking = await prismaClient.booking.findUnique({
    where: {
      id_booking: bookingId,
    },
  });
  return !existingBooking;
}

// Contoh penggunaan fungsi

const createBook = async (request) => {
  const dataBooking = validate(createBookingValidation, request.booking);
  const dataDetailBooking = validate(
    detailBookingValidation,
    request.detail_booking
  );

  let isUnique = false;
  let id_booking;

  while (!isUnique) {
    const timestamp = moment().format("YYMMDD");
    const randomSuffix = Math.floor(Math.random() * 1000);
    id_booking = `P${timestamp}-${randomSuffix}`;

    isUnique = await isBookingIdUnique(id_booking);
  }

  dataBooking.id_booking = id_booking;
  dataBooking.tanggal_check_in = formatToISO(dataBooking.tanggal_check_in);
  dataBooking.tanggal_check_out = formatToISO(dataBooking.tanggal_check_out);

  const dataBook = await prismaClient.booking.create({
    data: dataBooking,
  });

  let list_id_dbk = [];

  for (const [index, detail] of dataDetailBooking.entries()) {
    detail.id_booking = id_booking;

    const countAvailableKamar = await prismaClient.kamar.count({
      where: {
        id_jenis_kamar: detail.id_jenis_kamar,
        NOT: {
          detail_ketersediaan_kamar: {
            some: {
              detail_booking_kamar: {
                booking: {
                  AND: [
                    {
                      tanggal_check_in: {
                        lte: dataBooking.tanggal_check_out,
                      },
                    },
                    {
                      tanggal_check_out: {
                        gte: dataBooking.tanggal_check_in,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    });

    if (countAvailableKamar < detail.jumlah) {
      await prismaClient.booking.delete({
        where: {
          id_booking: id_booking,
        },
      });

      throw new ResponseError(
        400,
        `Jumlah kamar (${detail.jumlah}) untuk jenis kamar (${detail.id_jenis_kamar}) tidak mencukupi, tersisa (${countAvailableKamar})`
      );
    }

    const countDbk = await prismaClient.detail_booking_kamar.findFirst({
      orderBy: {
        id_detail_booking_kamar: "desc",
      },
      take: 1,
    });

    detail.id_detail_booking_kamar =
      (countDbk ? countDbk.id_detail_booking_kamar : 0) + 1;

    console.log(JSON.stringify(detail, null, 2));

    await prismaClient.detail_booking_kamar.create({
      data: detail,
    });

    const kamarAvail = await prismaClient.kamar.findMany({
      where: {
        id_jenis_kamar: detail.id_jenis_kamar,
        NOT: {
          detail_ketersediaan_kamar: {
            some: {
              detail_booking_kamar: {
                booking: {
                  AND: [
                    {
                      tanggal_check_in: {
                        lte: dataBooking.tanggal_check_out,
                      },
                    },
                    {
                      tanggal_check_out: {
                        gte: dataBooking.tanggal_check_in,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    });

    if (kamarAvail.length < detail.jumlah) {
      throw new ResponseError(
        400,
        `Jumlah kamar (${detail.jumlah}) untuk jenis kamar (${detail.id_jenis_kamar}) tidak mencukupi, tersisa (${countAvailableKamar})`
      );
    }

    let resultDkk = [];

    if (kamarAvail.length >= detail.jumlah) {
      for (let i = 0; i < detail.jumlah; i++) {
        const countdkk = await prismaClient.detail_ketersediaan_kamar.findFirst(
          {
            orderBy: {
              id_ketersediaan_kamar: "desc",
            },
            take: 1,
          }
        );

        const id_ketersediaan_kamar = countdkk
          ? countdkk.id_ketersediaan_kamar + 1
          : 1;
        const id_kamar = kamarAvail[i].id_kamar;
        const id_detail_booking_kamar = detail.id_detail_booking_kamar;

        console.log(id_detail_booking_kamar);
        resultDkk.push(
          await prismaClient.detail_ketersediaan_kamar.create({
            data: {
              id_ketersediaan_kamar,
              id_kamar,
              id_detail_booking_kamar,
            },
          })
        );
      }
    }

    const count = await prismaClient.detail_booking_kamar.findFirst({
      orderBy: {
        id_detail_booking_kamar: "desc",
      },
      take: 1,
    });

    detail.id_detail_booking_kamar = count.id_detail_booking_kamar + 1;
    list_id_dbk.push(detail.id_detail_booking_kamar);
  }

  if (request.fasilitas !== undefined) {
    const dataFasilitas = validate(
      detailFasilitasValidation,
      request.fasilitas
    );

    for (const [index, detail] of dataFasilitas.entries()) {
      console.log(JSON.stringify(detail, null, 2));
      let countDbl = await prismaClient.detail_booking_layanan.findFirst({
        orderBy: {
          id_detail_booking_layanan: "desc",
        },
        take: 1,
      });

      if (countDbl === null) {
        detail.id_detail_booking_layanan = 1;
      } else {
        detail.id_detail_booking_layanan =
          countDbl.id_detail_booking_layanan + 1;
      }

      await prismaClient.detail_booking_layanan.create({
        data: {
          id_detail_booking_layanan: detail.id_detail_booking_layanan,
          id_booking: id_booking,
          id_fasilitas: detail.id_fasilitas,
          jumlah: detail.jumlah,
          tanggal: new Date(),
          sub_total: detail.sub_total,
        },
      });
    }
  }

  return prismaClient.booking.findFirst({
    where: {
      id_booking: dataBooking.id_booking,
    },
    select: {
      id_booking: true,
      customer: true,
      tanggal_booking: true,
      tanggal_check_in: true,
      tanggal_check_out: true,
      tamu_dewasa: true,
      tamu_anak: true,
      tanggal_pembayaran: true,
      jenis_booking: true,
      status_booking: true,
      no_rekening: true,
      pegawai_1: true,
      pegawai_2: true,
      catatan_tambahan: true,
      detail_booking_kamar: {
        select: {
          id_detail_booking_kamar: true,
          id_booking: true,
          id_jenis_kamar: true,
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
      detail_booking_layanan: true,
    },
  });
};

const updateStatusBooking = async (request, id) => {
  const status_booking = request.status_booking;
  const idBooking = id;

  const checkBooking = await prismaClient.booking.findUnique({
    where: {
      id_booking: idBooking,
    },
  });

  if (checkBooking === null) {
    throw new ResponseError(404, "Tarif is not found");
  }

  return prismaClient.booking.update({
    where: {
      id_booking: idBooking,
    },
    data: {
      status_booking: status_booking,
    },
  });
};

export default {
  create,
  getTarifById,
  update,
  remove,
  search,
  searchAvailableKamar,
  createBook,
  updateStatusBooking,
};
