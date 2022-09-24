import { Global, Module } from '@nestjs/common';
import { UserController } from '@modules/user/controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@modules/user/schemas';
import {
  UserService,
  ExternalUserService,
  InternalUserService,
} from '@modules/user/services';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, InternalUserService, ExternalUserService],
  exports: [ExternalUserService],
})
export class UserModule {}
