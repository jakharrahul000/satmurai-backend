import { TaskStatus } from '@modules/shared/enums';
import { IsEnum, IsNotEmpty } from 'class-validator';

/**
 * Change task status Dto Class
 */
export class ChangeTaskStatusDto {
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: string;
}
