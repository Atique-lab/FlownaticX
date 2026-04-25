import { neon } from "@neondatabase/serverless";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://flownaticx.com",
    "https://flownaticx.vercel.app",
    "http://localhost:5173", // Local development
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "https://flownaticx.com");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  const sql = neon(process.env.DATABASE_URL);

  if (req.method === "POST") {
    try {
      const { name, email, phone, businessName, businessType, service, message } = req.body;

      // 1. Basic Validation
      if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: "All required fields must be filled." });
      }

      // 2. Regex Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email format." });
      if (!phoneRegex.test(phone)) return res.status(400).json({ error: "Invalid phone format." });

      // 3. Rate Limiting (IP Based)
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      const recentLeads = await sql`
        SELECT COUNT(*) FROM leads 
        WHERE ip_address = ${ip} 
        AND created_at > NOW() - INTERVAL '10 minutes'
      `;
      
      if (parseInt(recentLeads[0].count) >= 3) {
        return res.status(429).json({ error: "Too many requests. Please try again in 10 minutes." });
      }

      const result = await sql`
        INSERT INTO leads (name, email, phone, business_name, business_type, service, message, ip_address)
        VALUES (${name}, ${email}, ${phone}, ${businessName || ""}, ${businessType || ""}, ${service || ""}, ${message}, ${ip})
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
    } catch {
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
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
