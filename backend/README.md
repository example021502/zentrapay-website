# Zentrapay Backend

Node.js/Express API backed by PostgreSQL (`zentrapay_website_db`). Serves all content shown on the Zentrapay marketing site (home highlights, testimonials, team, achievements, collaborations, blog, features) and accepts Contact Us submissions.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in your PostgreSQL credentials
npm run db:setup       # creates tables and loads seed data
npm run dev             # starts the API on http://localhost:5000
```

## Endpoints (all under `/api`)

| Method | Path        | Description                                           |
|--------|-------------|--------------------------------------------------------|
| GET    | /health     | Health check                                           |
| GET    | /home       | Home page highlights, device features, testimonials    |
| GET    | /about      | Team members, achievements, collaborations             |
| GET    | /blog       | Blog categories with nested posts                      |
| GET    | /features   | Feature categories with nested features                |
| GET    | /contact    | Published company contact info                         |
| POST   | /contact    | Submit a contact form message `{name,email,subject,message}` |

## Database

Schema: `src/db/schema.sql`. Re-run `npm run db:migrate` any time to (re)create tables (idempotent), and `npm run db:seed` to reset seed data (destructive — truncates and reloads all content tables).
