const { UserModels } = require('../models');
const { InvalidArgumentError, InternalServerError } = require('../err');
const { access, refresh, checkEmail } = require('../token');
const { EmailVerification } = require('../email');

module.exports = {
  async adds(req, res) {
    const { name, email, password } = req.body;
    try {
      const user = new UserModels({
        name,
        email,
        password,
        emailVerified: false,
      });
      await user.adds();
      const tokenEmail = checkEmail.create(user);
      const emailVerification = new EmailVerification(user, tokenEmail);
      emailVerification.sendEmail().catch(console.log());

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

  async verifyEmail(req, res) {
    try {
      const { user } = req;
      await user.emailValidity();
      res.status(200).json();
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async login(req, res) {
    try {
      const accesstoken = access.create(req.user);
      const refreshToken = await refresh.create(req.user);
      console.log(refreshToken);
      res.set('authorization', accesstoken).status(200);
      res.json(refreshToken);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async logout(req, res) {
    try {
      const { token } = req;
      await access.invalid(token);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async list(__, res) {
    const user = await UserModels.list();
    res.status(200).json(user);
  },
  async remove(req, res) {
    const user = await UserModels.searchByID(req.params.id);
    try {
      await user.remove();
      res.status(200).json();
    } catch (err) {
      res.status(500).json({ err });
    }
  },
};
