import Joi from "joi";

const createJenisKamarValidation = Joi.object({
  jenis_kamar: Joi.string().required(),
  jenis_bed: Joi.string().required(),
  kapasitas: Joi.number().required(),
  jumlah_kasur: Joi.number().required(),
});

const searchJenisKamarValidation = Joi.object({
  page: Joi.number().positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  jenis_kamar: Joi.string().optional(),
  jenis_bed: Joi.string().optional(),
  kapasitas: Joi.number().optional(),
  jumlah_kasur: Joi.number().optional(),
});

const showAvailabilityValidation = Joi.object({
  id_jenis_kamar: Joi.number().positive().required(),
  tanggal_check_in: Joi.string().required(),
  tanggal_check_out: Joi.string().required(),
});

export {
  createJenisKamarValidation,
  searchJenisKamarValidation,
  showAvailabilityValidation,
};
