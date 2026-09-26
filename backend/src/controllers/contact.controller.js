const { query } = require("../config/db");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function getContactInfo(req, res, next) {
  try {
    // Cleaned SQL query with proper JOINs and string matching
    // Aggregates child records into nested JSON arrays for direct consumption in React/TypeScript
    const result = await query(
      `SELECT 
    c.id, 
    c.company_name,
    c.website_url, 
    COALESCE(
      json_agg(
        DISTINCT jsonb_build_object(
          'location_name', l.location_name,
          'type', l.type,
          'address', CONCAT_WS(', ', l.street_address_1, l.street_address_2, l.city, l.state_province, l.postal_code)
        )
      ) FILTER (WHERE l.id IS NOT NULL), '[]'
    ) AS locations,
    COALESCE(
      json_agg(
        DISTINCT jsonb_build_object(
          'phone_number', co.phone_number,
          'email_address', co.email_address,
          'is_primary', co.is_primary
        )
      ) FILTER (WHERE co.id IS NOT NULL), '[]'
    ) AS contact_channels
  FROM company_profile c
  LEFT JOIN company_locations l ON l.company_id = c.id
  LEFT JOIN company_contact_channels co ON co.company_id = c.id
  WHERE LOWER(c.company_name) = 'zentrapay'
  GROUP BY c.id;`
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
