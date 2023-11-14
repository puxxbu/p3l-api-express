import Joi from "joi";

const searchKamarValidation = Joi.object({
  page: Joi.number().positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  kamar_attribute: Joi.string().optional(),
  tanggal_check_in: Joi.string().optional(),
});

const createBookingValidation = Joi.object({
  id_customer: Joi.number().positive().required(),
  tanggal_booking: Joi.date().required(),
  tanggal_check_in: Joi.string().required(),
  tanggal_check_out: Joi.string().required(),
  tamu_dewasa: Joi.number().required(),
  tamu_anak: Joi.number().required(),
  tanggal_pembayaran: Joi.date().optional(),
  jenis_booking: Joi.string().required(),
  status_booking: Joi.string().required(),
  id_pegawai_fo: Joi.number().positive().optional(),
  id_pegawai_sm: Joi.number().positive().optional(),
  no_rekening: Joi.string().required(),
  catatan_tambahan: Joi.string().optional(),
});

const detailFasilitasValidation = Joi.array()
  .items(
    Joi.object({
      id_fasilitas: Joi.number().positive().required(),
      jumlah: Joi.number().positive().required(),
      sub_total: Joi.number().positive().required(),
    })
  )
  .required();

const detailBookingValidation = Joi.array()
  .items(
    Joi.object({
      id_jenis_kamar: Joi.number().positive().required(),
      jumlah: Joi.number().positive().required(),
      sub_total: Joi.number().positive().required(),
    })
  )
  .required();

export {
  searchKamarValidation,
  createBookingValidation,
  detailBookingValidation,
  detailFasilitasValidation,
};
