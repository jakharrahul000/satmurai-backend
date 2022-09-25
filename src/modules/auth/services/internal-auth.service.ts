import { Injectable } from '@nestjs/common';
import { LeanDocument } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '@modules/config/services';
import { UserDocument } from '@modules/user/schemas';
import { ExternalUserService } from '@modules/user/services';
import { ITokenReturnBody } from '@modules/auth/interface';
import { NotAcceptable } from '@modules/shared/exceptions';

@Injectable()
export class InternalAuthService {
  /**
   * Time in seconds when the token is to expire
   * @type {string}
   */
  private readonly expiration: string;

  constructor(
    private readonly configService: AppConfigService,
    private readonly jwtService: JwtService,
    private readonly externalUserService: ExternalUserService,
  ) {
    this.expiration = String(this.configService.expirationTime);
  }

  /**
   * Creates a signed jwt token based on user details
   * @param {Profile} payload user details
   * @returns {Promise<ITokenReturnBody>} token body
   */
  async createToken(payload: UserDocument): Promise<ITokenReturnBody> {
    try {
      return {
        expires: this.expiration,
        token: this.jwtService.sign({
          _id: payload._id,
        }),
      };
    } catch (e) {
      throw e;
    }
  }

  /**
   * Checks if a user already exits with given email
   * @param email email of the user
   */
  async checkIfEmailExistsOrNot(email: string): Promise<any> {
    try {
      if (await this.externalUserService.getByEmail(email)) {
        throw new NotAcceptable(
          'A Account with the provided email already exists',
        );
      }
    } catch (e) {
      throw e;
    }
  }

  /**
   * create response for authenticated user
   * @param user user details
   * @returns return response payload
   */
  async createResponseForAuthenticatedUser(
    user: UserDocument,
  ): Promise<LeanDocument<any>> {
    try {
      // remove password from response
      const userRes = user.toObject();
      delete userRes.password;

      // Create jwt token for user
      const { token } = await this.createToken(user);
      userRes['token'] = token;

      return userRes;
    } catch (e) {
      throw e;
    }
  }
}
