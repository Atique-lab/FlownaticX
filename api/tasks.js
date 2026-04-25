import { neon } from "@neondatabase/serverless";
import jwt from "jsonwebtoken";

function setCors(req, res) {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://flownaticx.com",
    "https://flownaticx.vercel.app",
    "http://localhost:5173",
  ];
  res.setHeader("Access-Control-Allow-Origin", allowedOrigins.includes(origin) ? origin : "https://flownaticx.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function authGuard(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  try {
    jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    return true;
  } catch {
    res.status(401).json({ error: "Invalid token" });
    return null;
  }
}

export default async function handler(req, res) {
  setCors(req, res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const auth = authGuard(req, res);
  if (!auth) return;

  const sql = neon(process.env.DATABASE_URL);

  // GET — fetch all tasks, optionally filter by client_id
  if (req.method === "GET") {
    try {
      const { client_id } = req.query;
      const tasks = client_id
        ? await sql`
            SELECT t.*, c.name AS client_name, c.business_name
            FROM tasks t
            LEFT JOIN clients c ON c.id = t.client_id
            WHERE t.client_id = ${client_id}
            ORDER BY t.created_at DESC
          `
        : await sql`
            SELECT t.*, c.name AS client_name, c.business_name
            FROM tasks t
            LEFT JOIN clients c ON c.id = t.client_id
            ORDER BY 
              CASE t.status WHEN 'ongoing' THEN 1 WHEN 'pending' THEN 2 WHEN 'completed' THEN 3 END,
              t.created_at DESC
          `;
      return res.status(200).json({ success: true, tasks });
    } catch (error) {
      console.error("Tasks fetch error:", error);
      return res.status(500).json({ error: "Failed to fetch tasks." });
    }
  }

  // POST — create a new task for a client
  if (req.method === "POST") {
    try {
      const { client_id, title, description, priority, due_date } = req.body;

      if (!client_id || !title) {
        return res.status(400).json({ error: "Client ID and task title are required." });
      }

      const [task] = await sql`
        INSERT INTO tasks (client_id, title, description, priority, due_date)
        VALUES (${client_id}, ${title}, ${description || ""}, ${priority || "medium"}, ${due_date || null})
        RETURNING *
      `;

      return res.status(201).json({ success: true, task });
    } catch (error) {
      console.error("Task create error:", error);
      return res.status(500).json({ error: "Failed to create task." });
    }
  }

  // PATCH — update task status
  if (req.method === "PATCH") {
    try {
      const { id, status, title, description, priority, due_date } = req.body;
      if (!id) return res.status(400).json({ error: "Task ID is required." });

      const completed_at = status === "completed" ? new Date().toISOString() : null;

      await sql`
        UPDATE tasks 
        SET 
          status = COALESCE(${status || null}, status),
          title = COALESCE(${title || null}, title),
          description = COALESCE(${description || null}, description),
          priority = COALESCE(${priority || null}, priority),
          due_date = COALESCE(${due_date || null}, due_date),
          completed_at = CASE WHEN ${status || null} = 'completed' THEN NOW() ELSE completed_at END
        WHERE id = ${id}
      `;

      const [updated] = await sql`SELECT * FROM tasks WHERE id = ${id}`;
      return res.status(200).json({ success: true, task: updated });
    } catch (error) {
      console.error("Task update error:", error);
      return res.status(500).json({ error: "Failed to update task." });
    }
  }

  // DELETE — remove a task
  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: "Task ID is required." });
      await sql`DELETE FROM tasks WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Task delete error:", error);
      return res.status(500).json({ error: "Failed to delete task." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
