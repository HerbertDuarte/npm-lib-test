import { plainToClass } from "class-transformer";
import {
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
  IsString,
  validateSync,
} from "class-validator";
import { InvalidEnvironmentException } from "./exceptions/InvalidEnvException";

export class Env {
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

  @IsString()
  @IsNotEmpty()
  MAIL_TEMPLATE_DIR: string;

  @IsBooleanString()
  @IsNotEmpty()
  WITH_TEMPLATE: boolean;
}

export function validateEnv(config: Record<string, any>) {
  const envConfig = plainToClass(Env, config);
  const errors = validateSync(envConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new InvalidEnvironmentException(errors.toString());
  }

  return envConfig;
}
