const schemaValidator = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        errores: result.error.details.map((e) => ({
          atributo: e.path.join('.'),
          error: e.message
        }))
      });
    }
    req.body = result.value;
    next();
  };
};

module.exports = schemaValidator;
