import nodemailer from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
}

export default class EtherealMail {
  static async sendMail({ to, body }: ISendMail): Promise<void> {
    const accout = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: accout.smtp.host,
      port: accout.smtp.port,
      secure: accout.smtp.secure,
      auth: {
        user: accout.user,
        pass: accout.pass,
      },
    });

    const message = await transporter.sendMail({
      from: 'equipe@sales.com.br',
      to,
      subject: 'Recuperação de Senha',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
