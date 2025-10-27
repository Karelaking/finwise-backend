import { Module } from '@nestjs/common';
import { config } from './config/config';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [
    CacheModule.register(),
    ScheduleModule.forRoot({}),
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot({ global: true }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: config.server.rate_limit.window_ms,
          limit: config.server.rate_limit.max_requests,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
