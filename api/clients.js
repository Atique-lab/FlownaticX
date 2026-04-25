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

  // GET — fetch all clients with revenue summary
  if (req.method === "GET") {
    try {
      const clients = await sql`
        SELECT 
          c.*,
          (c.project_value - c.amount_paid) AS amount_remaining,
          COUNT(t.id) AS total_tasks,
          COUNT(t.id) FILTER (WHERE t.status = 'completed') AS completed_tasks,
          COUNT(t.id) FILTER (WHERE t.status = 'pending') AS pending_tasks
        FROM clients c
        LEFT JOIN tasks t ON t.client_id = c.id
        GROUP BY c.id
        ORDER BY c.onboarded_at DESC
      `;
      return res.status(200).json({ success: true, clients });
    } catch (error) {
      console.error("Clients fetch error:", error);
      return res.status(500).json({ error: "Failed to fetch clients." });
    }
  }

  // POST — onboard a new client from a lead
  if (req.method === "POST") {
    try {
      const { lead_id, name, email, phone, business_name, service, project_value, amount_paid } = req.body;

      if (!name || !service || !project_value) {
        return res.status(400).json({ error: "Name, service, and project value are required." });
      }

      // Create client record
      const [client] = await sql`
        INSERT INTO clients (lead_id, name, email, phone, business_name, service, project_value, amount_paid)
        VALUES (${lead_id || null}, ${name}, ${email || ""}, ${phone || ""}, ${business_name || ""}, ${service}, ${project_value}, ${amount_paid || 0})
        RETURNING *
      `;

      // Mark the lead as converted
      if (lead_id) {
        await sql`UPDATE leads SET status = 'converted' WHERE id = ${lead_id}`;
      }

      return res.status(201).json({ success: true, client });
    } catch (error) {
      console.error("Client onboard error:", error);
      return res.status(500).json({ error: "Failed to onboard client." });
    }
  }

  // PATCH — update client payment info
  if (req.method === "PATCH") {
    try {
      const { id, amount_paid, project_value } = req.body;
      if (!id) return res.status(400).json({ error: "Client ID is required." });

      if (amount_paid !== undefined && project_value !== undefined) {
        await sql`UPDATE clients SET amount_paid = ${amount_paid}, project_value = ${project_value} WHERE id = ${id}`;
      } else if (amount_paid !== undefined) {
        await sql`UPDATE clients SET amount_paid = ${amount_paid} WHERE id = ${id}`;
      } else if (project_value !== undefined) {
        await sql`UPDATE clients SET project_value = ${project_value} WHERE id = ${id}`;
      }

      const [updated] = await sql`
        SELECT *, (project_value - amount_paid) AS amount_remaining FROM clients WHERE id = ${id}
      `;

      return res.status(200).json({ success: true, client: updated });
    } catch (error) {
      console.error("Client update error:", error);
      return res.status(500).json({ error: "Failed to update client." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
