import { NextRequest } from "next/server";



/**
 * CORS Headers for each request
 */
export const CorsHandler = (req: NextRequest) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "https://www.asasy.net",
    "https://qasr-alsutan-store.vercel.app",
    "https://https://qasr-alsutan-dashboard-lfc5.vercel.app",
  ];

  const origin = req.headers.get("Origin");
  const headers = new Headers();

  // Common CORS headers
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Vary", "Origin"); // Important for caching

  // Set allowed origin if it matches
  if (origin && allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }

  return headers;
};