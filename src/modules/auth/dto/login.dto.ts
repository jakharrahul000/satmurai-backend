import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * Login User Dto Class
 */
export class LoginDto {
  /**
   * Password field
   * @example 'john$123'
   */
  @IsNotEmpty()
  @IsString()
  password: string;

  /**
   * Email field
   * @example 'test@gmail.com'
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
