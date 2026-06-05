const router = require("express").Router();
const { pool } = require("../db/postgres");
const { getRedis } = require("../db/redis");
const { getChannel } = require("../db/rabbitmq");

router.get("/", async (req, res) => {
  const redis = getRedis();
  const channel = getChannel();

  await redis.set("health", "ok");

  channel.sendToQueue(
    "events",
    Buffer.from(JSON.stringify({ event: "health_check" }))
  );

  const result = await pool.query("SELECT NOW()");

  res.json({
    status: "ok",
    dbTime: result.rows[0],
  });
});

module.exports = router;