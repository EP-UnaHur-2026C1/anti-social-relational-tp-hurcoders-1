const Joi = require('joi');

const createSchema = Joi.object({
  nickName: Joi.string().trim().required().min(1).messages({
    'any.required': 'nickName es requerido',
    'string.empty': 'nickName no puede estar vacío'
  })
});

const updateSchema = Joi.object({
  nickName: Joi.string().trim().required().min(1).messages({
    'string.empty': 'nickName no puede estar vacío'
  })
}).min(1);

module.exports = { createSchema, updateSchema };
