const fs = require("fs");
const path = require("path");
const { pool } = require("../config/db");

async function migrate() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");

  console.log(`Connecting to ${process.env.PGDATABASE} on ${process.env.PGHOST}:${process.env.PGPORT} ...`);
  try {
    await pool.query(schemaSql);
    console.log("✅ Schema migrated successfully.");
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

migrate();
