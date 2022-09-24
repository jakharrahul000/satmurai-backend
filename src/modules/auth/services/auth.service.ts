import { Injectable } from '@nestjs/common';
import { LeanDocument } from 'mongoose';
import bcrypt = require('bcryptjs');
import { UserDocument } from '@modules/user/schemas';
import { RegisterDto, LoginDto } from '@modules/auth/dto';
import { ExternalUserService } from '@modules/user/services';
import { InternalAuthService } from './internal-auth.service';
import { NotAcceptable } from '@modules/shared/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly internalAuthService: InternalAuthService,
    private readonly externalUserService: ExternalUserService,
  ) {}

  /**
   * Register a new user
   * @param {RegisterDto} payload
   * @returns {Promise<LeanDocument<UserDocument>>} new registered user details
   */
  async register(payload: RegisterDto): Promise<LeanDocument<UserDocument>> {
    try {
      // Checks if a user already exits with given email
      await this.internalAuthService.checkIfEmailExistsOrNot(payload.email);

      // Create new user
      const user = await this.externalUserService.create({
        ...payload,
      });

      const userRes =
        await this.internalAuthService.createResponseForAuthenticatedUser(user);
      return userRes;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Authenticate user with email
   * @param {LoginDto} payload login payload to authenticate with
   * @returns {Promise<LeanDocument<UserDocument>>} user profile
   */
  async login(payload: LoginDto): Promise<LeanDocument<UserDocument>> {
    try {
      // Get user details
      const user = await this.externalUserService.getByEmail(payload.email);

      if (!user) throw new NotAcceptable('Email provided is not correct');

      const passwordMatched = await bcrypt.compare(
        payload.password,
        user.password,
      );
      // If password does not match, throw error
      if (!passwordMatched) {
        throw new NotAcceptable('Wrong Credentials. Try Again!!');
      }

      // get response payload
      const userRes =
        await this.internalAuthService.createResponseForAuthenticatedUser(user);
      return userRes;
    } catch (e) {
      throw e;
    }
  }
}
