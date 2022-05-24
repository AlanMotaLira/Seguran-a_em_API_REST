const nodemailer = require("nodemailer");

class Email {
  async sendEmail() {
    const accountTest = await nodemailer.createTestAccount();
    const transport = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      auth: accountTest,
    });
    const info = await transport.sendMail(this);
    console.log(nodemailer.getTestMessageUrl(info));
  }
  generateAddress(rota, id) {
    const URL = process.env.BASE_URL;
    console.log(URL)
    return `${URL}${rota}${id}`;
  }
}
module.exports = Email;
