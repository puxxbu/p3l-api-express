import Joi from "joi";

const searchKamarValidation = Joi.object({
  page: Joi.number().positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  kamar_attribute: Joi.string().optional(),
  tanggal_check_in: Joi.string().optional(),
});

export { searchKamarValidation };
