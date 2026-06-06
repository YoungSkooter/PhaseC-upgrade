const express = require("express");

const healthRoutes = require("./routes/health");
const userRoutes = require("./routes/users");
const jobRoutes = require("./routes/jobs");


const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);

module.exports = app;