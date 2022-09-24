import { Global, Module } from '@nestjs/common';
import { SharedService } from '@modules/shared/services';
import { AppConfigModule } from '@modules/config/config.module';
import { AppConfigService } from '@modules/config/services';

@Global()
@Module({
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
