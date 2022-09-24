import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { User, UserDocument } from '@modules/user/schemas';
import { SharedService } from '@modules/shared/services';
import { NotAcceptable } from '@modules/shared/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly sharedService: SharedService,
  ) {}

  /**
   * Fetches a user by _id
   * @param {string} id
   * @returns {Promise<UserDocument>} queried user data
   */
  async findOne(id: string): Promise<LeanDocument<any>> {
    try {
      this.sharedService.validateObjectId(id);

      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotAcceptable('User not found');
      }

      // remove password from response
      const userRes = user.toObject();
      delete userRes.password;

      return userRes;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Fetch all users from db
   * @returns {Promise<UserDocument[]>} queried user data
   */
  async findAll(): Promise<UserDocument[]> {
    try {
      return this.userModel.find().exec();
    } catch (e) {
      throw e;
    }
  }
}
