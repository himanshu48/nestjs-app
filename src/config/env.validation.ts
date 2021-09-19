import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsNumber()
  PORT!: number;

  @IsNumber()
  JWT_EXPIRATION_TIME!: number;

  @IsNumber()
  DATABASE_PORT!: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    validationError: {
      target: false,
    },
  });

  if (errors.length > 0) {
    // throw new Error(errors.toString());
    console.log(errors);
  }
  return validatedConfig;
}
