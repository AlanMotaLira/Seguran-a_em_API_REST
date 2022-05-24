const Email = require('./Email');

class EmailVerification extends Email {
  constructor(user,token) {
    super();
    this.route = "/user/verify_email/"
    this.address = super.generateAddress(token);
    this.from = '"Blog"<roreplay@blog.com.br>';
    this.to = user.email;
    this.subject = 'Verificação de email';
    (this.text = `Óla! Este é um email de verificação do Blog, enviado para ${user.name}! Verifique seu email aqui:${this.address}`),
    (this.html = `
        <h1>Olá!</h1>
        <p>Este é um email de verificação do Blog!</p>
        <p>Enviado para ${user.name}!</p>
        <p>Verifique seu email aqui:<a href="${this.address}">${this.address}</a></p>
        `);
  }
}
module.exports = EmailVerification;
