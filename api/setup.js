import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const sql = neon(process.env.DATABASE_URL);

    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        business VARCHAR(255),
        service VARCHAR(255),
        message TEXT,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    return res.status(200).json({
      success: true,
      message: "Leads table created successfully. You can now accept form submissions.",
    });
  } catch (error) {
    console.error("Setup error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to create table. Check your DATABASE_URL environment variable.",
      details: error.message,
    });
  }
}
