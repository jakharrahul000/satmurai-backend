import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExternalUserService } from '@modules/user/services';
import {
  CreateTaskDto,
  UpdateTaskDto,
  ChangeTaskStatusDto,
  UpdateTaskAssigneeDto,
} from '@modules/task/dto';
import { Task, TaskDocument } from '@modules/task/schemas';
import { Roles } from '@modules/shared/enums';
import { NotAcceptable } from '@modules/shared/exceptions';
import { SharedService } from '@modules/shared/services';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private readonly sharedService: SharedService,
    private readonly externalUserService: ExternalUserService,
  ) {}

  /**
   * create new task
   * @param {CreateTaskDto} payload
   * @param {string} userId
   */
  async create(payload: CreateTaskDto, userId: string): Promise<any> {
    try {
      if (userId.toString() !== payload.owner) {
        throw new NotAcceptable('User and owner does not match');
      }

      if (!(await this.externalUserService.getById(payload.owner))) {
        throw new NotAcceptable('User not found');
      }

      payload.assignees.forEach(async (assignee) => {
        if (!(await this.externalUserService.getById(assignee))) {
          throw new NotAcceptable('User not found');
        }
      });

      const taskData = new this.taskModel(payload);
      const newTask = await taskData.save();

      return newTask;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Get task by id
   * @param id task id
   */
  async findOne(id: string): Promise<any> {
    try {
      this.sharedService.validateObjectId(id);

      const task = await this.taskModel.findById(id);
      if (!task) {
        throw new NotAcceptable('Task not found');
      }

      return task;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Get all tasks sorted by priority
   */
  async findAll(): Promise<any> {
    try {
      const tasks = await this.taskModel.find().sort({ priority: -1 });

      return tasks;
    } catch (e) {
      throw e;
    }
  }

  /**
   * update task details
   * @param {string} taskId id of task to update
   * @param {UpdateTaskDto} payload payload to update
   * @param {string} userId user who is requesting
   */
  async update(
    taskId: string,
    payload: UpdateTaskDto,
    userId: string,
  ): Promise<any> {
    try {
      this.sharedService.validateObjectId(taskId);

      const task = await this.taskModel.findById(taskId);
      if (!task) {
        throw new NotAcceptable('Task not found');
      }

      const user = await this.externalUserService.getById(userId);
      if (!user) {
        throw new NotAcceptable('User not found');
      }

      if (user.role === Roles.COLLABORATOR) {
        if (userId.toString() !== task.owner.toString()) {
          throw new NotAcceptable('User do not have required permissions');
        }
      }

      await this.taskModel.findByIdAndUpdate(taskId, payload);
    } catch (e) {
      throw e;
    }
  }

  /**
   * update task status
   * @param {string} taskId id of task to update
   * @param {ChangeTaskStatusDto} payload payload to update
   */
  async updateStatus(
    taskId: string,
    payload: ChangeTaskStatusDto,
  ): Promise<any> {
    try {
      this.sharedService.validateObjectId(taskId);

      const task = await this.taskModel.findById(taskId);
      if (!task) {
        throw new NotAcceptable('Task not found');
      }

      await this.taskModel.findByIdAndUpdate(taskId, payload);
    } catch (e) {
      throw e;
    }
  }

  /**
   * update task assignees
   * @param {string} taskId id of task to update
   * @param {UpdateTaskAssigneeDto} payload payload to update
   * @param {string} userId user who is requesting
   */
  async updateAssignees(
    taskId: string,
    payload: UpdateTaskAssigneeDto,
    userId: string,
  ): Promise<any> {
    try {
      this.sharedService.validateObjectId(taskId);

      const task = await this.taskModel.findById(taskId);
      if (!task) {
        throw new NotAcceptable('Task not found');
      }

      const user = await this.externalUserService.getById(userId);
      if (!user) {
        throw new NotAcceptable('User not found');
      }

      if (user.role === Roles.COLLABORATOR) {
        if (
          userId.toString() !== task.owner.toString() ||
          payload.assignees.length > 0 ||
          payload.assignees[0] !== userId
        ) {
          throw new NotAcceptable('User do not have required permissions');
        }
      }

      const assignees = { ...task.assignees };
      payload.assignees.forEach((assignee) => {
        const index = assignees.indexOf(assignee);
        if (index === -1) {
          assignees.push(assignee);
        } else {
          assignees.splice(index, 1);
        }
      });

      await this.taskModel.findByIdAndUpdate(taskId, { assignees });
    } catch (e) {
      throw e;
    }
  }

  /**
   * delete task
   * @param {string} taskId id of task to delete
   * @param {string} userId user who is requesting
   */
  async delete(taskId: string, userId: string): Promise<any> {
    try {
      this.sharedService.validateObjectId(taskId);

      const task = await this.taskModel.findById(taskId);
      if (!task) {
        throw new NotAcceptable('Task not found');
      }

      const user = await this.externalUserService.getById(userId);
      if (!user) {
        throw new NotAcceptable('User not found');
      }

      if (user.role === Roles.COLLABORATOR) {
        if (userId.toString() !== task.owner.toString()) {
          throw new NotAcceptable('User do not have required permissions');
        }
      }

      await this.taskModel.findByIdAndDelete(taskId);
    } catch (e) {
      throw e;
    }
  }
}
