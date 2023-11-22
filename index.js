require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const knex = require("knex");
const knexConfig = require("./config/knexfile");

// Initialize Knex
global.db = knex(knexConfig.development);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(cors());
app.use(routes);

// dbInit();

// if (process.env.isProd) setupAllCronJobs();
PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
