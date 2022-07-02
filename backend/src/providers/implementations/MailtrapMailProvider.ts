import { IMailProvider, IMessage } from '../IMailProvider';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '015620384329c1',
    pass: '7c3b21368d3fea',
  },
});

export class MailtrapMailProvider implements IMailProvider {
  async sendMail(message: IMessage): Promise<void> {
    await transport.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
