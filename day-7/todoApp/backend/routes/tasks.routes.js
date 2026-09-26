import express from 'express';
import Task from '../models/task.model.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const CACHE_KEY = process.env.CACHE_KEY || 'FULLSTACK_TASK_DEFAULT';
const MQTT_ADD_TOPIC = '/add';

// Middleware to ensure Redis client is available (primarily for GET)
const ensureRedisClient = (req, res, next) => {
    const redisClient = req.app.get('redisClient');
    if (!redisClient || !redisClient.isOpen) {
        console.error("Redis client is not available or not connected in request context.");
        return res.status(503).json({ error: 'Service temporarily unavailable (Redis).' });
    }
    next();
};

// Middleware to ensure MQTT client is available (primarily for POST)
const ensureMqttClient = (req, res, next) => {
    const mqttClient = req.app.get('mqttClient');
    if (!mqttClient || !mqttClient.connected) {
        console.error("MQTT client is not available or not connected in request context.");
        return res.status(503).json({ error: 'Service temporarily unavailable (MQTT).' });
    }
    next();
};

// Route - Add new item via MQTT
router.post('/tasks', ensureMqttClient, (req, res) => {
  const { task } = req.body;
  if (!task || typeof task !== 'string' || task.trim() === '') {
    return res.status(400).json({ error: 'Task content is required and must be a non-empty string.' });
  }

  const mqttClient = req.app.get('mqttClient');

  try {
    mqttClient.publish(MQTT_ADD_TOPIC, task.trim(), { qos: 1 }, (err) => {
      if (err) {
        console.error("Failed to publish task to MQTT:", err);
        return res.status(500).json({ error: 'Failed to submit task due to MQTT publishing error.' });
      }
      console.log(`Task "${task.trim()}" published to MQTT topic ${MQTT_ADD_TOPIC}`);
      res.status(202).json({ message: 'Task submitted successfully for processing.' });
    });
  } catch (error) {
    console.error("Error in POST /tasks endpoint:", error);
    res.status(500).json({ error: 'Internal server error while attempting to publish task.' });
  }
});

// Route: GET - Retrieve all items
router.get('/fetchAllTasks', ensureRedisClient, async (req, res) => {
  try {
    const redisClient = req.app.get('redisClient');

    const mongoDbItems = await Task.find({}).sort({ createdAt: 'asc' }).lean();

    let cachedItems = [];
    const redisItemsJson = await redisClient.get(CACHE_KEY);
    if (redisItemsJson) {
      cachedItems = JSON.parse(redisItemsJson); 
    }
    
    const allTaskTexts = [
      ...mongoDbItems.map(item => item.text),
      ...cachedItems.map(item => item.text)
    ];

    res.status(200).json(allTaskTexts); 
  } catch (err) {
    console.error('Error fetching all tasks:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to fetch tasks due to an internal server error.' });
  }
});

export default router;