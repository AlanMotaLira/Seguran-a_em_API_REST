const { UserModels } = require("../models");
const { InvalidArgumentError, InternalServerError } = require("../err");
const createTokenJWT = require('../token')


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

      res.status(201).json({ message: "Usuario criado" });
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

  login: async (req, res) => {
    const token = createTokenJWT(req.user)
    res.set('authorization',token).status(204).json({ message: "Usuario criado" });
  },

  list: async (__, res) => {
    const user = await UserModels.list();
    res.status(200).json(user);
  },

  pegaId: async (req, res) => {
    const { id } = req.params;
    const user = await UserModels.searchByEmail(id);
    res.json({ name: user.name, email: user.email, senha: user.password });
  },

  remove: async (req, res) => {
    const user = await UserModels.searchByID(req.params.id);
    try {
      await user.remove();
      res.status(200).json();
    } catch (err) {
      res.status(500).json({ err });
    }
  },
};

