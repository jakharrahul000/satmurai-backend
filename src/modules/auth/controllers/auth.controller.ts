import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '@modules/auth/services';
import { RegisterDto, LoginDto } from '@modules/auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Route to register a new user
   * @param {RegisterDto} payload the registration dto
   */
  @Post('register')
  async register(@Body() payload: RegisterDto): Promise<any> {
    const userRes = await this.authService.register(payload);
    return {
      status: 'success',
      message: 'Successfully registered new user',
      data: userRes,
    };
  }

  /**
   * Route to login an existing user
   * @param {LoginDto} payload the login dto
   */
  @Post('login')
  async login(@Body() payload: LoginDto): Promise<any> {
    const userRes = await this.authService.login(payload);
    return {
      status: 'success',
      message: 'Successfully logged in',
      data: userRes,
    };
  }
}
