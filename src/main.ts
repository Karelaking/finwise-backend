import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
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
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Error during app bootstrap:', err);
  process.exit(1);
});
