const {PostsModels } = require('../models');
const { InvalidArgumentError, InternalServerError } = require('../err/err');

module.exports = {
  adds: async (req, res) => {
    console.log(req.body)
    try {
      const post = new PostsModels(req.body);
      await post.adds();

      res.status(201).send(post);
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
    try {
      const posts = await PostsModels.list();
      res.send(posts);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  },
};
