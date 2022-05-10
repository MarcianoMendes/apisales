import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface IEmailContact {
  name: string;
  email: string;
}

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

interface ISendMail {
  to: IEmailContact;
  from?: IEmailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const accout = await nodemailer.createTestAccount();
    const mailTemplate = new HandlebarsMailTemplate();
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
      from: {
        name: from?.name || 'Equipe API vendas',
        address: from?.email || 'equipe@apisales.com',
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
