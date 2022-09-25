import { TaskPriority, TaskStatus } from '@modules/shared/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true, maxlength: 240, minlength: 5 })
  title: string;

  @Prop({ required: true, type: Date })
  dueDate: Date;

  @Prop({ required: true })
  sizeEstimate: number;

  @Prop({
    type: String,
    default: TaskStatus.TODO,
    required: true,
  })
  status: string;

  @Prop({
    type: Number,
    default: TaskPriority.LOW,
    required: true,
  })
  priority: number;

  @Prop({ type: String })
  description: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
  })
  assignees: string[];

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
