import { neon } from "@neondatabase/serverless";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  const sql = neon(process.env.DATABASE_URL);

  if (req.method === "POST") {
    try {
      const { name, email, phone, businessName, businessType, service, message } = req.body;

      if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: "Name, Email, Phone, and Message are required." });
      }

      const result = await sql`
        INSERT INTO leads (name, email, phone, business_name, business_type, service, message)
        VALUES (${name}, ${email}, ${phone}, ${businessName || ""}, ${businessType || ""}, ${service || ""}, ${message})
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
      return res.status(401).json({ error: "Invalid token" });
    }
  }

  if (req.method === "PATCH") {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });

      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET);

      const { id, status } = req.body;
      await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`;

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
