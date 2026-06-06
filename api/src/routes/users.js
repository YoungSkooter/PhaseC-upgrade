const router = require("express").Router();
const { pool } = require("../db/postgres");
const { getRedis } = require("../db/redis");

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const redis = getRedis();

    const cacheKey = `user:${id}`;

    const cachedUser = await redis.get(cacheKey);

    if (cachedUser) {
      return res.json({
        source: "redis",
        data: JSON.parse(cachedUser),
      });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const user = result.rows[0];

    await redis.set(
      cacheKey,
      JSON.stringify(user),
      {
        EX: 60
      }
    );

    return res.json({
      source: "postgres",
      data: user,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;