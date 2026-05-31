const express = require('express');
const schemaValidator = require('./middlewares/schemaValidator');
const mw = require('./middlewares/existe.middleware');
const userSchema = require('./schemas/user.schema');
const { sequelize, User } = require('./db/models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

async function responderErrorSequelize(res, error) {
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      message: 'nickName duplicado o conflicto de unicidad.',
      errores:
        error.errors?.map((e) => ({
          atributo: e.path || e.validatorKey,
          error: e.message
        })) || []
    });
  }
  console.error(error);
  return res.status(500).json({ message: 'Error interno del servidor.' });
}

app.get('/', (req, res) => {
  res.send('UnaHur - Anti-Social net');
});

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users', schemaValidator(userSchema.createSchema), async (req, res) => {
  try {
    const creado = await User.create(req.body);
    res.status(201).json(creado);
  } catch (error) {
    await responderErrorSequelize(res, error);
  }
});

app.get(
  '/users/:id',
  mw.validaPathParameterMiddleware,
  mw.validaExisteMiddleware(User),
  async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  }
);

app.put(
  '/users/:id',
  mw.validaPathParameterMiddleware,
  mw.validaExisteMiddleware(User),
  schemaValidator(userSchema.updateSchema),
  async (req, res) => {
    try {
      const usuario = await User.findByPk(req.params.id);
      await usuario.update(req.body);
      res.json(usuario);
    } catch (error) {
      await responderErrorSequelize(res, error);
    }
  }
);

app.delete(
  '/users/:id',
  mw.validaPathParameterMiddleware,
  mw.validaExisteMiddleware(User),
  async (req, res) => {
    try {
      const usuario = await User.findByPk(req.params.id);
      await usuario.destroy();
      res.status(204).send();
    } catch (error) {
      await responderErrorSequelize(res, error);
    }
  }
);

app.listen(PORT, async (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  try {
    await sequelize.sync({ force: true });
    console.log('OK tablas User recreadas desde cero.');

    await User.bulkCreate([
      { nickName: 'usr001' },
      { nickName: 'usr002' },
      { nickName: 'usr003' }
    ]);
    console.log('OK datos iniciales de usuarios cargados.');
  } catch (dbError) {
    console.error('Error DB:', dbError.message);
    process.exit(1);
  }
  console.log(`App iniciada en el puerto ${PORT}`);
});
