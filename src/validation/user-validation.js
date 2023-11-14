import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().max(100).required(),
  id_role: Joi.number().required(),
});

const dataCustomerValidation = Joi.object({
  jenis_customer: Joi.string().max(100).optional(),
  nama: Joi.string().max(100).required(),
  nomor_identitas: Joi.string().max(100).required(),
  nomor_telepon: Joi.string().max(12).required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  tanggal_dibuat: Joi.date().optional(),
  nama_institusi: Joi.string().max(100).optional(),
  alamat: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).optional(),
  name: Joi.string().max(100).optional(),
});

const searchUserValidation = Joi.object({
  page: Joi.number().positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  id_customer: Joi.string().optional(),
});

const searchGroupValidation = Joi.object({
  page: Joi.number().positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
});

export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
  dataCustomerValidation,
  searchUserValidation,
  searchGroupValidation,
};
