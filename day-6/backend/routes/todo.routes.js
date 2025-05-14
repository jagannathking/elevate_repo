import express from 'express';

import {createTodo, getAllTodos, getTodo, updateTodo, deleteTodo} from '../controllers/todo.controller.js';
import {authoMiddleware} from '../middlewares/auth.middleware.js'

// Routes
const router = express.Router();


router.post("/create", authoMiddleware, createTodo);
router.get("/todos",authoMiddleware, getAllTodos);
router.get("/todo", authoMiddleware, getTodo);
router.put("/update", authoMiddleware, updateTodo);
router.delete("/delete", authoMiddleware, deleteTodo);



export default router;
