import mqtt from 'mqtt';
import Task from '../models/task.model.js';
import dotenv from 'dotenv';

dotenv.config();

const CACHE_KEY = process.env.CACHE_KEY || 'FULLSTACK_TASK_DEFAULT';
const MAX_CACHE_ITEMS = parseInt(process.env.MAX_CACHE_ITEMS, 10) || 50;
const MQTT_ADD_TOPIC = '/add';

const setupMQTT = (redisClient) => {
    if (!redisClient || !redisClient.isOpen) {
        console.error(
            'Redis client not provided or not connected. MQTT service cannot operate correctly.'
        );
        return null;
    }

    const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL);

    mqttClient.on('connect', () => {
        console.log(`MQTT client connected to broker: ${process.env.MQTT_BROKER_URL}`);
        mqttClient.subscribe(MQTT_ADD_TOPIC, { qos: 1 }, (err) => {
            if (!err) {
                console.log(`Successfully subscribed to MQTT topic: ${MQTT_ADD_TOPIC}`);
            } else {
                console.error(`MQTT failed to subscribe to ${MQTT_ADD_TOPIC}:`, err.message);
            }
        });
    });

    mqttClient.on('message', async (topic, message) => {
        if (topic === MQTT_ADD_TOPIC) {
            const newItemText = message.toString();
            console.log(`Received new item via MQTT on ${MQTT_ADD_TOPIC}: "${newItemText}"`);

            try {
                let itemsJson = await redisClient.get(CACHE_KEY);
                let items = itemsJson ? JSON.parse(itemsJson) : [];

                items.push({ text: newItemText, createdAt: new Date().toISOString() });

                if (items.length > MAX_CACHE_ITEMS) {
                    console.log(
                        `Cache limit (${MAX_CACHE_ITEMS}) reached. Moving ${items.length} items to MongoDB.`
                    );
                    if (items.length > 0) {

                        const tasksToInsert = items.map(item => ({ text: item.text }));
                        await Task.insertMany(tasksToInsert);
                    }
                    await redisClient.del(CACHE_KEY);
                    console.log('Items moved to MongoDB and Redis cache flushed.');
                } else {
                    await redisClient.set(CACHE_KEY, JSON.stringify(items));
                    console.log(
                        `Item added to Redis cache. Current cache size: ${items.length}`
                    );
                }
            } catch (err) {
                console.error('Error processing MQTT message:', err.message, err.stack);
            }
        }
    });

    mqttClient.on('error', (err) => {
        console.error('MQTT Client Error:', err.message);
    });

    mqttClient.on('reconnect', () => {
        console.log('MQTT client attempting to reconnect...');
    });

    mqttClient.on('close', () => {
        console.log('MQTT client disconnected.');
    });

    return mqttClient;
};

export default setupMQTT;