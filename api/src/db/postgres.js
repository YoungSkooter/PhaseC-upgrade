const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

async function connectPostgres() {
  try {
    const client = await pool.connect();
    console.log("Postgres connected");
    client.release();
  } catch (err) {
    console.error("Postgres connection error:", err);
    process.exit(1);
  }
}

module.exports = {
  pool,
  connectPostgres,
};