import { Injectable } from '@nestjs/common';
import { AppConfigService } from '@modules/config/services';

@Injectable()
export class AppService {
  constructor(private configService: AppConfigService) {}

  getHello(): string {
    return 'Welcome to Veditri';
  }
}
