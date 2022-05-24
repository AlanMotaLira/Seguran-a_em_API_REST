const nodemailer = require('nodemailer');

class Email {
  async sendEmail() {
    const config = await configEmail()
    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(this);
    if(!process.env.NODE_ENV){
      console.log(nodemailer.getTestMessageUrl(info));
    }
  }

  generateAddress(token) {
    const URL = process.env.BASE_URL;
    console.log(URL);
    return `${URL}${this.route}${token}`;
  }
}

async function configEmail(){
  if(process.env.NODE_ENV ==='production'){
    return {
      host: process.env.EMAIL_HOST,
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
      },
      secure:true
    }

  }else{
    const accountTest = await nodemailer.createTestAccount();
    return {
      host: 'smtp.ethereal.email',
      auth: accountTest,
    }
  }
}
module.exports = Email;
