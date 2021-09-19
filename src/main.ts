import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/appConfig.service';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as basicAuth from 'express-basic-auth';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);

  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix(configService.apiPrefix);
  app.useGlobalPipes(new ValidationPipe());

  // Swagger config

  //   app.use(basicAuth({
  //     users: { 'someuser': 'somepassword' },
  //     challenge: true,
  // }))
  const documentConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Application title')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api/v1/docs', app, document);

  LoggerService.info('Server Running', 'main.ts');
  await app.listen(configService.port);
}
bootstrap();
