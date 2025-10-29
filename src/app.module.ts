import config from './config/config';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ClerkModule } from './clerk/clerk.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { CommonModule } from './comman/common.module';
import { EmailService } from './comman/email.service';
import { Request, Response, NextFunction } from 'express';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Injectable, NestMiddleware } from '@nestjs/common';


@Module({
  imports: [
    CacheModule.register(),
    ScheduleModule.forRoot({}),
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    EventEmitterModule.forRoot({ global: true }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 10,
          ttl: 60000,
        },
      ],
    }),
    ClerkModule,
    UserModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
@Injectable()
export class Middleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
