const { query } = require("../config/db");

async function getAbout(req, res, next) {
  try {
    const [members, achievements, collaborations] = await Promise.all([
      query(
<<<<<<< HEAD
        `SELECT * FROM team_members ORDER BY display_order ASC`,
      ),
      query(
        `SELECT * FROM achievements ORDER BY id ASC`,
      ),
      query(
        `SELECT * FROM collaborations ORDER BY display_order ASC`,
=======
        `SELECT id, name, position, profile_image_url, description
         FROM team_members ORDER BY id ASC`,
      ),
      query(
        `SELECT id, heading, achievement_date, image_url, description
         FROM achievements ORDER BY id ASC`,
      ),
      query(
        `SELECT id, heading, image_url, description
         FROM collaborations ORDER BY id ASC`,
>>>>>>> 4b6e5b825f6b4f5114de5740c8a8ba68a741b8e6
      ),
    ]);

    res.json({
      members: members.rows,
      achievements: achievements.rows,
      collaborations: collaborations.rows,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAbout };
