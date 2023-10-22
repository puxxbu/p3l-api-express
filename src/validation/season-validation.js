import Joi from "joi";

const createSeasonValidation = Joi.object({
  nama_season: Joi.string().required(),
  tanggal_mulai: Joi.date().required(),
  tanggal_selesai: Joi.date().required(),
});

const searchSeasonValidation = Joi.object({
  page: Joi.number().positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  nama_season: Joi.string().optional(),
  tanggal_mulai: Joi.date().optional(),
  tanggal_selesai: Joi.date().optional(),
});

export { createSeasonValidation, searchSeasonValidation };
