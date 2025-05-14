import app from './app.js'; 
import dotenv from 'dotenv';
import mongoose from 'mongoose'; 
import { connectDB, connectRedis } from './config/database.js'; 
import setupMQTT from './services/mqtt.service.js'; 

dotenv.config(); 

const PORT = process.env.PORT || 5000;

let serverInstance; 

const startServer = async () => {
  try {
    console.log("Initializing application...");

    await connectDB(); 

    const redisClient = await connectRedis(); 
    if (redisClient) {
      app.set('redisClient', redisClient); 
    } else {
      console.error("Critical: Redis client initialization failed. Check db.js.");
    }

    const mqttClient = setupMQTT(redisClient);
    if (mqttClient) {
      app.set('mqttClient', mqttClient); 
    } else {
      console.warn(
        "Warning: MQTT client could not be initialized. Adding new tasks might fail."
      );
    }

    serverInstance = app.listen(PORT, () => {
      console.log(`Server is running and listening on PORT ${PORT}`);
      console.log(`Access API at http://localhost:${PORT}/api/v1`);
    });

  } catch (error) {
    console.error("FATAL ERROR: Failed to start the server");
    console.error(error.message); 
    if (error.stack) { 
    }
  }
};

// Basic Graceful Shutdown
const shutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down...`);

  if (serverInstance) {
    serverInstance.close(async () => {
      console.log('HTTP server closed.');

      const redisClient = app.get('redisClient');
      if (redisClient && redisClient.isOpen) {
        await redisClient.quit().catch(err => console.error("Error closing Redis:", err));
        console.log('Redis client disconnected.');
      }

      const mqttClient = app.get('mqttClient');
      if (mqttClient && typeof mqttClient.end === 'function') {
        // MQTT client.end() is often asynchronous but might not return a promise directly
        // For simplicity, we'll call it and log.
        mqttClient.end(false, {}, () => console.log('MQTT client disconnected.'));
      }

      if (mongoose.connection && mongoose.connection.readyState === 1) {
        await mongoose.connection.close().catch(err => console.error("Error closing MongoDB:", err));
        console.log('MongoDB connection closed.');
      }

      console.log('Shutdown complete. Exiting.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

// Listen for termination signals
process.on('SIGINT', () => shutdown('SIGINT')); 
process.on('SIGTERM', () => shutdown('SIGTERM')); 

// ---- KICK OFF THE SERVER START ----
startServer();