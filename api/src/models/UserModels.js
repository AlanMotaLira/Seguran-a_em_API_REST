const bcrypt = require('bcrypt');
const { InvalidArgumentError } = require('../err');
const userDao = require('../dao/userDao');
const commonValidations = require('../validation/commonValidations');

class User {
  #name;

  #email;

  #passwordTemp;

  #password;

  constructor(user) {
    this.id = user.id;
    this.#name = user.name;
    this.#email = user.email;
    this.#passwordTemp = user.password;
    this.#password = user.password;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.validate(name, false, false);
    this.#name = name;
  }

  get email() {
    return this.#email;
  }

  set email(email) {
    this.validate(false, email, false);
    this.#email = email;
  }

  get password() {
    return this.#password;
  }

  set password(password) {
    this.validate(false, false, password);
    this.#password = password;
  }

  async adds() {
    if (await User.searchByEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!');
    }

    this.validate(this.name, this.email, this.#passwordTemp);
    await this.passwordHash(this.#passwordTemp);

    return userDao.adds({
      name: this.name,
      email: this.email,
      password: this.password,
    });
  }

  async passwordHash(password) {
    await User.generatePasswordHash(password).then((item) => {
      this.password = item;
    });
  }

  async remove() {
    return userDao.remove(this);
  }

  validate(name, email, password) {
    if (name) {
      commonValidations.fieldStringNotNull(name, 'name');
    }
    if (email) {
      commonValidations.fieldStringNotNull(email, 'email');
    }
    if (password) {
      commonValidations.fieldStringNotNull(password, 'password');
      commonValidations.fieldSizeMinimum(password, 'password', 8);
      commonValidations.fieldMaximumSize(password, 'password', 64);
    }
  }

  static async searchByID(id) {
    const user = await userDao.searchByID(id);
    if (!user) {
      return null;
    }

    return new User(user);
  }

  static async searchByEmail(email) {
    const user = await userDao.searchByEmail(email);
    if (!user) {
      return null;
    }

    return new User(user);
  }

  static list() {
    return userDao.list();
  }

  static generatePasswordHash(password) {
    const cHash = 12;
    return bcrypt.hash(password, cHash);
  }
}

module.exports = User;
