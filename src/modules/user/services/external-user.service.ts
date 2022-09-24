import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from '@modules/auth/dto';
import { User, UserDocument } from '@modules/user/schemas';
import bcrypt = require('bcryptjs');
import { Roles } from '@modules/shared/enums';

@Injectable()
export class ExternalUserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Fetch a user from database by email
   * @param {string} email
   * @returns {Promise<UserDocument>} queried user data
   */
  getByEmail(email: string): Promise<UserDocument> {
    try {
      return this.userModel.findOne({ email }).exec();
    } catch (e) {
      throw e;
    }
  }

  /**
   * Fetches a user by _id
   * @param {string} id
   * @returns {Promise<UserDocument>} queried user data
   */
  getById(id: string): Promise<UserDocument> {
    try {
      return this.userModel.findById(id).exec();
    } catch (e) {
      throw e;
    }
  }

  /**
   * create new user
   * @param {RegisterDto} payload
   * @returns {Promise<UserDocument>} new created user
   */
  async create(payload: RegisterDto): Promise<UserDocument> {
    try {
      // Password hashing
      const hashedPassword = await bcrypt.hash(payload.password, 10);

      const newUser = new this.userModel({
        ...payload,
        password: hashedPassword,
        role: Roles.COLLABORATOR,
      });

      return newUser.save();
    } catch (e) {
      throw e;
    }
  }
}
