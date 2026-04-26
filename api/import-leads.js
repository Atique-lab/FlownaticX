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

      // Validate required fields (Only name is absolutely required for a lead)
      if (!name) {
        skipped.push({ row, reason: "Missing name" });
        continue;
      }

      // Process email
      let processedEmail = email ? email.trim().toLowerCase() : "";
      if (processedEmail && !emailRegex.test(processedEmail)) {
        // If it's a known placeholder or clearly not an email, we store it but maybe it shouldn't block the import
        // For now, let's allow it if it's not empty, but if it doesn't match regex, we'll still store it
        // unless it's a specific "no email" placeholder which we might want to nullify
        if (processedEmail.includes("didn't have") || processedEmail.includes("no email")) {
          processedEmail = ""; 
        }
      }

      try {
        await sql`
          INSERT INTO leads (name, email, phone, business_name, business_type, service, message)
          VALUES (
            ${name.trim()},
            ${processedEmail || null},
            ${(phone || "").trim() || null},
            ${(business_name || "").trim() || null},
            ${(business_type || "").trim() || null},
            ${(service || "").trim() || null},
            ${(message || "").trim() || null}
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
