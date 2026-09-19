const { query } = require("../config/db");

async function getHome(req, res, next) {
  try {
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
      testimonials: testimonials.rows,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getHome };
