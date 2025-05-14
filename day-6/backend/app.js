import express from 'express';
import cors from 'cors';


import database from './config/database.js';
import userRoutes from './routes/user.routes.js'
import TodoRoutes from './routes/todo.routes.js'


const app = express();


// connect database
database();

// middlewar
app.use(express.json());
app.use(cors());


// App routes
app.use('/api/users', userRoutes);
app.use('/api/todos', TodoRoutes)


// test routes
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    })
})


export default app;