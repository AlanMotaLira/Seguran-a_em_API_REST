const { UserModels } = require("../models");
const { InvalidArgumentError, InternalServerError } = require("../err");
const createTokenJWT = require("../token");
const blacklist = require("../../redis/manipulateBlacklist");

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
    const token = createTokenJWT(req.user);
    res
      .set("authorization", token)
      .status(204)
      .json({ message: "Usuario criado" });
  },

  logout: async (req, res) => {
    try {
      const token = req.token;
      await blacklist.adds(token);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  list: async (__, res) => {
    const user = await UserModels.list();
    res.status(200).json(user);
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
