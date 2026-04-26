import { neon } from "@neondatabase/serverless";
import { setCors, authGuard, handleMethodNotAllowed } from "./_utils/middleware.js";
import { leadSchema } from "./_utils/schemas.js";

export default async function handler(req, res) {
  setCors(req, res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const sql = neon(process.env.DATABASE_URL);

  if (req.method === "POST") {
    try {
      const validation = leadSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validation.error.format() 
        });
      }

      const { name, email, phone, businessName, businessType, service, message } = validation.data;

      // Rate Limiting (IP Based)
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      const recentLeads = await sql`
        SELECT COUNT(*) FROM leads 
        WHERE ip_address = ${ip} 
        AND created_at > NOW() - INTERVAL '10 minutes'
      `;
      
      if (parseInt(recentLeads[0].count) >= 5) {
        return res.status(429).json({ error: "Too many requests. Please try again later." });
      }

      const result = await sql`
        INSERT INTO leads (name, email, phone, business_name, business_type, service, message, ip_address)
        VALUES (${name.trim()}, ${email?.trim().toLowerCase() || null}, ${phone?.trim() || null}, ${businessName?.trim() || ""}, ${businessType?.trim() || ""}, ${service?.trim() || ""}, ${message.trim()}, ${ip})
        RETURNING id, created_at
      `;

      return res.status(201).json({
        success: true,
        lead: result[0],
      });
    } catch (error) {
      console.error("Lead save error:", error);
      return res.status(500).json({ error: "Failed to save lead." });
    }
  }

  if (req.method === "GET") {
    const user = authGuard(req, res);
    if (!user) return;

    try {
      const leads = await sql`SELECT * FROM leads ORDER BY created_at DESC`;
      return res.status(200).json({ success: true, leads });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch leads" });
    }
  }

  if (req.method === "PATCH") {
    const user = authGuard(req, res);
    if (!user) return;

    try {
      const { id, status, revenue, notes } = req.body;
      if (!id) return res.status(400).json({ error: "ID required" });
      
      const updates = [];
      if (status !== undefined) updates.push(sql`status = ${status}`);
      if (revenue !== undefined) updates.push(sql`revenue = ${revenue}`);
      if (notes !== undefined) updates.push(sql`notes = ${notes}`);

      if (updates.length > 0) {
        await sql`UPDATE leads SET ${updates.join(', ')} WHERE id = ${id}`;
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Update failed" });
    }
  }

  return handleMethodNotAllowed(req, res, ["GET", "POST", "PATCH"]);
}
