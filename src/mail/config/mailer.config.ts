import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { ConfigService } from "@nestjs/config";
import { Env } from "env";
export function mailerConfig() {
  return {
    inject: [ConfigService],
    global: true,
    useFactory(config: ConfigService<Env, true>) {
      const withTemplate = config.get<boolean>("WITH_TEMPLATE");

      return {
        transport: {
          host: config.get("SMTP_HOST"),
          port: config.get<number>("SMTP_PORT"),
          auth: {
            user: config.get("SMTP_USER"),
            pass: config.get("SMTP_PASS"),
          },
        },
        defaults: {
          from: config.get("DEFAULT_MAIL_FROM"),
        },
        template: withTemplate ?? {
          dir: process.cwd() + config.get("MAIL_TEMPLATE_DIR"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      };
    },
  };
}
