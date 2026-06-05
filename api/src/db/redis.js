const redis = require("redis");

let client;

async function connectRedis() {
  client = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  client.on("error", (err) => console.error("Redis error", err));

  await client.connect();

  console.log("Redis connected");
}

function getRedis() {
  return client;
}

module.exports = {
  connectRedis,
  getRedis,
};