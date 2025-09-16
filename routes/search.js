import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Buscar mensajes por texto
router.get("/", async (req, res) => {
  const { q } = req.query;
  try {
    const result = await pool.query(
      "SELECT m.*, u.username FROM messages m JOIN users u ON u.id = m.user_id WHERE content ILIKE $1 ORDER BY created_at DESC",
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;