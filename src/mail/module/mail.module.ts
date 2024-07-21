import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { MailService } from "../service/mail.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [MailerModule, ConfigModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
