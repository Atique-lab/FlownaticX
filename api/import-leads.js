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
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[\d\s\-().]{7,}$/;

export default async function handler(req, res) {
  setCors(req, res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const auth = authGuard(req, res);
  if (!auth) return;

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { rows } = req.body;

    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ error: "No rows provided." });
    }

    const sql = neon(process.env.DATABASE_URL);
    let imported = 0;
    const skipped = [];

    for (const row of rows) {
      const { name, email, phone, business_name, business_type, service, message } = row;

      // Validate required fields
      if (!name || !email || !phone) {
        skipped.push({ row, reason: "Missing name, email, or phone" });
        continue;
      }

      if (!emailRegex.test(email)) {
        skipped.push({ row, reason: `Invalid email: ${email}` });
        continue;
      }

      if (!phoneRegex.test(phone)) {
        skipped.push({ row, reason: `Invalid phone: ${phone}` });
        continue;
      }

      try {
        await sql`
          INSERT INTO leads (name, email, phone, business_name, business_type, service, message)
          VALUES (
            ${name.trim()},
            ${email.trim().toLowerCase()},
            ${phone.trim()},
            ${(business_name || "").trim()},
            ${(business_type || "").trim()},
            ${(service || "").trim()},
            ${(message || "").trim()}
          )
          ON CONFLICT DO NOTHING
        `;
        imported++;
      } catch (insertError) {
        skipped.push({ row, reason: insertError.message });
      }
    }

    return res.status(200).json({
      success: true,
      imported,
      skipped: skipped.length,
      skippedDetails: skipped,
    });
  } catch (error) {
    console.error("Import error:", error);
    return res.status(500).json({ error: "Failed to import leads." });
  }
}
