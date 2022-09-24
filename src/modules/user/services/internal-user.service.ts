import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@modules/user/schemas';

@Injectable()
export class InternalUserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
}
