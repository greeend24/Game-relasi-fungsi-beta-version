import dotenv from "dotenv";

// Only load .env file in true development (not when running inside Electron)
// Electron passes env vars directly via process.env before spawning the backend
if (!process.env.ELECTRON_USER_DATA) {
  dotenv.config();
}

export const env = {
  // DATABASE_URL no longer needed — using SQLite via libsql (file-based)
  BETTER_AUTH_SECRET:
    process.env.BETTER_AUTH_SECRET || "detektif-data-offline-secret-2024",
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:3001",
  PORT: parseInt(process.env.PORT || "3001", 10),
  NODE_ENV: process.env.NODE_ENV || "development",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
} as const;
