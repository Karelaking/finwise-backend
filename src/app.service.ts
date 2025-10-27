import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
  getHello(): string {
    this.logger.log('getHello method called');
    return 'Hello World!';
  }
}
