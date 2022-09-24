import { Module } from '@nestjs/common';
import { AppController } from '@modules/app.controller';
import { AppService } from '@modules/app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { AppConfigModule } from '@modules/config/config.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { AppConfigService } from '@modules/config/services';
import { SharedModule } from '@modules/shared/shared.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) =>
        ({
          uri: `mongodb+srv://jakhar:jakhar@cluster0.3rojdkl.mongodb.net/?retryWrites=true&w=majority`,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as MongooseModuleAsyncOptions),
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    AppConfigModule,
    SharedModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
