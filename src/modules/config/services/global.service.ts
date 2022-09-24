import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app global variables.
 *
 * @class
 */
@Injectable()
export class GlobalService {
  constructor(private configService: ConfigService) {}
}
