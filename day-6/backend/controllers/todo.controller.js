import Todo from '../model/todo.model.js';


// create todo
export const createTodo = async (req, res) => {
    try {
        const { title } = req.body;

        // input todo validatio
        if (!title) {
            res.status(400).json({
                success: false,
                message: "Todo is required"
            })
        }

        // create todo
        const todo = new Todo({ title });

        res.status(200).json({
            success: true,
            message: "todo created successfully",
            todo
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}


// get all todos 
export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();

        // validation
        if (!todos) {
            res.status(400).json({
                success: false,
                message: "Todo are not available"
            })
        }

        res.status(200).json({
            success: true,
            message: "data fetched successfully",
            todos,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}


// get single todo
export const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.param.id);

        if (!todo) {
            res.status(404).json({
                success: false,
                message: "invaild id"
            })
        }

        res.status(200).json({
            success: true,
            message: "fetched todo successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}



// Update todo
export const updateTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const { id } = req.param;
        const updateTodo = await Todo.findByIdAndUpdate(id, title, { new: true });

        res.status(200).json({
            success: false,
            message: "Todo updated successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}



// Delete Todo
export const deleteTodo = async (req, res) => {
    try {

        const todo = await Todo.findByIdAndDelete(req.param.id);

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}


