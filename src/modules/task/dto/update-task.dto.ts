import { TaskPriority } from '@modules/shared/enums';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsDateString,
  IsNumber,
  IsEnum,
} from 'class-validator';

/**
 * Update task Dto Class
 */

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(240)
  @IsOptional()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  dueDate: Date;

  @IsNumber()
  @IsOptional()
  sizeEstimate: number;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority: number;

  @IsOptional()
  @IsString()
  description: string;
}
