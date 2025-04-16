import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: string;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'To Do' }
});

export default mongoose.model<ITask>('Task', TaskSchema);