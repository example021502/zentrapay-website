# Zentrapay Website

Full-stack marketing site for Zentrapay: a React/Vite frontend and a Node.js/Express + PostgreSQL backend.

```
zentrapay-webapp/
├── frontend/   React + Vite + Tailwind site
└── backend/    Express API backed by PostgreSQL (zentrapay_website_db)
```

## Running locally

**1. Backend**

```bash
cd backend
npm install
cp .env.example .env    # fill in your PostgreSQL credentials
npm run db:setup        # creates tables + loads seed content
npm run dev              # http://localhost:5000
```

**2. Frontend**

```bash
cd frontend
npm install
cp .env.example .env    # VITE_API_URL defaults to http://localhost:5000/api
npm run dev              # http://localhost:8081
```

With both running, every page (Home, About, Blog, Features, Contact Us) fetches its content live from the backend, and the Contact Us form persists submissions to the `contact_messages` table.

See `backend/README.md` for API endpoint details and schema notes.
