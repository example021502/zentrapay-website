const { query } = require("../config/db");

async function getBlog(req, res, next) {
  try {
    const [app_updates, app_tutorials, fintech_trends, news] = await Promise.all([
      query("SELECT * FROM app_updates ORDER BY created_at DESC"),
      query("SELECT * FROM app_tutorials ORDER BY created_at DESC"),
      query("SELECT * FROM fintech_trends ORDER BY created_at DESC"),
      query("SELECT * FROM news WHERE is_published = true ORDER BY created_at DESC")
    ])

    res.json({ app_updates: app_updates.rows, app_tutorials: app_tutorials.rows, fintech_trends: fintech_trends.rows, news: news.rows });
  } catch (err) {
    next(err);
  }
}

module.exports = { getBlog };
