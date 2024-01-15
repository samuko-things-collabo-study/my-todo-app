import mongoose from 'mongoose';

export interface TaskDocument extends mongoose.Document {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const collectionName = 'task';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String},
  completed: {type: String, default: false},
  userId: {type: String, ref: "users", required: true}
},
{
  timestamps: true,
});

const TaskModel = mongoose.model<TaskDocument>(collectionName, TaskSchema);
// const TaskModel = mongoose.model<TaskDocument>(collectionName, TaskSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name

export { TaskModel };
