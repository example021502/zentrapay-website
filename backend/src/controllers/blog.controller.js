const { query } = require("../config/db");

async function getBlog(req, res, next) {
  try {
    const categoriesResult = await query(
      `SELECT id, title, subtitle FROM blog_categories ORDER BY display_order ASC`,
    );
    const postsResult = await query(
      `SELECT id, category_id, heading, image_url, post_date
       FROM blog_posts ORDER BY display_order ASC`,
    );

    const categories = categoriesResult.rows.map((cat) => ({
      ...cat,
      items: postsResult.rows.filter((p) => p.category_id === cat.id),
    }));

    res.json({ categories });
  } catch (err) {
    next(err);
  }
}

module.exports = { getBlog };
