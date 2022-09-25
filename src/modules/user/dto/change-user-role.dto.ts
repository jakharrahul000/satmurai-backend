import { Roles } from '@modules/shared/enums';
import { IsString, IsArray, IsNotEmpty, IsEnum } from 'class-validator';

/**
 * Update user role Dto Class
 */

export class ChangeUserRoleDto {
  @IsEnum(Roles)
  @IsNotEmpty()
  role: string;
}
