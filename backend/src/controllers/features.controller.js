const { query } = require("../config/db");

async function getFeatures(req, res, next) {
  try {
    const featuresResult = await query(
      `SELECT * FROM features ORDER BY id ASC`,
    );
    res.json({ features: featuresResult.rows });
  } catch (err) {
    next(err);
  }
}

module.exports = { getFeatures };
