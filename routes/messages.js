import { Router } from "express";
import pool from "../db.js";
import auth from "../middleware/auth.js";

const router = Router();

// Crear mensaje
router.post("/", auth, async (req, res) => {
  const { content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO messages (user_id, content) VALUES ($1, $2) RETURNING *",
      [req.user.id, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Timeline (últimos 10 mensajes de seguidos)
router.get("/timeline", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT m.*, u.username 
       FROM messages m
       JOIN follows f ON f.following_id = m.user_id
       JOIN users u ON u.id = m.user_id
       WHERE f.follower_id = $1
       ORDER BY m.created_at DESC
       LIMIT 10`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mensajes de un usuario específico
router.get("/user/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT m.*, u.username FROM messages m JOIN users u ON u.id = m.user_id WHERE user_id = $1 ORDER BY created_at DESC",
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
