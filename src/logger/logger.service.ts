import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';
import { Console } from 'winston/lib/winston/transports';
import * as LogzioWinstonTransport from 'winston-logzio';

const logzioWinstonTransport = new LogzioWinstonTransport({
  level: 'info',
  name: 'winston_logzio',
  token: 'btMyTSBaMofenSoVPhPOBardrdIxzCSK',
  host: 'listener.logz.io',
  type: 'nest-app',
});

function loggerOptions(): winston.LoggerOptions {
  const logLevel = process.env.LOG_LEVEL || 'info';

  const baseOptions = {
    transports: [logzioWinstonTransport, new Console()],
    level: logLevel,
  };
  if (process.env.NODE_ENV === 'production') {
    return baseOptions;
  }
  return {
    ...baseOptions,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf((i) => `${i.timestamp} | ${i.message}`),
    ),
  };
}

const logger = winston.createLogger(loggerOptions());

@Injectable()
export class LoggerService extends Logger {
  constructor() {
    super();
  }

  static log(message: string, context?: string): void {
    logger.child({ context }).info(message);
  }

  static info(message: string, context?: string): void {
    logger.child({ context }).info(message);
  }

  static error(message: string, trace?: string, context?: string): void {
    logger.child({ context }).error(message);
  }

  static warn(message: string, context?: string): void {
    logger.child({ context }).warn(message);
  }

  static debug(message: string, context?: string): void {
    logger.child({ context }).debug(message);
  }
}
