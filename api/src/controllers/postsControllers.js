const {PostsModels } = require('../models');
const { InvalidArgumentError, InternalServerError } = require('../err/err');

module.exports = {
  adiciona: async (req, res) => {
    console.log(req.body)
    try {
      const post = new PostsModels(req.body);
      await post.adiciona();

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

  lista: async (req, res) => {
    try {
      const posts = await Post.lista();
      res.send(posts);
    } catch (erro) {
      return res.status(500).json({ erro });
    }
  },
};
