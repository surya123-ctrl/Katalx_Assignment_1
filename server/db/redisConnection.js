// const redis = require('redis');
// const redisConnection = async () => {
//     console.log('Hello');
//     return new Promise((resolve, reject) => {
//         const client = redis.createClient({
//             url: 'rediss://red-cm0l7121hbls73dc0us0:Se1I6tpzTvhtfOPCQbe7hkZF7NClCVuv@singapore-redis.render.com:6379',
//         });
//         console.log(client);
//         client.on('error', (error) => {
//             console.log("Redis Error: ", error);
//             reject(error);
//         });

//         client.on('connect', () => {
//             console.log("Redis connected successfully");
//             resolve(client);
//         });
//     });

// }
// module.exports = redisConnection;
const redis = require('redis');
const client = redis.createClient({
    port: 6379,
    host: `rediss://red-cm0l7121hbls73dc0us0:Se1I6tpzTvhtfOPCQbe7hkZF7NClCVuv@singapore-redis.render.com:6379
    `
})
client.on('connect', () => {
    console.log('Client connected to redis.')
})
client.on('ready', () => {
    console.log('Client connected to redis & ready to use.')
})
client.on('error', (error) => {
    console.log(error.message)
})
client.on('end', () => {
    console.log('Client disconnected on redis');
})
process.on('SIGINT', () => {
    client.quit();
})
module.exports = client