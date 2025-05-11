const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.smtp_host,
      port: process.env.smtp_port,
      secure: true,
      auth: {
        user: process.env.smtp_user,
        pass: process.env.smtp_password,
      },
      connectionTimeout: 10000, // 10 секунд
      greetingTimeout: 10000,
      logger: true,
      debug: true,
    });
  }
  async sendActivationMail(to, link) {
    try {
      await this.transporter.sendMail({
        from: process.env.smtp_user,
        to,
        subject: "Активация аккаунта на " + process.env.API_URL,
        text: "",
        html: `
                   <div>
                      <h1>Для активации перейдите по ссылке</h1>
                      <a href="${link}">${link}</a>
                   </div>
                `,
      });
      console.log(`Mail sent to ${to}: ${link}`);
    } catch (error) {
      console.error(`Failed to send mail: ${error.message}`);
      throw error;
    }
  }
}
module.exports = new MailService();
