# VEDI Foundation — Setup Guide (Home Laptop)

These are step-by-step instructions to get the project running on a new machine
(e.g. your personal/home laptop) and push it to your personal GitHub repo.

---

## 1. Prerequisites

Install these once on the new laptop:

- **Node.js (LTS)** — download from <https://nodejs.org> (the "LTS" version).
  Verify it installed:
  ```bash
  node --version
  npm --version
  ```
- **Git** — download from <https://git-scm.com> (macOS usually has it already).
  Verify:
  ```bash
  git --version
  ```

---

## 2. Unzip the project

Unzip `VediSite.zip`. You'll get a folder named **`Demo Website`**.
Open a terminal **inside that folder** before running any commands below.

```bash
cd "Demo Website"
```

---

## 3. Install dependencies

Dependencies (`node_modules`) are NOT included in the zip — they're regenerated
with one command per app.

```bash
# Backend
cd server
npm install
cp .env.example .env     # creates your local config (safe defaults)
cd ..

# Frontend
cd client
npm install
cd ..
```

> The `.env` file holds the admin login + JWT secret. Defaults are
> `admin` / `admin123`. **Change these** in `server/.env` before sharing the
> site with anyone.

---

## 4. Run the site locally

Open **two terminals**, both inside the `Demo Website` folder:

**Terminal 1 — backend API:**
```bash
cd server
npm run dev          # http://localhost:4000
```

**Terminal 2 — frontend:**
```bash
cd client
npm run dev          # http://localhost:5173
```

Then open **http://localhost:5173** in your browser.
Admin dashboard is at **/admin** (log in with the credentials from `server/.env`).

---

## 5. Push to your personal GitHub repo

Run these **once**, inside the `Demo Website` folder. Replace the email with
your **personal** email (so your work email doesn't end up in the repo history).

```bash
git init
git config user.name "Ankit Sarkar"
git config user.email "your-personal-email@example.com"

git add .
git commit -m "Initial commit: VEDI Foundation website"
git branch -M main

git remote add origin https://github.com/ankitsarkar0407/VediSite.git
git push -u origin main
```

When prompted, sign in with your **personal** GitHub account (`ankitsarkar0407`).

> The `.gitignore` already excludes `node_modules`, `.env`, and `data.db`, so
> only clean source code gets pushed.

### Pushing future changes

After the first push, whenever you make changes:
```bash
git add .
git commit -m "Describe what you changed"
git push
```

---

## 6. Project structure (reference)

```
Demo Website/
├── client/              React + Vite frontend
│   └── src/
│       ├── pages/       Home, About, Programs, Roadmap, GetInvolved, Admin
│       ├── components/  Navbar, Layout, ProgramCard
│       └── api.js       API fetch helpers
├── server/              Express API + SQLite
│   └── src/
│       ├── routes/      programs, contact, auth
│       ├── middleware/  JWT admin guard
│       ├── db.js        schema + seed (flagship programs)
│       └── index.js     app entry
├── README.md
└── SETUP.md             (this file)
```

---

## 7. Making it a real public website (later)

When you're ready to put it online with a proper URL (done from your personal
machine, no tunnels needed), a common free setup is:

- **Frontend** → Netlify or Vercel (deploys straight from your GitHub repo)
- **Backend + SQLite** → Render, Railway, or Fly.io

Ask for help with this step when you get there — the app is already structured
to support it (the Express server can serve the built frontend on a single port
via `npm run build` in `client/` then `npm start` in `server/`).

---

## Troubleshooting

- **`npm install` fails** → make sure Node.js LTS is installed (`node --version`).
- **Port already in use** → something else is using :4000 or :5173; close it or
  change the port (`PORT` in `server/.env`, or Vite's port in
  `client/vite.config.js`).
- **Frontend loads but no data** → make sure the backend (Terminal 1) is running.
- **Git push asks for a password** → use a GitHub Personal Access Token, or sign
  in via the browser prompt / GitHub CLI (`gh auth login` → github.com).
