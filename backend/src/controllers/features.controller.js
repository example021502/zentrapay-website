const { query } = require("../config/db");

async function getFeatures(req, res, next) {
  try {
    const categoriesResult = await query(
      `SELECT id, title, subtitle FROM feature_categories ORDER BY display_order ASC`,
    );
    const featuresResult = await query(
      `SELECT id, category_id, heading, description, image_url
       FROM features ORDER BY display_order ASC`,
    );

    const categories = categoriesResult.rows.map((cat) => ({
      ...cat,
      items: featuresResult.rows.filter((f) => f.category_id === cat.id),
    }));

    res.json({ categories });
  } catch (err) {
    next(err);
  }
}

module.exports = { getFeatures };
