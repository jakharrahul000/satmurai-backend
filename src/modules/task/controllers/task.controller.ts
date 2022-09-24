import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { TaskService } from '@modules/task/services';
import {
  ChangeTaskStatusDto,
  CreateTaskDto,
  UpdateTaskAssigneeDto,
  UpdateTaskDto,
} from '@modules/task/dto';
import { JwtAuthGuard } from '@modules/auth/guard/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * route to create a new task
   * @param {CreateTaskDto} payload
   * @param req request object
   * @returns new created task
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() payload: CreateTaskDto, @Request() req): Promise<any> {
    const task = await this.taskService.create(payload, req.user.userId);

    return {
      status: 'success',
      message: 'Task created successfully',
      data: task,
    };
  }

  /**
   * route to get all
   * @returns task
   */
  @Get('all')
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const tasks = await this.taskService.findAll();

    return {
      status: 'success',
      message: 'Tasks fetched successfully',
      data: tasks,
    };
  }

  /**
   * route to get a task by id
   * @param {string} id
   * @returns task
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOne(id);

    return {
      status: 'success',
      message: 'Task fetched successfully',
      data: task,
    };
  }

  /**
   * route to update task
   * @param {string} id
   * @param {UpdateTaskDto} payload
   * @param req request object
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateTaskDto,
    @Request() req,
  ): Promise<any> {
    await this.taskService.update(id, payload, req.user.userId);

    return {
      status: 'success',
      message: 'Task updated successfully',
    };
  }

  /**
   * route to update task status
   * @param {string} id
   * @param {ChangeTaskStatusDto} payload
   */
  @Patch(':id/updateStatus')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body() payload: ChangeTaskStatusDto,
  ): Promise<any> {
    await this.taskService.updateStatus(id, payload);

    return {
      status: 'success',
      message: 'Task updated successfully',
    };
  }

  /**
   * route to update task assignee
   * @param {string} id
   * @param {UpdateTaskAssigneeDto} payload
   * @param req request object
   */
  @Patch(':id/updateAssignee')
  @UseGuards(JwtAuthGuard)
  async updateAssignee(
    @Param('id') id: string,
    @Body() payload: UpdateTaskAssigneeDto,
    @Request() req,
  ): Promise<any> {
    await this.taskService.updateAssignees(id, payload, req.user.userId);

    return {
      status: 'success',
      message: 'Task updated successfully',
    };
  }

  /**
   * route to delete task
   * @param {string} id
   * @param req request object
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Request() req): Promise<any> {
    await this.taskService.delete(id, req.user.userId);

    return {
      status: 'success',
      message: 'Task deleted successfully',
    };
  }
}
