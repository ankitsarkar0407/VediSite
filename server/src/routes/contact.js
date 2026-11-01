import { Router } from "express";
import db from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact  (public) -> save a contact message
router.post("/", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "name, email and message are required" });
  }
  if (!emailRe.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  const info = db
    .prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)")
    .run(name, email, message);
  res.status(201).json({ success: true, id: info.lastInsertRowid });
});

// GET /api/messages is mounted separately in index.js (admin only).
// Exposed here as a handler for reuse.
export function listMessages(req, res) {
  const messages = db
    .prepare("SELECT * FROM messages ORDER BY created_at DESC")
    .all();
  res.json(messages);
}

export const requireAdminForMessages = requireAdmin;

export default router;
