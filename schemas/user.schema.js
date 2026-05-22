const Joi = require('joi');

const createSchema = Joi.object({
  nick_Name: Joi.string().trim().required().min(1).messages({
    'any.required': 'nick_Name es requerido',
    'string.empty': 'nick_Name no puede estar vacío'
  })
});

const updateSchema = Joi.object({
  nick_Name: Joi.string().trim().required().min(1).messages({
    'string.empty': 'nick_Name no puede estar vacío'
  })
}).min(1);

module.exports = { createSchema, updateSchema };
