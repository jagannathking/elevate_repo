import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRouter from './routes/tasks.routes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*", 
  methods: ["GET", "POST"], 
  credentials: true 
}));

app.use(express.json({ limit: '16kb' })); 
app.use(express.urlencoded({ extended: true, limit: '16kb' })); 

// API Routes
app.use("/api/v1", taskRouter);

// Simple health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "To-Do List Backend Server is Healthy & Running!"
  });
});


// Global error handler 
app.use((err, req, res, next) => {
  console.error("An unhandled error occurred:", err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'An unexpected internal server error occurred.',
  });
});

export default app;