import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Env } from "env";
import { EmailSendingException } from "../exceptions/email-sending-exception";
import { IMailService, MailProps } from "./mail.service.interface";

@Injectable()
export class MailService implements IMailService {
  private logger = new Logger("MailService");
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService<Env, true>,
  ) {}

  async send<T>({
    title,
    args,
    templateFileName,
    to,
  }: MailProps<T>): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: to,
        from: this.configService.get<string>("DEFAULT_MAIL_FROM"),
        subject: title,
        template: templateFileName,
        context: args,
      });
    } catch (error) {
      this.logger.error(error);
      throw new EmailSendingException();
    }
  }
}
