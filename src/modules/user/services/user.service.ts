import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { User, UserDocument } from '@modules/user/schemas';
import { SharedService } from '@modules/shared/services';
import { NotAcceptable } from '@modules/shared/exceptions';
import { Roles } from '@modules/shared/enums';
import { ChangeUserRoleDto } from '../dto';

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

  /**
   * update user to admin
   * @param {string} id
   * @param {string} userId user who is requesting
   * @param {ChangeUserRoleDto} payload
   */
  async changeUserRole(
    id: string,
    userId: string,
    payload: ChangeUserRoleDto,
  ): Promise<any> {
    try {
      this.sharedService.validateObjectId(id);

      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotAcceptable('User not found');
      }

      if (user.role !== Roles.ADMINISTRATOR) {
        throw new NotAcceptable('User do not have required permissions');
      }

      if (payload.role === Roles.COLLABORATOR) {
        const allAdmins = await this.userModel.find({
          role: Roles.ADMINISTRATOR,
        });

        if (allAdmins.length === 1) {
          throw new NotAcceptable('Cannot change role of the last admin');
        }
      }

      await this.userModel.findByIdAndUpdate(id, { role: payload.role });
    } catch (e) {
      throw e;
    }
  }
}
