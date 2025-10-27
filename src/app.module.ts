import { Module } from '@nestjs/common';
import config from './config/config';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ClerkModule } from './clerk/clerk.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
