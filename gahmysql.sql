--
-- MySQL database dump
-- Dumped from database version 16beta1 (Debian 16beta1-2.pgdg120+1)
-- Dumped by pg_dump version 16beta1 (Debian 16beta1-2.pgdg120+1)

SET @@session.sql_mode = '';
SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE akun (
id_akun int(11) NOT NULL,
id_role int(11) NOT NULL,
username varchar(255) NOT NULL,
password varchar(255) NOT NULL,
PRIMARY KEY (id_akun)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE booking (
id_booking varchar(100) NOT NULL,
id_customer int(11) NOT NULL,
id_pegawai int(11),
tanggal_booking date NOT NULL,
tanggal_check_in datetime(0),
tanggal_check_out datetime(0),
tamu_dewasa int(11),
tamu_anak int(11),
tanggal_pembayaran date,
jenis_booking varchar(255),
status_booking varchar(100),
PRIMARY KEY (id_booking)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE customer (
id_customer int(11) NOT NULL,
id_akun int(11),
jenis_customer varchar(255) NOT NULL,
nama varchar(255) NOT NULL,
nomor_identitas varchar(255) NOT NULL,
nomor_telepon varchar(255) NOT NULL,
email varchar(255) NOT NULL,
alamat varchar(255) NOT NULL,
tanggal_dibuat date NOT NULL,
nama_institusi varchar(255),
PRIMARY KEY (id_customer)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE detail_booking_kamar (
id_detail_booking_kamar int(11) NOT NULL,
id_booking varchar(100) NOT NULL,
id_jenis_kamar int(11) NOT NULL,
jumlah int(11),
sub_total int(11),
PRIMARY KEY (id_detail_booking_kamar)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE detail_booking_layanan (
id_detail_booking_layanan int(11) NOT NULL,
id_fasilitas int(11) NOT NULL,
id_booking varchar(100) NOT NULL,
jumlah int(11) NOT NULL,
sub_total int(11) NOT NULL,
tanggal date NOT NULL,
PRIMARY KEY (id_detail_booking_layanan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE detail_ketersediaan_kamar (
id_ketersediaan_kamar int(11) NOT NULL,
id_kamar int(11) NOT NULL,
id_detail_booking_kamar int(11) NOT NULL,
PRIMARY KEY (id_ketersediaan_kamar)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE invoice (
id_invoice varchar(100) NOT NULL,
id_booking varchar(100) NOT NULL,
tanggal_pelunasan date NOT NULL,
total_pajak int(11) NOT NULL,
jumlah_jaminan int(11) NOT NULL,
total_pembayaran int(11) NOT NULL,
nama_pic_fo varchar(255) NOT NULL,
PRIMARY KEY (id_invoice)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE jenis_kamar (
id_jenis_kamar int(11) NOT NULL,
jenis_kamar varchar(100) NOT NULL,
jenis_bed varchar(100) NOT NULL,
kapasitas int(11) NOT NULL,
jumlah_kasur int(11) NOT NULL,
PRIMARY KEY (id_jenis_kamar)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE kamar (
id_kamar int(11) NOT NULL,
id_jenis_kamar int(11) NOT NULL,
nomor_kamar int(11) NOT NULL,
PRIMARY KEY (id_kamar)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE layanan (
id_fasilitas int(11) NOT NULL,
nama_layanan varchar(100) NOT NULL,
harga int(11) NOT NULL,
PRIMARY KEY (id_fasilitas)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE pegawai (
id_pegawai int(11) NOT NULL,
id_akun int(11) NOT NULL,
nama_pegawai char(10) NOT NULL,
PRIMARY KEY (id_pegawai)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE role (
id_role int(11) NOT NULL,
nama_role varchar(100) NOT NULL,
PRIMARY KEY (id_role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE season (
id_season int(11) NOT NULL,
nama_season varchar(100) NOT NULL,
tanggal_mulai date NOT NULL,
tanggal_selesai date NOT NULL,
PRIMARY KEY (id_season)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tarif` (
    `id_tarif` int(11) NOT NULL,
    `id_jenis_kamar` int(11) NOT NULL,
    `id_season` int(11) NOT NULL,
    `harga` int(11) NOT NULL,
    PRIMARY KEY (`id_tarif`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `akun` (`id_akun`, `id_role`, `username`, `password`, `token`) VALUES
(10002, 1002, 'sm', 'secret', NULL),
(10003, 1003, 'fo', 'secret', NULL),
(10004, 1004, 'gm', 'secret', NULL),
(10005, 1005, 'owner', 'secret', NULL),
(20001, 2001, 'customer', 'secret', NULL),
(20002, 2001, 'customer2', 'secret', NULL),
(20003, 2001, 'customer3', 'secret', NULL),
(20004, 2001, 'customer4', 'secret', NULL),
(10001, 1001, 'admin', 'admin', NULL);

INSERT INTO `booking` (`id_booking`, `id_customer`, `id_pegawai`, `tanggal_booking`, `tanggal_check_in`, `tanggal_check_out`, `tamu_dewasa`, `tamu_anak`, `tanggal_pembayaran`, `jenis_booking`, `status_booking`) VALUES
(1, 1, NULL, '2023-09-19', '2023-09-26 19:00:00', '2023-09-28 09:00:00', 1, 4, '2023-09-20', 'Personal', NULL),
(3, 3, 2, '2023-09-19', '2023-09-28 15:00:00', '2023-09-30 11:00:00', 6, 2, '2023-09-20', 'Group', NULL),
(2, 2, NULL, '2023-09-19', '2023-09-11 11:00:00', '2023-09-28 10:00:00', 2, 8, '2023-09-20', 'Personal', 'Check Out'),
(4, 3, 2, '2023-09-19', '2023-09-24 15:00:00', '2023-09-26 15:00:00', 6, 2, '2023-09-20', 'Group', 'Check Out');

INSERT INTO `detail_booking_kamar` (`id_detail_booking_kamar`, `id_booking`, `id_jenis_kamar`, `jumlah`, `sub_total`) VALUES
(1, 4, 1, 4, 480000),
(2, 2, 3, 2, 480000);

INSERT INTO `detail_booking_layanan` (`id_detail_booking_layanan`, `id_fasilitas`, `id_booking`, `jumlah`, `sub_total`, `tanggal`) VALUES
(1, 1, 1, 2, 300000, '2023-09-26'),
(2, 3, 2, 4, 300000, '2023-09-11'),
(3, 2, 3, 4, 2000, '2023-09-28'),
(4, 4, 3, 3, 900000, '2023-09-24');

INSERT INTO `detail_ketersediaan_kamar` (`id_ketersediaan_kamar`, `id_kamar`, `id_detail_booking_kamar`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 2, 1),
(4, 12, 1),
(5, 13, 1);

INSERT INTO `invoice` (`id_invoice`, `id_booking`, `tanggal_pelunasan`, `total_pajak`, `jumlah_jaminan`, `total_pembayaran`, `nama_pic_fo`) VALUES
('P300118-025', 2, '2023-10-02', 30000, 8160000, 8190000, 'FO Santoso'),
('G300100-003', 4, '2023-10-02', 0, 1440000, 1440000, 'FO Santoso');

INSERT INTO `jenis_kamar` (`id_jenis_kamar`, `jenis_kamar`, `jenis_bed`, `kapasitas`, `jumlah_kasur`) VALUES
(1, 'Superior', 'double', 2, 1),
(2, 'Superior', 'twin', 2, 1),
(3, 'Double Deluxe', 'double', 2, 1),
(4, 'Double Deluxe', 'twin', 2, 2),
(6, 'Junior Suite', 'king', 2, 1),
(5, 'Executive Deluxe', 'king', 2, 1);

INSERT INTO `kamar` (`id_kamar`, `id_jenis_kamar`, `nomor_kamar`) VALUES
(1, 1, '101'),
(2, 1, '102'),
(3, 2, '103'),
(4, 2, '104'),
(5, 3, '105'),
(6, 3, '106'),
(7, 4, '107'),
(8, 4, '108'),
(9, 5, '109'),
(10, 5, '110'),
(11, 6, '201'),
(12, 1, '111'),
(13, 1, '112'),
(14, 2, '113'),
(15, 2, '114'),
(16, 3, '115'),
(17, 3, '116'),
(18, 4, '117'),
(19, 4, '118'),
(20, 5, '119'),
(21, 5, '120'),
(22, 6, '202');

INSERT INTO `layanan` (`id_fasilitas`, `nama_layanan`, `harga`) VALUES
(1, 'Extra Bed', 150000),
(2, 'Laundry', 1000),
(4, 'Meeting Room', 300000),
(3, 'Massage', 75000),
(5, 'Extra Breakfast', 20000);

INSERT INTO `pegawai` (`id_pegawai`, `id_akun`, `nama_pegawai`) VALUES
(1, 10001, 'AdminG'),
(2, 10002, 'SM GAMING');

INSERT INTO `role` (`id_role`, `nama_role`) VALUES
(1001, 'Admin'),
(1002, 'SM'),
(1003, 'FO'),
(1004, 'GM'),
(1005, 'Owner'),
(2001, 'Customer'),
(2002, 'Guest');


INSERT INTO `season` (`id_season`, `nama_season`, `tanggal_mulai`, `tanggal_selesai`) VALUES
(3, 'Musim Ujian', '2023-01-01', '2023-06-22'),
(2, 'Musim Dingin', '2023-09-27', '2023-11-28'),
(1, 'Musim Panas', '2023-07-12', '2023-09-25');

INSERT INTO `tarif` (`id_tarif`, `id_jenis_kamar`, `id_season`, `harga`) VALUES
(1, 1, 1, 120000),
(2, 1, 2, 75000),
(3, 1, 3, 90000),
(4, 2, 1, 30000),
(5, 2, 2, 600000),
(6, 2, 3, 130000),
(7, 3, 1, 160000),
(8, 3, 2, 200000),
(9, 3, 3, 400000),
(10, 4, 1, 128000),
(11, 4, 2, 130000),
(12, 4, 3, 75000),
(13, 5, 1, 90000),
(14, 5, 2, 600000),
(15, 5, 3, 120000),
(16, 6, 1, 600000),
(17, 6, 2, 90000),
(18, 6, 3, 120000);

INSERT INTO `customer` (`id_customer`, `id_akun`, `jenis_customer`, `nama`, `nomor_identitas`, `nomor_telepon`, `email`, `alamat`, `tanggal_dibuat`, `nama_institusi`) VALUES
(1, 20001, 'Personal', 'Pablo1', '123123', '0895123123', 'pablo@mail.com', 'Kakap No.8', '2023-09-25', NULL),
(2, 20002, 'Personal', 'Isobabat', '321321', '0876123123', 'isobabat@mail.com', 'Mino. 32', '2023-09-25', NULL),
(3, NULL, 'Group', 'Cixaaa', '333333', '1231231234', 'cixa@mail.com', 'NewZealand', '2023-09-25', NULL),
(4, NULL, 'Group', 'Puxxbu', '323232', '8821123443', 'puxxbu@mail.com', 'Japan', '2023-09-25', NULL),
(5, 20003, 'Personal', 'Pusscok', '333332', '0891112311', 'pusscok@mail.com', 'Australia', '2023-09-01', NULL);

CREATE UNIQUE INDEX `akun_pk` ON `akun` (`id_akun`);
CREATE UNIQUE INDEX `booking_pk` ON `booking` (`id_booking`);
CREATE UNIQUE INDEX `customer_pk` ON `customer` (`id_customer`);
CREATE UNIQUE INDEX `detail_booking_kamar_pk` ON `detail_booking_kamar` (`id_detail_booking_kamar`);
CREATE UNIQUE INDEX `detail_booking_layanan_pk` ON `detail_booking_layanan` (`id_detail_booking_layanan`);
CREATE UNIQUE INDEX `detail_ketersediaan_kamar_pk` ON `detail_ketersediaan_kamar` (`id_ketersediaan_kamar`);
CREATE UNIQUE INDEX `invoice_pk` ON `invoice` (`id_invoice`);
CREATE UNIQUE INDEX `jenis_kamar_pk` ON `jenis_kamar` (`id_jenis_kamar`);
CREATE UNIQUE INDEX `kamar_pk` ON `kamar` (`id_kamar`);
CREATE UNIQUE INDEX `layanan_pk` ON `layanan` (`id_fasilitas`);
CREATE UNIQUE INDEX `pegawai_pk` ON `pegawai` (`id_pegawai`);
CREATE INDEX `relationship_10_fk` ON `detail_booking_layanan` (`id_fasilitas`);
CREATE INDEX `relationship_11_fk` ON `detail_booking_layanan` (`id_booking`);
CREATE INDEX `relationship_13_fk` ON `invoice` (`id_booking`);
CREATE INDEX `relationship_16_fk` ON `pegawai` (`id_akun`);
CREATE INDEX `relationship_18_fk` ON `booking` (`id_pegawai`);
CREATE INDEX `relationship_18_fk2` ON `detail_ketersediaan_kamar` (`id_detail_booking_kamar`);
CREATE INDEX `relationship_19_fk` ON `detail_ketersediaan_kamar` (`id_kamar`);

CREATE INDEX `relationship_1_fk` ON `tarif` (`id_jenis_kamar`);
CREATE INDEX `relationship_2_fk` ON `tarif` (`id_season`);
CREATE INDEX `relationship_3_fk` ON `kamar` (`id_jenis_kamar`);
CREATE INDEX `relationship_4_fk` ON `customer` (`id_akun`);
CREATE INDEX `relationship_6_fk` ON `akun` (`id_role`);
CREATE INDEX `relationship_7_fk` ON `booking` (`id_customer`);
CREATE INDEX `relationship_8_fk` ON `detail_booking_kamar` (`id_jenis_kamar`);
CREATE INDEX `relationship_9_fk` ON `detail_booking_kamar` (`id_booking`);
CREATE UNIQUE INDEX `role_pk` ON `role` (`id_role`);
CREATE UNIQUE INDEX `season_pk` ON `season` (`id_season`);
CREATE UNIQUE INDEX `tarif_pk` ON `tarif` (`id_tarif`);

ALTER TABLE `akun` ADD CONSTRAINT `fk_akun_relations_role` FOREIGN KEY (`id_role`) REFERENCES `role`(`id_role`) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE `booking` ADD CONSTRAINT `fk_booking_relations_customer` FOREIGN KEY (`id_customer`) REFERENCES `customer`(`id_customer`) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE  `booking`
    ADD CONSTRAINT `fk_booking_relations_pegawai` FOREIGN KEY (`id_pegawai`) REFERENCES `pegawai`(`id_pegawai`) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE  `customer`
    ADD CONSTRAINT `fk_customer_relations_akun` FOREIGN KEY (`id_akun`) REFERENCES `akun`(`id_akun`) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE  `detail_booking_kamar`
    ADD CONSTRAINT `fk_detail_b_relations_booking` FOREIGN KEY (`id_booking`) REFERENCES `booking`(`id_booking`) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE  `detail_booking_layanan`
    ADD CONSTRAINT `fk_detail_b_relations_booking` FOREIGN KEY (`id_booking`) REFERENCES `booking`(`id_booking`) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE  `detail_booking_kamar`
    ADD CONSTRAINT `fk_detail_b_relations_jenis_ka` FOREIGN KEY (`id_jenis_kamar`) REFERENCES `jenis_kamar`(`id_jenis_kamar`) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE  `detail_booking_layanan`
    ADD CONSTRAINT `fk_detail_b_relations_layanan` FOREIGN KEY (`id_fasilitas`) REFERENCES `layanan`(`id_fasilitas`) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE  `detail_ketersediaan_kamar`
    ADD CONSTRAINT `fk_detail_k_relations_detail_b` FOREIGN KEY (`id_detail_booking_kamar`) REFERENCES `detail_booking_kamar`(`id_detail_booking_kamar`) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE  `detail_ketersediaan_kamar`
    ADD CONSTRAINT `fk_detail_k_relations_kamar` FOREIGN KEY (`id_kamar`) REFERENCES `kamar`(`id_kamar`) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE  `invoice`
    ADD CONSTRAINT `fk_invoice_relations_booking` FOREIGN KEY (`id_booking`) REFERENCES `booking`(`id_booking`) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE  `kamar`
    ADD CONSTRAINT `fk_kamar_relations_jenis_ka` FOREIGN KEY (`id_jenis_kamar`) REFERENCES `jenis_kamar`(`id_jenis_kamar`) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE  `pegawai`
    ADD CONSTRAINT `fk_pegawai_relations_akun` FOREIGN KEY (`id_akun`) REFERENCES `akun`(`id_akun`) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE  `tarif`
    ADD CONSTRAINT `fk_tarif_relations_jenis_ka` FOREIGN KEY (`id_jenis_kamar`) REFERENCES `jenis_kamar`(`id_jenis_kamar`) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE  `tarif`
    ADD CONSTRAINT `fk_tarif_relations_season` FOREIGN KEY (`id_season`) REFERENCES `season`(`id_season`) ON UPDATE RESTRICT ON DELETE RESTRICT;

    