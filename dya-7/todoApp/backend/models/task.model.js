import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Task text is required'],
      trim: true,
    },
  },
  { timestamps: true } 
);

const Task = mongoose.model('Task', taskSchema);

export default Task;