import jwt from "jsonwebtoken";

const ALLOWED_EMAIL = process.env.ADMIN_EMAIL;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: "Google credential is required." });
    }

    // Verify the Google ID token using Google's tokeninfo endpoint
    const googleRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );

    if (!googleRes.ok) {
      return res.status(401).json({ error: "Invalid Google token." });
    }

    const payload = await googleRes.json();

    // Verify the token was issued for our app
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (payload.aud !== clientId) {
      return res.status(401).json({ error: "Token was not issued for this application." });
    }

    // Check if the email is allowed
    if (payload.email !== ALLOWED_EMAIL) {
      return res.status(403).json({
        error: "Access denied. Only the FlownaticX admin account can access this panel.",
      });
    }

    // Verify email is verified by Google
    if (payload.email_verified !== "true" && payload.email_verified !== true) {
      return res.status(403).json({ error: "Email not verified by Google." });
    }

    // Issue a JWT session token (valid for 24 hours)
    const sessionToken = jwt.sign(
      {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      success: true,
      token: sessionToken,
      user: {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      },
    });
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({ error: "Authentication failed. Please try again." });
  }
}
