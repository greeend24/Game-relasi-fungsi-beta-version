import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";
import { env } from "../config/env.js";
import * as schema from "../db/schema.js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: async (request) => {
    const list = [
      env.FRONTEND_URL,
      "http://localhost:*",
      "http://127.0.0.1:*",
      "http://localhost",
      "http://127.0.0.1",
      "capacitor://*",
      "app://*",
      "https://*.hf.space",
      "https://*.vercel.app",
      "https://*.onrender.com",
      "https://*.trycloudflare.com",
      "https://*.github.io",
      "https://*.netlify.app",
      "https://*.ngrok-free.dev",
      "https://*.ngrok-free.app",
      "https://*.ngrok.app",
      "https://*.ngrok.io",
      "http://192.168.*:*",
      "http://10.*:*",
      "http://172.*:*",
    ].filter(Boolean);

    if (request) {
      try {
        const origin = request.headers.get("origin");
        if (origin) {
          list.push(origin);
        }
      } catch {}
    }
    return list;
  },
  advanced: {
    useSecureCookies: env.BETTER_AUTH_URL.startsWith("https://"),
    defaultCookieAttributes: {
      sameSite: env.BETTER_AUTH_URL.startsWith("https://") ? "none" : "lax",
      secure: env.BETTER_AUTH_URL.startsWith("https://"),
    },
  },
  rateLimit: {
    enabled: false,
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
    maxPasswordLength: 128,
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        unique: true,
        input: true,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
