import { Global, Module } from '@nestjs/common';
import { TaskService } from '@modules/task/services';
import { TaskController } from '@modules/task/controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from '@modules/task/schemas';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
