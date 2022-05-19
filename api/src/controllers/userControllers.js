const {UserModels} = require('../models');
const { InvalidArgumentError, InternalServerError } = require('../err/err');

module.exports = {
  adds: async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
      const use = new UserModels({
        nome,
        email,
        senha,
      });

      await use.adds();

      res.status(201).json({message:'Usuario criado'});
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
    const use = await UserModels.list();
    res.json(use);
  },

  remove: async (req, res) => {
    const usuario = await UserModels.searchByID(req.params.id);
    try {
      await usuario.remove();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro });
    }
  },
};
