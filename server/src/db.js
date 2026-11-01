import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQLite file lives in the server root (gitignored)
const dbPath = path.join(__dirname, "..", "data.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

// --- Schema ---------------------------------------------------------------
// "programs" = VEDI Foundation's flagship programs.
// "messages" = contact / get-involved enquiries.
db.exec(`
  CREATE TABLE IF NOT EXISTS programs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    tagline     TEXT    NOT NULL DEFAULT '',
    description TEXT    NOT NULL DEFAULT '',
    icon        TEXT    NOT NULL DEFAULT '',
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS messages (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    message    TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// --- Seed flagship programs on first run ----------------------------------
const count = db.prepare("SELECT COUNT(*) AS n FROM programs").get().n;
if (count === 0) {
  const insert = db.prepare(
    `INSERT INTO programs (name, tagline, description, icon)
     VALUES (@name, @tagline, @description, @icon)`
  );
  const seed = [
    {
      name: "VEDI Shiksha Jyoti",
      tagline: "Scholarships & educational support",
      description:
        "Scholarships and educational support for deserving girl students — covering books, uniforms, learning materials, digital literacy, and career counseling.",
      icon: "📚",
    },
    {
      name: "VEDI Aarogya",
      tagline: "Health, nutrition & wellness",
      description:
        "Health camps, medical assistance, nutritional support, menstrual hygiene awareness, and mental health counseling for every girl we serve.",
      icon: "🩺",
    },
    {
      name: "VEDI Udaan",
      tagline: "Mentorship & leadership",
      description:
        "Mentorship by accomplished professionals, public speaking, personality development, and leadership camps that help girls rise, shine, and lead.",
      icon: "🕊️",
    },
    {
      name: "VEDI Saksham",
      tagline: "Skill development & employability",
      description:
        "Computer education, spoken English, vocational and entrepreneurial training, and financial literacy to build self-reliance and confidence.",
      icon: "💡",
    },
    {
      name: "VEDI Prerna Awards",
      tagline: "Celebrating exceptional girls",
      description:
        "Annual recognition of exceptional girl achievers from disadvantaged backgrounds — honoring courage, talent, and determination.",
      icon: "🏆",
    },
  ];
  const seedMany = db.transaction((rows) => rows.forEach((r) => insert.run(r)));
  seedMany(seed);
  console.log(`Seeded ${seed.length} flagship programs.`);
}

export default db;
