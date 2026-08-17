import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.js";
import path from "path";

// ─────────────────────────────────────────────
// SQLite Database Setup (via libSQL)
// ─────────────────────────────────────────────
// In Electron: DB file is stored in app.getPath('userData')
// In dev: DB file is stored in ./detektif_data.db
// ─────────────────────────────────────────────

function getDbPath(): string {
  // Electron sets this env var from main process
  if (process.env.ELECTRON_USER_DATA) {
    return path.join(process.env.ELECTRON_USER_DATA, "detektif_data.db");
  }
  // Development fallback
  return path.join(process.cwd(), "detektif_data.db");
}

const dbUrl = `file:${getDbPath()}`;

export const client = createClient({ url: dbUrl });

export const db = drizzle(client, { schema });
