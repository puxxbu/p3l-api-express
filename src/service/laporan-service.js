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

const bulanIndonesia = {
  January: "Januari",
  February: "Februari",
  March: "Maret",
  April: "April",
  May: "Mei",
  June: "Juni",
  July: "Juli",
  August: "Agustus",
  September: "September",
  October: "Oktober",
  November: "November",
  December: "Desember",
};

const getLaporanCustomerBaru = async (request) => {
  const laporanFilter = validate(createLaporanJumlahTamuValidation, request);

  const year = laporanFilter.tahun;
  const bulan = laporanFilter.bulan;

  const result = await prismaClient.customer.groupBy({
    by: ["tanggal_dibuat"],
    where: {
      tanggal_dibuat: {
        gte: new Date(year, 0, 1), // Tanggal awal tahun
        lt: new Date(year + 1, 0, 1), // Tanggal awal tahun berikutny
      },
    },
    _count: {
      tanggal_dibuat: true,
    },
    orderBy: {
      tanggal_dibuat: "asc",
    },
  });

  const total = await prismaClient.customer.aggregate({
    where: {
      tanggal_dibuat: {
        gte: new Date(year, 0, 1), // Tanggal awal tahun
        lt: new Date(year + 1, 0, 1), // Tanggal awal tahun berikutny
      },
    },
    _count: {
      _all: true,
    },
  });

  const totalCustomerBaru = total._count._all;

  // Membuat objek untuk menyimpan hasil per bulan
  const monthlyResult = {};

  // Inisialisasi nilai awal 0 untuk setiap bulan
  for (let month = 0; month < 12; month++) {
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(new Date(year, month, 1));

    monthlyResult[monthName] = 0;
  }

  // Mengisi hasil yang sebenarnya dari data customer
  result.forEach((item) => {
    const month = item.tanggal_dibuat.getMonth();
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(new Date(year, month, 1));

    monthlyResult[monthName] += item._count.tanggal_dibuat;
  });

  Object.entries(monthlyResult).forEach(([monthName, customerCount]) => {
    monthlyResult[monthName] = {
      nama_bulan: monthName,
      customer_baru: customerCount,
    };
  });

  const dataIndonesia = {};

  for (const [namaBulan, dataBulan] of Object.entries(monthlyResult)) {
    const namaBulanIndo = bulanIndonesia[namaBulan];
    dataIndonesia[namaBulanIndo] = {
      nama_bulan: namaBulanIndo,
      customer_baru: dataBulan.customer_baru,
    };
  }

  let hasil = {};
  hasil["laporan"] = Object.values(dataIndonesia);
  hasil["tahun"] = laporanFilter["tahun"];
  hasil["total"] = totalCustomerBaru;

  return hasil;
};

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

  const jenisKamar = await prismaClient.jenis_kamar.findMany({
    select: {
      jenis_kamar: true,
    },
  });

  const groupedJenisKamar = jenisKamar.reduce((acc, curr) => {
    const jenisKamarNama = curr.jenis_kamar;

    if (!acc[jenisKamarNama]) {
      acc[jenisKamarNama] = {
        jenis_kamar: jenisKamarNama,
      };
    }

    return acc;
  }, {});

  const dataJenisKamar = Object.values(groupedJenisKamar);

  const laporan = dataJenisKamar.reduce((acc, jenisKamar) => {
    const jenisKamarNama = jenisKamar.jenis_kamar;

    acc[jenisKamarNama] = {
      jenis_kamar: jenisKamarNama,
      Group: 0,
      Personal: 0,
      Total: 0,
    };

    return acc;
  }, {});

  // Isi data jenis kamar dengan laporan
  result.forEach((booking) => {
    booking.detail_booking_kamar.forEach((detail) => {
      const jenisKamar = detail.jenis_kamar.jenis_kamar;
      const jumlah = detail.jumlah || 0;
      const jenisBooking = booking.jenis_booking || "Personal";

      laporan[jenisKamar][jenisBooking] += jumlah;
      laporan[jenisKamar].Total += jumlah;
    });
  });

  // return laporan;
  let total = 0;
  let no = 1;
  for (const jenisKamar in laporan) {
    const group = laporan[jenisKamar].Group || 0;
    const personal = laporan[jenisKamar].Personal || 0;
    const jumlah = laporan[jenisKamar].Total || 0;

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

  const year = laporanFilter.tahun;

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
        lt: new Date(year + 1, 0, 1), // Tanggal awal tahun berikutny
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

const getLaporanTopCustomer = async (request) => {
  const laporanFilter = validate(createLaporanJumlahTamuValidation, request);

  const year = laporanFilter.tahun;

  const topCustomers = await prismaClient.customer.findMany({
    where: {
      booking: {
        some: {
          status_booking: "Check Out",
          tanggal_check_out: {
            gte: new Date(`${year}-01-01`),
            lte: new Date(`${year}-12-31`),
          },
        },
      },
    },
    select: {
      id_customer: true,
      nama: true,
      booking: {
        select: {
          invoice: true,
        },
        where: {
          status_booking: "Check Out",
        },
      },
    },
    orderBy: {
      booking: {
        _count: "desc",
      },
    },
    take: 5,
  });

  topCustomers.forEach((customer) => {
    const { nama, booking } = customer;
    const jumlahBooking = booking.length;

    console.log(`Nama Customer: ${nama}`);
    console.log(`Jumlah Booking: ${jumlahBooking}`);
  });

  const result = topCustomers.map((customer) => {
    const { nama, booking } = customer;
    let totalPembayaran = 0;

    booking.forEach((booking) => {
      const { total_pembayaran } = booking.invoice[0];

      totalPembayaran += total_pembayaran;
    });
    const jumlahReservasi = booking.length;

    return {
      nama_customer: nama,
      jumlah_reservasi: jumlahReservasi,
      total_pembayaran: totalPembayaran,
    };
  });

  const laporan = {};

  laporan["topCustomers"] = result;

  return laporan;
};

export default {
  getLaporanJumlahTamu,
  getLaporanPendapatanBulanan,
  getLaporanCustomerBaru,
  getLaporanTopCustomer,
};
