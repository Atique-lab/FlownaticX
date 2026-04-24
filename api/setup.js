import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const sql = neon(process.env.DATABASE_URL);

    // Dropping and recreating or altering is risky if there is data, 
    // but for setup we'll just add the new columns if they don't exist.
    // However, since this is a "setup" script, I'll update it to create the full version.
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        business_name VARCHAR(255),
        business_type VARCHAR(255),
        service VARCHAR(255),
        message TEXT,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Add columns if they don't exist (for existing tables)
    try {
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS email VARCHAR(255)`;
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone VARCHAR(50)`;
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS business_name VARCHAR(255)`;
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS business_type VARCHAR(255)`;
    } catch (e) {
      // Columns might already exist, ignore error
    }

    return res.status(200).json({
      success: true,
      message: "Leads table updated with Phone, Email, and Business Type fields.",
    });
  } catch (error) {
    console.error("Setup error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to update table.",
      details: error.message,
    });
  }
}
