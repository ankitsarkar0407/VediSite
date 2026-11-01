# VEDI Foundation — Website

> “Where Every Girl Child Finds Her Wings.” 🕊️

The official website for the **VEDI Foundation**, a non-profit empowering
underprivileged girls through education, healthcare, mentorship, and skill
development. Built with **React + Vite** (frontend) and **Node + Express +
SQLite** (backend).

## Pages

- **Home** — vision, mission, the V-E-D-I core values, flagship programs, mottos
- **About** — founder’s note, core values, and objectives
- **Programs** — the five flagship programs (served from the API)
- **Roadmap** — the five-year roadmap
- **Get Involved** — the inaugural pledge + contact/enquiry form
- **Admin** — login-protected dashboard to manage programs and view messages

## Tech stack

| Layer    | Tech                                  |
| -------- | ------------------------------------- |
| Frontend | React 18, Vite, React Router          |
| Backend  | Node, Express                         |
| Database | SQLite (via `better-sqlite3`)         |
| Auth     | JWT (admin login via env credentials) |

## Getting started

Needs **Node.js 18+**. Run backend and frontend in two terminals.

### 1. Backend

```bash
cd "Demo Website/server"
cp .env.example .env      # adjust admin credentials / secret
npm install
npm run dev               # http://localhost:4000
```

On first run it creates `data.db` and seeds the five flagship programs.

### 2. Frontend

```bash
cd "Demo Website/client"
npm install
npm run dev               # http://localhost:5173
```

Open **http://localhost:5173**. Vite proxies `/api` to the backend.

## Admin access

Go to **/admin** and log in with the credentials from `server/.env`
(defaults: `admin` / `admin123` — change these!).

## API reference

| Method | Endpoint             | Auth  | Description             |
| ------ | -------------------- | ----- | ----------------------- |
| GET    | `/api/programs`      | —     | List flagship programs  |
| GET    | `/api/programs/:id`  | —     | Get one program         |
| POST   | `/api/programs`      | admin | Create program          |
| PUT    | `/api/programs/:id`  | admin | Update program          |
| DELETE | `/api/programs/:id`  | admin | Delete program          |
| POST   | `/api/contact`       | —     | Submit enquiry message  |
| GET    | `/api/messages`      | admin | List enquiry messages   |
| POST   | `/api/auth/login`    | —     | Get admin JWT           |

## Production build

```bash
cd "Demo Website/client" && npm run build      # outputs client/dist
cd "Demo Website/server" && npm start          # serves API + built frontend
```

The Express server serves `client/dist`, so the whole site runs from
`http://localhost:4000` in production.

## Notes

- Admin auth is intentionally minimal (env credentials + JWT). `bcryptjs` is
  installed to make adding a hashed-password user table easy later.
- All DB access is isolated in `server/src/db.js`, so migrating from SQLite to
  PostgreSQL later is straightforward.
