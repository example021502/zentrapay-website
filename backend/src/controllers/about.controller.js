const { query } = require("../config/db");

async function getAbout(req, res, next) {
  try {
    const [members, achievements, collaborations] = await Promise.all([
      query(
        `SELECT * FROM team_members ORDER BY display_order ASC`,
      ),
      query(
        `SELECT * FROM achievements ORDER BY id ASC`,
      ),
      query(
        `SELECT * FROM collaborations ORDER BY display_order ASC`,
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
