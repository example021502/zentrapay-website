const { query } = require("../config/db");

async function getFeatures(req, res, next) {
  try {
<<<<<<< HEAD
    const featuresResult = await query(
      `SELECT * FROM features ORDER BY id ASC`,
    );
    res.json({ features: featuresResult.rows });
=======
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
>>>>>>> 4b6e5b825f6b4f5114de5740c8a8ba68a741b8e6
  } catch (err) {
    next(err);
  }
}

module.exports = { getFeatures };
