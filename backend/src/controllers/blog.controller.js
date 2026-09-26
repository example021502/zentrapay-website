const { query } = require("../config/db");

async function getBlog(req, res, next) {
  try {
<<<<<<< HEAD
    const [app_updates, app_tutorials, fintech_trends, news] = await Promise.all([
      query("SELECT * FROM app_updates ORDER BY created_at DESC"),
      query("SELECT * FROM app_tutorials ORDER BY created_at DESC"),
      query("SELECT * FROM fintech_trends ORDER BY created_at DESC"),
      query("SELECT * FROM news WHERE is_published = true ORDER BY created_at DESC")
    ])

    res.json({ app_updates: app_updates.rows, app_tutorials: app_tutorials.rows, fintech_trends: fintech_trends.rows, news: news.rows });
=======
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
>>>>>>> 4b6e5b825f6b4f5114de5740c8a8ba68a741b8e6
  } catch (err) {
    next(err);
  }
}

module.exports = { getBlog };
