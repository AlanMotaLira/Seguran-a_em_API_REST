const { UserModels } = require('../models');
const { InvalidArgumentError, InternalServerError } = require('../err');

module.exports = {
  adds: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = new UserModels({
        name,
        email,
        password,
      });

      await user.adds();

      res.status(201).json({ message: 'Usuario criado' });
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  list: async (__, res) => {
    const user = await UserModels.list();
    res.json(user);
  },

  remove: async (req, res) => {
    const user = await UserModels.searchByID(req.params.id);
    try {
      await user.remove();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro });
    }
  },
};
