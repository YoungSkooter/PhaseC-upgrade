const router = require("express").Router();
const { getChannel } = require("../db/rabbitmq");

router.post("/email", async (req, res) => {
  const channel = getChannel();

  const job = {
    type: "SEND_EMAIL",
    email: "john@example.com",
    createdAt: new Date().toISOString()
  };

  channel.sendToQueue(
    "emails",
    Buffer.from(JSON.stringify(job))
  );

  res.json({
    message: "Email job queued"
  });
});

module.exports = router;

