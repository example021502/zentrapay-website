const { query } = require("../config/db");

async function getHome(req, res, next) {
  try {
<<<<<<< HEAD
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
=======
    const [highlights, deviceFeatures, testimonials] = await Promise.all([
      query(
        `SELECT id, title, description, icon, image_url
         FROM home_highlights ORDER BY display_order ASC`,
      ),
      query(
        `SELECT id, description
         FROM device_features ORDER BY display_order ASC`,
      ),
      query(
        `SELECT id, name, profession, profile_image_url, message
         FROM testimonials WHERE is_active = TRUE ORDER BY display_order ASC`,
      ),
    ]);
    if(highlights.err && deviceFeatures.err && testimonials.err){
      return json({
         highlights: [],
      deviceFeatures: [],
      testimonials: [],
      })
    }

    return res.json({
      highlights: highlights.rows,
      deviceFeatures: deviceFeatures.rows,
>>>>>>> 4b6e5b825f6b4f5114de5740c8a8ba68a741b8e6
      testimonials: testimonials.rows,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getHome };
