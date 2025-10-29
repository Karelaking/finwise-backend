import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { clerkMiddleware } from '@clerk/express';
import { corsConfig } from './config/cors.config';
import  consoleLoggerConfig  from './config/logger.config';
import { ConsoleLogger, VersioningType } from '@nestjs/common';


const configService = new ConfigService()

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
      logger: new ConsoleLogger(consoleLoggerConfig)
    });
  app.enableCors(corsConfig);
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: configService.get<string>('server.api_prefix'),
  });
  app.use(clerkMiddleware());
  await app.listen(configService.get<number>('server.port') ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Error during app bootstrap:', err);
  process.exit(1);
});
