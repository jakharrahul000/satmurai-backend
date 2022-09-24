import { TaskPriority, TaskStatus } from '@modules/shared/enums';
import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsString,
  MaxLength,
  MinLength,
  IsDateString,
  IsNumber,
  IsEnum,
} from 'class-validator';

/**
 * Create task Dto Class
 */

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(240)
  title: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @IsNumber()
  sizeEstimate: number;

  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: string;

  @IsEnum(TaskPriority)
  priority: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  assignees: string[];

  @IsString()
  @IsNotEmpty()
  owner: string;
}
