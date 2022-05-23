const { UserModels } = require('../models');
const { InvalidArgumentError, InternalServerError } = require('../err');
const {createTokenJWT,createOpaqueToken} = require('../token');
const blacklist = require('../../redis/manipulateBlacklist');

module.exports = {
  async adds(req, res){
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

  async login(req, res){
    try{
      const accesstoken = createTokenJWT(req.user);
      const refreshToken = createOpaqueToken(req.user)
      console.log(refreshToken)
      res.set('authorization', accesstoken)
        .status(204)
        .json({refreshToken});
    }catch(err){
      res.status(500).json({erro:err.message})
    }

  },

  async logout(req, res){
    try {
      const { token } = req;
      await blacklist.adds(token);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async list(__, res){
    const user = await UserModels.list();
    res.status(200).json(user);
  },
  async remove(req, res){
    const user = await UserModels.searchByID(req.params.id);
    try {
      await user.remove();
      res.status(200).json();
    } catch (err) {
      res.status(500).json({ err });
    }
  },
};
