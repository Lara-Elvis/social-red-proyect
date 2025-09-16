import { Router } from "express";
import pool from "../db.js";
import auth from "../middleware/auth.js";

const router = Router();

// Seguir usuario
router.post("/follow/:id", auth, async (req, res) => {
  try {
    const targetId = req.params.id;
    await pool.query("INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)", [
      req.user.id,
      targetId,
    ]);
    res.json({ message: "Now following user" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dejar de seguir usuario
router.post("/unfollow/:id", auth, async (req, res) => {
  try {
    const targetId = req.params.id;
    await pool.query("DELETE FROM follows WHERE follower_id = $1 AND following_id = $2", [
      req.user.id,
      targetId,
    ]);
    res.json({ message: "Unfollowed user" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;