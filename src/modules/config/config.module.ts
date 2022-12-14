import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AppConfigService, GlobalService } from '@modules/config/services';
import configuration from './constants/configuration';
import global from './constants/global';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration, global],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('MyApp'),
        APP_ENV: Joi.string()
          .valid('development', 'production', 'staging', 'provision')
          .default('development'),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'staging', 'provision')
          .default('development'),
        APP_URL: Joi.string().default('http://localhost:3001'),
        APP_PORT: Joi.number().default(3001),
        WEBTOKEN_SECRET_KEY: Joi.string(),
        WEBTOKEN_EXPIRATION_TIME: Joi.number().default(526000),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService, GlobalService],
  exports: [ConfigService, AppConfigService, GlobalService],
})
export class AppConfigModule {}
