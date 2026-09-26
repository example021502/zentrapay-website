const { query } = require("../config/db");

async function getHome(req, res, next) {
  try {
    const [highlights, app_highlights, testimonials] = await Promise.all([
      query(
        `SELECT * FROM highlights ORDER BY id ASC`,
      ),
      query(
        `SELECT * FROM app_highlights ORDER BY id ASC`,
      ),
      query(
        `SELECT * FROM testimonials WHERE is_active = TRUE ORDER BY id ASC`,
      ),
    ]);

    res.json({
      highlights: highlights.rows,
      app_highlights: app_highlights.rows,
      testimonials: testimonials.rows,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getHome };
