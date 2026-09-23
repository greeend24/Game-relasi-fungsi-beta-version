import { Request, Response, NextFunction } from "express";
import { auth, Session, User } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import { db } from "../db/index.js";
import { session, user } from "../db/schema.js";
import { eq } from "drizzle-orm";

// Extend Express Request to include session data
declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session;
    }
  }
}

/**
 * Middleware that verifies the user's session.
 * 1. Checks Better Auth cookie session.
 * 2. If cookie session missing (e.g. cross-origin/desktop/blocked cookies),
 *    checks Authorization: Bearer <token> or x-session-token against SQLite session table.
 * Attaches `req.user` and `req.session` on success.
 * Returns 401 if no valid session is found.
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // 1. Better Auth session check (cookies)
    let sessionData: any = null;
    try {
      sessionData = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
    } catch {
      // Ignore Better Auth internal cookie error and proceed to token check
    }

    if (sessionData && sessionData.user) {
      req.user = sessionData.user as User;
      req.session = sessionData.session as Session;
      return next();
    }

    // 2. Direct Token check (Bearer token or x-session-token)
    const rawAuth = (req.headers["authorization"] || req.headers["x-session-token"]) as string | undefined;
    if (rawAuth) {
      const token = rawAuth.replace(/^Bearer\s+/i, "").trim();
      if (token) {
        const [foundSession] = await db
          .select()
          .from(session)
          .where(eq(session.token, token))
          .limit(1);

        if (foundSession && new Date(foundSession.expiresAt).getTime() > Date.now()) {
          const [foundUser] = await db
            .select()
            .from(user)
            .where(eq(user.id, foundSession.userId))
            .limit(1);

          if (foundUser) {
            req.user = foundUser as User;
            req.session = foundSession as Session;
            return next();
          }
        }
      }
    }

    res.status(401).json({ error: "Unauthorized : no valid session" });
  } catch (error) {
    console.error("[auth.middleware] Session verification failed:", error);
    res.status(401).json({ error: "Unauthorized : session verification failed" });
  }
}
