import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    this.logger.log('get hello in running perfectly');
    return 'Hello from Nest';
  }
}
