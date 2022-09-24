import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app.module';
import { AppConfigService } from '@modules/config/services';
import helmet from 'helmet';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.use(helmet());

  // Get app config for cors settings and starting the app.
  const appConfig: AppConfigService =
    app.get<AppConfigService>(AppConfigService);

  const corsOptions = {
    origin: true,
  };

  app.enableCors(corsOptions);

  await app.listen(3001);
}
bootstrap();
