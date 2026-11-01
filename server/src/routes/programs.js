import { Router } from "express";
import db from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

// --- Public ---------------------------------------------------------------

// GET /api/programs
router.get("/", (req, res) => {
  const programs = db
    .prepare("SELECT * FROM programs ORDER BY id ASC")
    .all();
  res.json(programs);
});

// GET /api/programs/:id
router.get("/:id", (req, res) => {
  const program = db
    .prepare("SELECT * FROM programs WHERE id = ?")
    .get(req.params.id);
  if (!program) return res.status(404).json({ error: "Program not found" });
  res.json(program);
});

// --- Admin only -----------------------------------------------------------

// POST /api/programs
router.post("/", requireAdmin, (req, res) => {
  const { name, tagline = "", description = "", icon = "" } = req.body || {};
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required" });
  }
  const info = db
    .prepare(
      `INSERT INTO programs (name, tagline, description, icon)
       VALUES (?, ?, ?, ?)`
    )
    .run(name, tagline, description, icon);
  const created = db
    .prepare("SELECT * FROM programs WHERE id = ?")
    .get(info.lastInsertRowid);
  res.status(201).json(created);
});

// PUT /api/programs/:id
router.put("/:id", requireAdmin, (req, res) => {
  const existing = db
    .prepare("SELECT * FROM programs WHERE id = ?")
    .get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Program not found" });

  const {
    name = existing.name,
    tagline = existing.tagline,
    description = existing.description,
    icon = existing.icon,
  } = req.body || {};

  db.prepare(
    `UPDATE programs
     SET name = ?, tagline = ?, description = ?, icon = ?
     WHERE id = ?`
  ).run(name, tagline, description, icon, req.params.id);

  const updated = db
    .prepare("SELECT * FROM programs WHERE id = ?")
    .get(req.params.id);
  res.json(updated);
});

// DELETE /api/programs/:id
router.delete("/:id", requireAdmin, (req, res) => {
  const info = db
    .prepare("DELETE FROM programs WHERE id = ?")
    .run(req.params.id);
  if (info.changes === 0)
    return res.status(404).json({ error: "Program not found" });
  res.json({ success: true });
});

export default router;
