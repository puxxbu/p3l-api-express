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

const namaBulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

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
              id_jenis_kamar: true,
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
      const idJenisKamar = detail.jenis_kamar.id_jenis_kamar;
      const jumlah = detail.jumlah || 0;
      const jenisBooking = booking.jenis_booking || "Personal";

      if (!acc[idJenisKamar]) {
        acc[idJenisKamar] = {
          id_jenis_kamar: idJenisKamar,
          jenis_kamar: jenisKamar,
          Group: 0,
          Personal: 0,
          Total: 0,
        };
      }

      acc[idJenisKamar][jenisBooking] += jumlah;
      acc[idJenisKamar].Total += jumlah;
    });

    return acc;
  }, {});

  let total = 0;
  let no = 1;
  for (const jenisKamar in laporan) {
    const group = laporan[jenisKamar].Group || 0;
    const personal = laporan[jenisKamar].Personal || 0;
    const jumlah = laporan[jenisKamar].Total || 0;

    // console.log(
    //   `${no}   ${jenisKamar.padEnd(18)} ${group
    //     .toString()
    //     .padStart(6)}  ${personal.toString().padStart(8)}  ${jumlah
    //     .toString()
    //     .padStart(5)}`
    // );

    total += jumlah;
    no++;
  }

  let hasil = {};
  hasil["laporan"] = Object.values(laporan);
  hasil["bulan"] = namaBulan[bulan - 1];
  hasil["tahun"] = laporanFilter["tahun"];
  hasil["total"] = total;

  return hasil;

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

const getLaporanPendapatanBulanan = async (request) => {
  const laporanFilter = validate(createLaporanJumlahTamuValidation, request);

  const today = new Date();
  const year = today.getFullYear();

  const result = await prismaClient.invoice.findMany({
    select: {
      id_invoice: true,
      tanggal_pelunasan: true,
      total_pembayaran: true,
      booking: {
        select: {
          jenis_booking: true,
        },
      },
    },
    where: {
      tanggal_pelunasan: {
        gte: new Date(year, 0, 1), // Tanggal awal tahun
        lte: today, // Tanggal saat ini
      },
    },
    orderBy: {
      tanggal_pelunasan: "asc",
    },
  });

  // Membuat objek untuk menyimpan hasil per bulan
  const monthlyResult = {};
  let totalOverall = 0;

  for (let i = 0; i < namaBulan.length; i++) {
    const monthName = namaBulan[i];

    if (!monthlyResult[monthName]) {
      monthlyResult[monthName] = {
        nama_bulan: monthName,
        Personal: 0,
        Group: 0,
        total: 0,
      };
    }
  }

  // Mengisi hasil penghasilan bulanan berdasarkan jenis_booking
  result.forEach((item) => {
    const month = item.tanggal_pelunasan.getMonth();
    const monthName = namaBulan[month];

    const jenisBooking = item.booking.jenis_booking;
    const totalPembayaran = item.total_pembayaran;

    if (!monthlyResult[monthName]) {
      monthlyResult[monthName] = {
        nama_bulan: monthName,
        Personal: 0,
        Group: 0,
        total: 0,
      };
    }

    monthlyResult[monthName][jenisBooking] += totalPembayaran;
    monthlyResult[monthName].total += totalPembayaran;

    totalOverall += totalPembayaran;
  });

  // Membentuk hasil akhir dalam bentuk array
  const formattedResult = Object.entries(monthlyResult).map(
    ([month, data], index) => {
      const personalTotal = data.Personal.toLocaleString();
      const groupTotal = data.Group.toLocaleString();
      const total = (data.Personal + data.Group).toLocaleString();

      return `${
        index + 1
      }\t${month}\t${groupTotal}\t${personalTotal}\t${total}`;
    }
  );

  // Menampilkan hasil laporan
  // console.log(`No\tBulan\tGrup\tPersonal\tTotal`);
  // formattedResult.forEach((row) => console.log(row));

  let hasil = {};
  hasil["laporan"] = Object.values(monthlyResult);
  hasil["tahun"] = laporanFilter["tahun"];
  hasil["total"] = totalOverall;

  return hasil;
};

export default {
  getLaporanJumlahTamu,
  getLaporanPendapatanBulanan,
};
