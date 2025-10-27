import { Module } from '@nestjs/common';
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
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60, limit: 100 }],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot({ global: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
