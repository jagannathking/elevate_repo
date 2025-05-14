import mongoose, { model } from "mongoose";


const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
    },

    completed: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;