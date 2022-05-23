const { PostsModels } = require('../models');
const { InvalidArgumentError, InternalServerError } = require('../err');

module.exports = {
  async adds(req, res) {
    try {
      const post = new PostsModels(req.body);
      await post.adds();

      res.status(201).json(post);
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

  async list(__, res) {
    try {
      const posts = await PostsModels.list();
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  },
};
