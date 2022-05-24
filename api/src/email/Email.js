const nodemailer = require("nodemailer");

class Email{
    async sendEmail(user) {
        const accountTest = await nodemailer.createTestAccount();
        const transport = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          auth: accountTest,
        });
        const info = await transport.sendMail(this);
        console.log(nodemailer.getTestMessageUrl(info));
}

}
module.exports = Email