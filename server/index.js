const express = require('express');
const Redis = require('ioredis');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const foodData = require('./utils/food_data')
const redis = new Redis('redis://default:Lkey3665KNjRAkv@redis-14665.c212.ap-south-1-1.ec2.cloud.redislabs.com:14665');
redis.on("connect", () => {
    console.log("Redis connected");
})
redis.on('error', function (error) {
    console.dir(error)
})
const getRandomIndex = () => {
    return Math.floor(Math.random() * foodData.length) + 1;
}
app.get('/getNewFoodItem', async (req, res) => {
    try {
        const randomIndex = getRandomIndex();
        console.log(randomIndex)
        const cachedData = await redis.hget(`poc:glossary`, randomIndex.toString());
        if (cachedData) {
            console.log("Data found in cache");
            console.log(cachedData)

            const cachedItem = JSON.parse(cachedData);
            res.json({ id: randomIndex, ...cachedItem });
        } else {
            console.log("Data not found in cache, fetching from array");
            const newFoodItem = foodData[randomIndex];
            const { id, food_name, food_description } = newFoodItem;
            await redis.hset('poc:glossary', id, JSON.stringify({ food_name, food_description }));
            res.json(newFoodItem);
        }
    } catch (error) {
        console.log("Error in fetching data. ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.listen(8000, () => {
    console.log('server is running on port 8000');
})