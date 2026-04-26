import jwt from "jsonwebtoken";

export function setCors(req, res) {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://flownaticx.com",
    "https://flownaticx.vercel.app",
    "http://localhost:5173",
  ];
  const finalOrigin = allowedOrigins.includes(origin) ? origin : "https://flownaticx.com";
  
  res.setHeader("Access-Control-Allow-Origin", finalOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  return finalOrigin;
}

export function authGuard(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  try {
    const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    return decoded;
  } catch {
    res.status(401).json({ error: "Invalid token" });
    return null;
  }
}

export function handleMethodNotAllowed(req, res, allowedMethods) {
  if (!allowedMethods.includes(req.method)) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
    return true;
  }
  return false;
}
