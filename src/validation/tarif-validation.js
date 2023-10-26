import Joi from "joi";

const createTarifValidation = Joi.object({
  id_jenis_kamar: Joi.number().positive().required(),
  id_season: Joi.number().positive().required(),
  harga: Joi.number().positive().required(),
});

const searchTarifValidation = Joi.object({
  page: Joi.number().positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  tarif_attribute: Joi.string().optional(),
});

export { createTarifValidation, searchTarifValidation };
