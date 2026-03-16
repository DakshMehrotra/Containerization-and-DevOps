const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id        SERIAL PRIMARY KEY,
      title     TEXT NOT NULL,
      priority  TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high')),
      status    TEXT DEFAULT 'todo'   CHECK (status   IN ('todo','in_progress','done')),
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

init();

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// GET /tasks?search=...&priority=...&status=...
app.get("/tasks", async (req, res) => {
  const { search = "", priority, status } = req.query;
  let conditions = [];
  let params = [];
  let idx = 1;

  if (search) {
    conditions.push(`title ILIKE $${idx++}`);
    params.push(`%${search}%`);
  }
  if (priority) {
    conditions.push(`priority = $${idx++}`);
    params.push(priority);
  }
  if (status) {
    conditions.push(`status = $${idx++}`);
    params.push(status);
  }

  const where = conditions.length ? "WHERE " + conditions.join(" AND ") : "";
  const result = await pool.query(
    `SELECT * FROM tasks ${where} ORDER BY created_at DESC`,
    params
  );
  res.json(result.rows);
});

// POST /tasks
app.post("/tasks", async (req, res) => {
  const { title, priority = "medium" } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });
  const result = await pool.query(
    "INSERT INTO tasks (title, priority) VALUES ($1, $2) RETURNING *",
    [title, priority]
  );
  res.json(result.rows[0]);
});

// PATCH /tasks/:id  — update status
app.patch("/tasks/:id", async (req, res) => {
  const { status } = req.body;
  const result = await pool.query(
    "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *",
    [status, req.params.id]
  );
  res.json(result.rows[0]);
});

// DELETE /tasks/:id
app.delete("/tasks/:id", async (req, res) => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
  res.json({ deleted: true });
});

app.listen(5000, () => console.log("Task API running on port 5000"));