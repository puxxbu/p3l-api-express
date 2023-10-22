import Joi from "joi";

const createFasilitasValidation = Joi.object({
  nama_layanan: Joi.string().required(),
  harga: Joi.number().required(),
});

const searchFasilitasValidation = Joi.object({
  page: Joi.number().positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  nama_layanan: Joi.string().optional(),
  harga: Joi.number().optional(),
});

export { createFasilitasValidation, searchFasilitasValidation };
