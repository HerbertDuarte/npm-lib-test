import { IsString, IsNotEmpty, IsNumberString } from "class-validator";

export class MailEnv {
    @IsString()
    @IsNotEmpty()
    SMTP_HOST: string;

    @IsNumberString()
    @IsNotEmpty()
    SMTP_PORT: number;

    @IsString()
    @IsNotEmpty()
    SMTP_USER: string;

    @IsString()
    @IsNotEmpty()
    SMTP_PASS: string;

    @IsString()
    @IsNotEmpty()
    DEFAULT_MAIL_FROM: string;
}
