require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL client error", err);
});

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};
