const { query } = require("../config/db");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function getContactInfo(req, res, next) {
  try {
    const result = await query(
      `SELECT email, phone, address, twitter_url, website_url
       FROM company_info ORDER BY id ASC LIMIT 1`,
    );
    res.json({ companyInfo: result.rows[0] || null });
  } catch (err) {
    next(err);
  }
}

async function submitContactMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "name, email, subject and message are all required." });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    const result = await query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4) RETURNING id, created_at`,
      [String(name).trim(), String(email).trim(), String(subject).trim(), String(message).trim()],
    );

    res.status(201).json({
      message: "Message received. Our team will get back to you shortly.",
      id: result.rows[0].id,
      createdAt: result.rows[0].created_at,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getContactInfo, submitContactMessage };
