const validaPathParameterMiddleware = (req, res, next) => {
  const id = req.params.id;
  if (
    id === undefined ||
    String(id).trim() === '' ||
    Number.isNaN(Number(id)) ||
    Number(id) !== parseInt(id, 10)
  ) {
    return res.status(400).json({ message: 'El parametro id debe ser numerico.' });
  }
  next();
};

/**
 * @template T
 * @param {import('sequelize').ModelStatic<T>} Modelo
 * @param {string} [nombreParametro='id'] clave en req.params
 */
const validaExisteMiddleware = (Modelo, nombreParametro = 'id') => {
  return async (req, res, next) => {
    const id = Number(req.params[nombreParametro]);
    const registro = await Modelo.findByPk(id);
    if (!registro) {
      return res.status(404).json({
        message: `El id ${id} en modelo ${Modelo.name} no existe`
      });
    }
    next();
  };
};

module.exports = {
  validaPathParameterMiddleware,
  validaExisteMiddleware
};
