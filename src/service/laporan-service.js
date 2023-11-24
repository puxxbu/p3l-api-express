import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { createLaporanJumlahTamuValidation } from "../validation/laporan-validation.js";
import {
  dataCustomerValidation,
  searchGroupValidation,
  searchUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

const getLaporanJumlahTamu = async (request) => {
  const laporanFilter = validate(createLaporanJumlahTamuValidation, request);

  const tahun = laporanFilter.tahun;
  const bulan = laporanFilter.bulan;

  const result = await prismaClient.booking.findMany({
    where: {
      status_booking: "Check Out",
      tanggal_check_in: {
        gte: new Date(tahun, bulan - 1, 1),
        lt: new Date(tahun, bulan, 1),
      },
    },
    select: {
      detail_booking_kamar: {
        select: {
          jenis_kamar: {
            select: {
              jenis_kamar: true,
            },
          },
          jumlah: true,
        },
      },
      jenis_booking: true,
    },
  });

  const laporan = result.reduce((acc, booking) => {
    booking.detail_booking_kamar.forEach((detail) => {
      const jenisKamar = detail.jenis_kamar.jenis_kamar;
      const jumlah = detail.jumlah || 0;
      const jenisBooking = booking.jenis_booking || "Personal";

      if (!acc[jenisKamar]) {
        acc[jenisKamar] = {
          Group: 0,
          Personal: 0,
          Total: 0,
        };
      }

      acc[jenisKamar][jenisBooking] += jumlah;
      acc[jenisKamar].Total += jumlah;
    });

    return acc;
  }, {});

  let total = 0;
  let no = 1;

  return laporan;

  for (const jenisKamar in laporan) {
    const group = laporan[jenisKamar].Group || 0;
    const personal = laporan[jenisKamar].Personal || 0;
    const jumlah = laporan[jenisKamar].Total || 0;

    console.log(
      `${no}   ${jenisKamar.padEnd(18)} ${group
        .toString()
        .padStart(6)}  ${personal.toString().padStart(8)}  ${jumlah
        .toString()
        .padStart(5)}`
    );

    total += jumlah;
    no++;
  }
};

export default {
  getLaporanJumlahTamu,
};
