import { neon } from "@neondatabase/serverless";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  const sql = neon(process.env.DATABASE_URL);

  /* ─── POST: Save a new lead ─── */
  if (req.method === "POST") {
    try {
      const { name, business, service, message } = req.body;

      if (!name || !message) {
        return res.status(400).json({ error: "Name and message are required." });
      }

      const result = await sql`
        INSERT INTO leads (name, business, service, message)
        VALUES (${name}, ${business || ""}, ${service || ""}, ${message})
        RETURNING id, created_at
      `;

      return res.status(201).json({
        success: true,
        lead: result[0],
      });
    } catch (error) {
      console.error("Lead save error:", error);
      return res.status(500).json({ error: "Failed to save lead. Please try again." });
    }
  }

  /* ─── GET: Fetch all leads (protected) ─── */
  if (req.method === "GET") {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET);

      const leads = await sql`
        SELECT * FROM leads ORDER BY created_at DESC
      `;

      return res.status(200).json({ success: true, leads });
    } catch (error) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
      console.error("Lead fetch error:", error);
      return res.status(500).json({ error: "Failed to fetch leads." });
    }
  }

  /* ─── PATCH: Update lead status (protected) ─── */
  if (req.method === "PATCH") {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET);

      const { id, status } = req.body;
      if (!id || !status) {
        return res.status(400).json({ error: "Lead ID and status are required." });
      }

      const validStatuses = ["new", "contacted", "converted", "lost"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status." });
      }

      await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`;

      return res.status(200).json({ success: true });
    } catch (error) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
      console.error("Lead update error:", error);
      return res.status(500).json({ error: "Failed to update lead." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
