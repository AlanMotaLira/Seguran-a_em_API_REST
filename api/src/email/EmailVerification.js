const Email = require('./Email');

class EmailVerification extends Email {
  constructor(user, token) {
    super();
    this.route = '/user/verify_email/';
    this.address = super.generateAddress(token);
    this.from = '"Blog"<roreplay@blog.com.br>';
    this.to = user.email;
    this.subject = 'Verificação de email';
    (this.text = `Olá ${user.name}!
    Este é um email de validação do Blog!
    Verifique seu email aqui:${this.address}`),
    (this.html = `
        <h1>Olá ${user.name}!</h1>
        <p>Este é um email de validação do Blog!</p>
        <p>Verifique seu email<a href="${this.address}">clicando aqui</a></p>
        `);
  }
}
module.exports = EmailVerification;
