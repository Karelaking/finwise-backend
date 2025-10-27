import session from 'express-session';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { config } from './config/config';
import { NestFactory } from '@nestjs/core';
import { corsConfig } from './config/cors.config';
import  consoleLoggerConfig  from './config/logger.config';
import { ConsoleLogger, VersioningType } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
      logger: new ConsoleLogger(consoleLoggerConfig)
    });
  app.enableCors(corsConfig);
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: config.server.api_prefix,
  });
  app.use(
    session({
      resave: config.session.resave,
      secret: config.session.secret,
      saveUninitialized: config.session.saveUninitialized,
    }),
  );
  await app.listen(config.server.port ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Error during app bootstrap:', err);
  process.exit(1);
});
