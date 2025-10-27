// clerk/clerk.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClerkService } from './clerk.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [ClerkService],
  exports: [ClerkService],
})
export class ClerkModule {}
