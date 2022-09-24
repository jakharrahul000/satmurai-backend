import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  Matches,
} from 'class-validator';

/**
 * Register User Dto Class
 */
export class RegisterDto {
  /**
   * Password field
   * @example 'john$123'
   */
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
    message: 'password too weak',
  })
  password: string;

  /**
   * Name field
   * @example 'John Doe'
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Email field
   * @example 'test@gmail.com'
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
