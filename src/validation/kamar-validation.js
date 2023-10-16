import Joi from "joi";

const createKamarValidation = Joi.object({
  nomor_kamar: Joi.number().positive().required(),
  id_jenis_kamar: Joi.number().positive().required(),
});

const searchKamarValidation = Joi.object({
  page: Joi.number().positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  nomor_kamar: Joi.number().positive().required(),
});

export { createKamarValidation, searchKamarValidation };
