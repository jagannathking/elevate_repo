import express from 'express';
import cors from 'cors';

import database from './config/database.js';
import userRouter from './routes/user.routes.js'


const app = express();

// Connect database
database();


// middlewares
app.use(express.json());
app.use(cors());


// All Routes
app.use("/api/users", userRouter);


// Test routes
app.use("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is Healthy"
    })
})


export default app;