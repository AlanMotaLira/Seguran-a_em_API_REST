const nodemailer = require("nodemailer");

async function sendEmail(user) {
  const accountTest = await nodemailer.createTestAccount();
  const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    auth: accountTest,
  });
  const info = await transport.sendMail({
    from: '"Blog"<roreplay@blog.com.br>',
    to: user.email,
    subject: "Teste de email",
    text: `Óla! Este é um email de teste, enviado para ${user.name}!`,
    html: "<h1>Olá!</h1><p>Este é um email de teste!</p>",
  });
  console.log(nodemailer.getTestMessageUrl(info));
}
module.exports = sendEmail
