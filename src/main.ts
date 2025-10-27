import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { ConsoleLogger, VersioningType } from '@nestjs/common';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(): Promise<void> {
  const app: NestExpressApplication<
    Server<typeof IncomingMessage, typeof ServerResponse>
    > = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: new ConsoleLogger({
        colors: true,
        timestamp: true,
        context: 'FinwiseApp',
      })
    });
  app.enableCors();
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v1',
  });
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Error during app bootstrap:', err);
  process.exit(1);
});
