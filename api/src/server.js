require("dotenv").config();

const app = require("./app");
const { connectPostgres } = require("./db/postgres");
const { connectRedis } = require("./db/redis");
const { connectRabbitMQ } = require("./db/rabbitmq");

const PORT = process.env.PORT || 3000;

async function start() {
  await connectPostgres();
  await connectRedis();
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

start();