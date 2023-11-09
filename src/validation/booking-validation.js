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
  tanggal_check_in: Joi.date().required(),
  tanggal_check_out: Joi.date().required(),
  tamu_dewasa: Joi.number().positive().required(),
  tamu_anak: Joi.number().positive().required(),
  tanggal_pembayaran: Joi.date().required(),
  jenis_booking: Joi.string().required(),
  status_booking: Joi.string().required(),
  no_rekening: Joi.string().required(),
  catatan_tambahan: Joi.string().optional(),
});

const detailBookingValidation = Joi.object({
  detail_booking: Joi.array()
    .items(
      Joi.object({
        id_booking: Joi.string().required(),
        id_jenis_kamar: Joi.number().positive().required(),
        jumlah: Joi.number().positive().required(),
        sub_total: Joi.number().positive().required(),
      })
    )
    .required(),
});

export {
  searchKamarValidation,
  createBookingValidation,
  detailBookingValidation,
};
