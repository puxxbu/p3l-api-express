const { PrismaClient } = require("@prisma/client");
const { func } = require("joi");

const prisma = new PrismaClient();

async function main() {
  // Menambahkan data pengguna

  // await prisma.role.createMany({
  //   data: [
  //     { id_role: 1001, nama_role: "Admin" },
  //     { id_role: 1002, nama_role: "SM" },
  //     { id_role: 1003, nama_role: "FO" },
  //     { id_role: 1004, nama_role: "GM" },
  //     { id_role: 1005, nama_role: "Owner" },
  //     { id_role: 2001, nama_role: "Customer" },
  //     { id_role: 2002, nama_role: "Guest" },
  //   ],
  // });

  // await prisma.season.createMany({
  //   data: [
  //     {
  //       id_season: 3,
  //       nama_season: "Musim Ujian",
  //       tanggal_mulai: new Date("2023-01-01"),
  //       tanggal_selesai: new Date("2023-06-22"),
  //     },
  //     {
  //       id_season: 2,
  //       nama_season: "Musim Dingin",
  //       tanggal_mulai: new Date("2023-09-27"),
  //       tanggal_selesai: new Date("2023-11-28"),
  //     },
  //     {
  //       id_season: 1,
  //       nama_season: "Musim Panas",
  //       tanggal_mulai: new Date("2023-07-12"),
  //       tanggal_selesai: new Date("2023-09-25"),
  //     },
  //   ],
  // });

  // await prisma.akun.createMany({
  //   data: [
  //     {
  //       id_akun: 10002,
  //       id_role: 1002,
  //       username: "sm",
  //       password: "secret",
  //       token: null,
  //     },
  //     {
  //       id_akun: 10003,
  //       id_role: 1003,
  //       username: "fo",
  //       password: "secret",
  //       token: null,
  //     },
  //     {
  //       id_akun: 10004,
  //       id_role: 1004,
  //       username: "gm",
  //       password: "secret",
  //       token: null,
  //     },
  //     {
  //       id_akun: 10005,
  //       id_role: 1005,
  //       username: "owner",
  //       password: "secret",
  //       token: null,
  //     },
  //     {
  //       id_akun: 20001,
  //       id_role: 2001,
  //       username: "customer",
  //       password: "secret",
  //       token: null,
  //     },
  //     {
  //       id_akun: 20002,
  //       id_role: 2001,
  //       username: "customer2",
  //       password: "secret",
  //       token: null,
  //     },
  //     {
  //       id_akun: 20003,
  //       id_role: 2001,
  //       username: "customer3",
  //       password: "secret",
  //       token: null,
  //     },
  //     {
  //       id_akun: 20004,
  //       id_role: 2001,
  //       username: "customer4",
  //       password: "secret",
  //       token: null,
  //     },
  //     {
  //       id_akun: 10001,
  //       id_role: 1001,
  //       username: "admin",
  //       password: "admin",
  //     },
  //   ],
  // });

  // await prisma.jenis_kamar.createMany({
  //   data: [
  //     {
  //       id_jenis_kamar: 1,
  //       jenis_kamar: "Superior",
  //       jenis_bed: "double",
  //       kapasitas: 2,
  //       jumlah_kasur: 1,
  //     },
  //     {
  //       id_jenis_kamar: 2,
  //       jenis_kamar: "Superior",
  //       jenis_bed: "twin",
  //       kapasitas: 2,
  //       jumlah_kasur: 1,
  //     },
  //     {
  //       id_jenis_kamar: 3,
  //       jenis_kamar: "Double Deluxe",
  //       jenis_bed: "double",
  //       kapasitas: 2,
  //       jumlah_kasur: 1,
  //     },
  //     {
  //       id_jenis_kamar: 4,
  //       jenis_kamar: "Double Deluxe",
  //       jenis_bed: "twin",
  //       kapasitas: 2,
  //       jumlah_kasur: 2,
  //     },
  //     {
  //       id_jenis_kamar: 6,
  //       jenis_kamar: "Junior Suite",
  //       jenis_bed: "king",
  //       kapasitas: 2,
  //       jumlah_kasur: 1,
  //     },
  //     {
  //       id_jenis_kamar: 5,
  //       jenis_kamar: "Executive Deluxe",
  //       jenis_bed: "king",
  //       kapasitas: 2,
  //       jumlah_kasur: 1,
  //     },
  //   ],
  // });

  // await prisma.kamar.createMany({
  //   data: [
  //     {
  //       id_kamar: 1,
  //       id_jenis_kamar: 1,
  //       nomor_kamar: 101,
  //     },
  //     {
  //       id_kamar: 2,
  //       id_jenis_kamar: 1,
  //       nomor_kamar: 102,
  //     },
  //     {
  //       id_kamar: 3,
  //       id_jenis_kamar: 2,
  //       nomor_kamar: 103,
  //     },
  //     {
  //       id_kamar: 4,
  //       id_jenis_kamar: 2,
  //       nomor_kamar: 104,
  //     },
  //     {
  //       id_kamar: 5,
  //       id_jenis_kamar: 3,
  //       nomor_kamar: 105,
  //     },
  //     {
  //       id_kamar: 6,
  //       id_jenis_kamar: 3,
  //       nomor_kamar: 106,
  //     },
  //     {
  //       id_kamar: 7,
  //       id_jenis_kamar: 4,
  //       nomor_kamar: 107,
  //     },
  //     {
  //       id_kamar: 8,
  //       id_jenis_kamar: 4,
  //       nomor_kamar: 108,
  //     },
  //     {
  //       id_kamar: 9,
  //       id_jenis_kamar: 5,
  //       nomor_kamar: 109,
  //     },
  //     {
  //       id_kamar: 10,
  //       id_jenis_kamar: 5,
  //       nomor_kamar: 110,
  //     },
  //     {
  //       id_kamar: 11,
  //       id_jenis_kamar: 6,
  //       nomor_kamar: 201,
  //     },
  //   ],
  // });

  // await prisma.kamar.createMany({
  //   data: [
  //     {
  //       id_kamar: 12,
  //       id_jenis_kamar: 1,
  //       nomor_kamar: 111,
  //     },
  //     {
  //       id_kamar: 13,
  //       id_jenis_kamar: 1,
  //       nomor_kamar: 112,
  //     },
  //     {
  //       id_kamar: 14,
  //       id_jenis_kamar: 2,
  //       nomor_kamar: 113,
  //     },
  //     {
  //       id_kamar: 15,
  //       id_jenis_kamar: 2,
  //       nomor_kamar: 114,
  //     },
  //     {
  //       id_kamar: 16,
  //       id_jenis_kamar: 3,
  //       nomor_kamar: 115,
  //     },
  //     {
  //       id_kamar: 17,
  //       id_jenis_kamar: 3,
  //       nomor_kamar: 116,
  //     },
  //     {
  //       id_kamar: 18,
  //       id_jenis_kamar: 4,
  //       nomor_kamar: 117,
  //     },
  //     {
  //       id_kamar: 19,
  //       id_jenis_kamar: 4,
  //       nomor_kamar: 118,
  //     },
  //     {
  //       id_kamar: 20,
  //       id_jenis_kamar: 5,
  //       nomor_kamar: 119,
  //     },
  //     {
  //       id_kamar: 21,
  //       id_jenis_kamar: 5,
  //       nomor_kamar: 120,
  //     },
  //     {
  //       id_kamar: 22,
  //       id_jenis_kamar: 6,
  //       nomor_kamar: 202,
  //     },
  //   ],
  // });

  // await prisma.customer.createMany({
  //   data: [
  //     {
  //       id_customer: 1,
  //       id_akun: 20001,
  //       jenis_customer: "Personal",
  //       nama: "Pablo1",
  //       nomor_identitas: "123123",
  //       nomor_telepon: "0895123123",
  //       email: "pablo@mail.com",
  //       alamat: "Kakap No.8",
  //       tanggal_dibuat: new Date("2023-09-25"),
  //     },
  //     {
  //       id_customer: 2,
  //       id_akun: 20002,
  //       jenis_customer: "Personal",
  //       nama: "Isobabat",
  //       nomor_identitas: "321321",
  //       nomor_telepon: "0876123123",
  //       email: "isobabat@mail.com",
  //       alamat: "Mino. 32",
  //       tanggal_dibuat: new Date("2023-09-25"),
  //     },
  //     {
  //       id_customer: 3,
  //       jenis_customer: "Group",
  //       nama: "Cixaaa",
  //       nomor_identitas: "333333",
  //       nomor_telepon: "1231231234",
  //       email: "cixa@mail.com",
  //       alamat: "NewZealand",
  //       tanggal_dibuat: new Date("2023-09-25"),
  //     },
  //     {
  //       id_customer: 4,
  //       jenis_customer: "Group",
  //       nama: "Puxxbu",
  //       nomor_identitas: "323232",
  //       nomor_telepon: "8821123443",
  //       email: "puxxbu@mail.com",
  //       alamat: "Japan",
  //       tanggal_dibuat: new Date("2023-09-25"),
  //     },
  //     {
  //       id_customer: 5,
  //       id_akun: 20003,
  //       jenis_customer: "Personal",
  //       nama: "Pusscok",
  //       nomor_identitas: "333332",
  //       nomor_telepon: "0891112311",
  //       email: "pusscok@mail.com",
  //       alamat: "Australia",
  //       tanggal_dibuat: new Date("2023-09-01"),
  //     },
  //   ],
  // });

  // await prisma.pegawai.createMany({
  //   data: [
  //     {
  //       id_pegawai: 1,
  //       id_akun: 10001,
  //       nama_pegawai: "AdminG",
  //     },
  //     {
  //       id_pegawai: 2,
  //       id_akun: 10002,
  //       nama_pegawai: "SM GAMING",
  //     },
  //   ],
  // });

  // await prisma.layanan.createMany({
  //   data: [
  //     {
  //       id_fasilitas: 1,
  //       nama_layanan: "Extra Bed",
  //       harga: 150000,
  //     },
  //     {
  //       id_fasilitas: 2,
  //       nama_layanan: "Laundry",

  //       harga: 1000,
  //     },
  //     {
  //       id_fasilitas: 4,
  //       nama_layanan: "Meeting Room",
  //       harga: 300000,
  //     },
  //     {
  //       id_fasilitas: 3,
  //       nama_layanan: "Massage",
  //       harga: 75000,
  //     },
  //     {
  //       id_fasilitas: 5,
  //       nama_layanan: "Extra Breakfast",
  //       harga: 20000,
  //     },
  //   ],
  // });

  // await prisma.tarif.createMany({
  //   data: [
  //     {
  //       id_tarif: 1,
  //       id_jenis_kamar: 1,
  //       id_season: 1,
  //       harga: 120000,
  //     },
  //     {
  //       id_tarif: 2,
  //       id_jenis_kamar: 1,
  //       id_season: 2,
  //       harga: 75000,
  //     },
  //     {
  //       id_tarif: 3,
  //       id_jenis_kamar: 1,
  //       id_season: 3,
  //       harga: 90000,
  //     },
  //     {
  //       id_tarif: 4,
  //       id_jenis_kamar: 2,
  //       id_season: 1,
  //       harga: 30000,
  //     },
  //     {
  //       id_tarif: 5,
  //       id_jenis_kamar: 2,
  //       id_season: 2,
  //       harga: 600000,
  //     },
  //     {
  //       id_tarif: 6,
  //       id_jenis_kamar: 2,
  //       id_season: 3,
  //       harga: 130000,
  //     },
  //     {
  //       id_tarif: 7,
  //       id_jenis_kamar: 3,
  //       id_season: 1,
  //       harga: 160000,
  //     },
  //     {
  //       id_tarif: 8,
  //       id_jenis_kamar: 3,
  //       id_season: 2,
  //       harga: 200000,
  //     },
  //     {
  //       id_tarif: 9,
  //       id_jenis_kamar: 3,
  //       id_season: 3,
  //       harga: 400000,
  //     },
  //     {
  //       id_tarif: 10,
  //       id_jenis_kamar: 4,
  //       id_season: 1,
  //       harga: 128000,
  //     },
  //     {
  //       id_tarif: 11,
  //       id_jenis_kamar: 4,
  //       id_season: 2,
  //       harga: 130000,
  //     },
  //     {
  //       id_tarif: 12,
  //       id_jenis_kamar: 4,
  //       id_season: 3,
  //       harga: 75000,
  //     },
  //     {
  //       id_tarif: 13,
  //       id_jenis_kamar: 5,
  //       id_season: 1,
  //       harga: 90000,
  //     },
  //     {
  //       id_tarif: 14,
  //       id_jenis_kamar: 5,
  //       id_season: 2,
  //       harga: 600000,
  //     },
  //     {
  //       id_tarif: 15,
  //       id_jenis_kamar: 5,
  //       id_season: 3,
  //       harga: 120000,
  //     },
  //     {
  //       id_tarif: 16,
  //       id_jenis_kamar: 6,
  //       id_season: 1,
  //       harga: 600000,
  //     },
  //     {
  //       id_tarif: 17,
  //       id_jenis_kamar: 6,
  //       id_season: 2,
  //       harga: 90000,
  //     },
  //     {
  //       id_tarif: 18,
  //       id_jenis_kamar: 6,
  //       id_season: 3,
  //       harga: 120000,
  //     },
  //   ],
  // });

  // await prisma.booking.createMany({
  //   data: [
  //     {
  //       id_booking: "2",
  //       id_customer: 2,
  //       id_pegawai: null,
  //       tanggal_booking: new Date("2023-09-19"),
  //       tanggal_check_in: new Date("2023-09-11T11:00:00.000Z"),
  //       tanggal_check_out: new Date("2023-09-28T10:00:00.000Z"),
  //       tamu_dewasa: 2,
  //       tamu_anak: 8,
  //       tanggal_pembayaran: new Date("2023-09-20"),
  //       jenis_booking: "Personal",
  //       status_booking: null,
  //     },
  //     {
  //       id_booking: "1",
  //       id_customer: 1,
  //       id_pegawai: null,
  //       tanggal_booking: new Date("2023-09-19"),
  //       tanggal_check_in: new Date("2023-09-26T19:00:00.000Z"),
  //       tanggal_check_out: new Date("2023-09-28T09:00:00.000Z"),
  //       tamu_dewasa: 1,
  //       tamu_anak: 4,
  //       tanggal_pembayaran: new Date("2023-09-20"),
  //       jenis_booking: "Personal",
  //       status_booking: null,
  //     },
  //     {
  //       id_booking: "3",
  //       id_customer: 3,
  //       id_pegawai: 2,
  //       tanggal_booking: new Date("2023-09-19"),
  //       tanggal_check_in: new Date("2023-09-28T15:00:00.000Z"),
  //       tanggal_check_out: new Date("2023-09-30T11:00:00.000Z"),
  //       tamu_dewasa: 6,
  //       tamu_anak: 2,
  //       tanggal_pembayaran: new Date("2023-09-20"),
  //       jenis_booking: "Group",
  //       status_booking: null,
  //     },
  //     {
  //       id_booking: "4",
  //       id_customer: 3,
  //       id_pegawai: 2,
  //       tanggal_booking: new Date("2023-09-19"),
  //       tanggal_check_in: new Date("2023-09-24T15:00:00.000Z"),
  //       tanggal_check_out: new Date("2023-09-26T15:00:00.000Z"),
  //       tamu_dewasa: 6,
  //       tamu_anak: 2,
  //       tanggal_pembayaran: new Date("2023-09-20"),
  //       jenis_booking: "Group",
  //       status_booking: null,
  //     },
  //   ],
  // });

  // await prisma.detail_booking_kamar.createMany({
  //   data: [
  //     {
  //       id_detail_booking_kamar: 1,
  //       id_booking: "4",
  //       id_jenis_kamar: 1,
  //       jumlah: 4,
  //       sub_total: 480000,
  //     },
  //     {
  //       id_detail_booking_kamar: 2,
  //       id_booking: "2",
  //       id_jenis_kamar: 3,
  //       jumlah: 8,
  //       sub_total: 480000,
  //     },
  //   ],
  // });

  // await prisma.detail_ketersediaan_kamar.createMany({
  //   data: [
  //     {
  //       id_ketersediaan_kamar: 1,
  //       id_kamar: 1,
  //       id_detail_booking_kamar: 1,
  //     },
  //     {
  //       id_ketersediaan_kamar: 2,
  //       id_kamar: 2,
  //       id_detail_booking_kamar: 1,
  //     },
  //     {
  //       id_ketersediaan_kamar: 3,
  //       id_kamar: 2,
  //       id_detail_booking_kamar: 1,
  //     },
  //     {
  //       id_ketersediaan_kamar: 4,
  //       id_kamar: 12,
  //       id_detail_booking_kamar: 1,
  //     },
  //     {
  //       id_ketersediaan_kamar: 5,
  //       id_kamar: 13,
  //       id_detail_booking_kamar: 1,
  //     },
  //   ],
  // });

  // const result = await prisma.booking.findFirst({
  //   select: {
  //     detail_booking_kamar: {
  //       select: {
  //         jenis_kamar: {
  //           select: {
  //             tarif: {
  //               select: { harga: true },
  //               where: {
  //                 id_jenis_kamar: 3,
  //                 AND: {
  //                   season: {
  //                     tanggal_mulai: {
  //                       lte: new Date("2023-09-11"),
  //                     },
  //                     tanggal_selesai: {
  //                       gte: new Date("2023-09-11"),
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  //   const result = await prisma.$queryRaw`
  //   SELECT t.harga, s.nama_season, t.id_jenis_kamar
  //   FROM booking b
  //   JOIN detail_booking_kamar dbk ON b.id_booking = dbk.id_booking
  //   JOIN jenis_kamar jk ON dbk.id_jenis_kamar = jk.id_jenis_kamar
  //   JOIN tarif t ON jk.id_jenis_kamar = t.id_jenis_kamar
  //   JOIN season s ON t.id_season = s.id_season
  //   WHERE b.tanggal_check_in BETWEEN s.tanggal_mulai AND s.tanggal_selesai
  //   AND t.id_jenis_kamar = 3
  // `;

  // async function getLayananHarga(id_fasilitas, jumlah) {
  //   try {
  //     const result = await prisma.layanan.findFirst({
  //       select: {
  //         harga: true,
  //       },
  //       where: {
  //         id_fasilitas: id_fasilitas,
  //       },
  //     });

  //     return result.harga * jumlah;
  //   } catch (error) {
  //     throw new Error("Gagal mengambil data layanan:", error);
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

  // await prisma.detail_booking_layanan.createMany({
  //   data: [
  //     {
  //       id_detail_booking_layanan: 1,
  //       id_fasilitas: 1,
  //       id_booking: "1",
  //       jumlah: 2,
  //       sub_total: await getLayananHarga(1, 2),
  //       tanggal: new Date("2023-09-26"),
  //     },
  //     {
  //       id_detail_booking_layanan: 2,
  //       id_fasilitas: 3,
  //       id_booking: "2",
  //       jumlah: 4,
  //       sub_total: await getLayananHarga(3, 4),
  //       tanggal: new Date("2023-09-11"),
  //     },
  //     {
  //       id_detail_booking_layanan: 3,
  //       id_fasilitas: 2,
  //       id_booking: "3",
  //       jumlah: 4,
  //       sub_total: await getLayananHarga(2, 2),
  //       tanggal: new Date("2023-09-28"),
  //     },
  //     {
  //       id_detail_booking_layanan: 4,
  //       id_fasilitas: 4,
  //       id_booking: "3",
  //       jumlah: 3,
  //       sub_total: await getLayananHarga(4, 3),
  //       tanggal: new Date("2023-09-24"),
  //     },
  //   ],
  // });

  // async function getPajak(id_booking) {
  //   try {
  //     const result = await prisma.detail_booking_layanan.findMany({
  //       select: {
  //         sub_total: true,
  //       },
  //       where: {
  //         id_booking: id_booking,
  //       },
  //     });

  //     let total = 0;
  //     result.forEach((item) => {
  //       total += item.sub_total;
  //     });

  //     return total * 0.1;
  //   } catch (error) {
  //     throw new Error("Gagal mengambil data layanan:", error);
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

  // async function getTotalMalam(id_booking) {
  //   try {
  //     const result = await prisma.$queryRaw`
  //     SELECT
  //       (DATE_PART('day', tanggal_check_out - tanggal_check_in) +
  //       CASE WHEN DATE_PART('hour', tanggal_check_out - tanggal_check_in) >= 12 THEN 1 ELSE 0 END
  //       + CASE WHEN DATE_PART('hour', tanggal_check_out) >= 12 THEN 1 ELSE 0 END) AS jumlah_malam
  //     FROM booking
  //     WHERE id_booking = ${id_booking};
  //   `;

  //     return result[0].jumlah_malam;
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

  // async function getTotalJaminan(id_booking) {
  //   try {
  //     const result = await prisma.detail_booking_kamar.findFirst({
  //       select: {
  //         sub_total: true,
  //       },
  //       where: {
  //         id_booking: id_booking,
  //       },
  //     });

  //     // let total = 0;
  //     // result.forEach((item) => {
  //     //   total += item.sub_total;
  //     // });

  //     return result.sub_total * (await getTotalMalam(id_booking));
  //   } catch (error) {
  //     throw new Error("Gagal mengambil data layanan:", error);
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

  // await prisma.invoice.createMany({
  //   data: [
  //     {
  //       id_invoice: "P300118-025",
  //       id_booking: "2",
  //       tanggal_pelunasan: new Date(),
  //       total_pajak: await getPajak("2"),
  //       jumlah_jaminan: await getTotalJaminan("2"),
  //       total_pembayaran: (await getPajak("2")) + (await getTotalJaminan("2")),
  //       nama_pic_fo: "FO Santoso",
  //     },

  //     {
  //       id_invoice: "G300100-003",
  //       id_booking: "4",
  //       tanggal_pelunasan: new Date(),
  //       total_pajak: await getPajak("4"),
  //       jumlah_jaminan: await getTotalJaminan("4"),
  //       total_pembayaran: (await getPajak("4")) + (await getTotalJaminan("4")),
  //       nama_pic_fo: "FO Santoso",
  //     },
  //   ],
  // });

  // await prisma.booking.updateMany({
  //   where: {
  //     id_booking: {
  //       in: ["2", "4"],
  //     },
  //   },
  //   data: {
  //     status_booking: "Check Out",
  //   },
  // });

  // const result = await prisma.kamar.findMany({
  //   where: {
  //     id_jenis_kamar: 1,
  //     NOT: {
  //       detail_ketersediaan_kamar: {
  //         some: {
  //           detail_booking_kamar: {
  //             booking: {
  //               AND: [
  //                 { tanggal_check_in: { lte: "2022-11-28T00:00:00.000Z" } },
  //                 { tanggal_check_out: { gte: "2022-11-06T00:00:00.000Z" } },
  //               ],
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // const result2 = await prisma.kamar.findMany({
  //   where: {
  //     id_jenis_kamar: 1,
  //     detail_ketersediaan_kamar: {
  //       some: {
  //         status: "Canceled",
  //       },
  //     },
  //   },
  // });

  const result = await prisma.kamar.findMany({
    where: {
      id_jenis_kamar: 1,
      OR: [
        {
          NOT: {
            detail_ketersediaan_kamar: {
              some: {
                detail_booking_kamar: {
                  booking: {
                    AND: [
                      { tanggal_check_in: { lte: "2022-11-28T00:00:00.000Z" } },
                      {
                        tanggal_check_out: { gte: "2022-11-06T00:00:00.000Z" },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          detail_ketersediaan_kamar: {
            some: {
              status: "Canceled",
            },
          },
        },
      ],
    },
  });

  console.log(await result);
  // console.log(await result2);
  console.log(new Date());

  console.log("Seed data created successfully!");
  console.log(await getPajak("1"));
  console.log(await getTotalJaminan("2"));
  console.log(await getTotalMalam("4"));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
