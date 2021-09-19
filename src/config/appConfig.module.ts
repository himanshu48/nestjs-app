import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { validate } from './env.validation';
import { AppConfigService } from './appConfig.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      validate,
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [AppConfigModule],
})
export class AppConfigModule {}
