import Joi from "joi";

const createLaporanJumlahTamuValidation = Joi.object({
  tahun: Joi.number().positive().default(2023).required(),
  bulan: Joi.number().min(0).max(12).default(10).optional(),
});

export { createLaporanJumlahTamuValidation };
