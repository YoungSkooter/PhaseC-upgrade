require("dotenv").config();

const amqp = require("amqplib");

async function start() {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL
  );

  const channel = await connection.createChannel();

  await channel.assertQueue("emails");

  console.log("Worker started");

  channel.consume("emails", async (msg) => {

    const job = JSON.parse(
      msg.content.toString()
    );

    console.log(
      "Processing email job:",
      job
    );

    await new Promise(resolve =>
      setTimeout(resolve, 2000)
    );

    console.log(
      "Email sent:",
      job.email
    );

    channel.ack(msg);

  });
}

start();