import { IsString, IsArray } from 'class-validator';

/**
 * Update task assignee Dto Class
 */

export class UpdateTaskAssigneeDto {
  @IsArray()
  @IsString({ each: true })
  assignees: string[];
}
