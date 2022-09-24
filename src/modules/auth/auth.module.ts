import { Global, Module } from '@nestjs/common';
import { AuthService, InternalAuthService } from '@modules/auth/services';
import { AuthController } from '@modules/auth/controllers';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppConfigModule } from '@modules/config/config.module';
import { AppConfigService } from '@modules/config/services';
import { JwtStrategy } from '@modules/auth/strategy';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        secretOrPrivateKey: configService.secretKey,
        signOptions: { expiresIn: configService.expirationTime },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, InternalAuthService, JwtStrategy],
})
export class AuthModule {}
