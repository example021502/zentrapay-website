const { query } = require("../config/db");

async function getAbout(req, res, next) {
  try {
    const [members, achievements, collaborations] = await Promise.all([
      query(
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
