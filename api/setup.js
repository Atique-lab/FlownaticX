import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const sql = neon(process.env.DATABASE_URL);

    // ── Leads table ──
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
        notes TEXT,
        status VARCHAR(50) DEFAULT 'new',
        ip_address VARCHAR(45),
        revenue DECIMAL(12, 2) DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // ── Clients table (full schema with payment tracking) ──
    await sql`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        lead_id INTEGER REFERENCES leads(id) ON DELETE SET NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        business_name VARCHAR(255),
        service VARCHAR(255),
        project_value DECIMAL(12,2) DEFAULT 0,
        amount_paid DECIMAL(12,2) DEFAULT 0,
        onboarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // ── Tasks table (linked to clients) ──
    await sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        priority VARCHAR(20) DEFAULT 'medium',
        due_date DATE,
        completed_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // ── Safe column additions for existing tables ──
    const alterCmds = [
      sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT`,
      sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45)`,
      sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS revenue DECIMAL(12,2) DEFAULT 0`,
      sql`ALTER TABLE clients ADD COLUMN IF NOT EXISTS project_value DECIMAL(12,2) DEFAULT 0`,
      sql`ALTER TABLE clients ADD COLUMN IF NOT EXISTS amount_paid DECIMAL(12,2) DEFAULT 0`,
      sql`ALTER TABLE clients ADD COLUMN IF NOT EXISTS service VARCHAR(255)`,
      sql`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE`,
      sql`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium'`,
    ];

    for (const cmd of alterCmds) {
      try { await cmd; } catch { /* column already exists */ }
    }

    return res.status(200).json({
      success: true,
      message: "✅ All tables created/updated: leads, clients, tasks",
    });
  } catch (error) {
    console.error("Setup error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to run setup.",
      details: error.message,
    });
  }
}
