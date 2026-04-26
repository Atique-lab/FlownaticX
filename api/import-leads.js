import { neon } from "@neondatabase/serverless";
import { setCors, authGuard, handleMethodNotAllowed } from "./_utils/middleware.js";
import { importRowsSchema } from "./_utils/schemas.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  setCors(req, res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const user = authGuard(req, res);
  if (!user) return;

  if (req.method !== "POST") return handleMethodNotAllowed(req, res, ["POST"]);

  try {
    const validation = importRowsSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid data format", details: validation.error.format() });
    }

    const { rows } = validation.data;
    const sql = neon(process.env.DATABASE_URL);
    let imported = 0;
    const skipped = [];

    for (const row of rows) {
      const { name, email, phone, business_name, business_type, service, message } = row;

      if (!name) {
        skipped.push({ row, reason: "Missing name" });
        continue;
      }

      let processedEmail = email ? email.trim().toLowerCase() : "";
      if (processedEmail && !emailRegex.test(processedEmail)) {
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
