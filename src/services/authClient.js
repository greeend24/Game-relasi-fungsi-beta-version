// Better Auth Client for Frontend
// Handles sign-up, sign-in, sign-out, and session management

import { createAuthClient } from 'better-auth/react';
import { resolveApiBase } from './apiService.js';

let cachedClient = null;
let lastBaseUrl = null;

export function getAuthClient() {
  const currentBase = resolveApiBase();
  if (!cachedClient || lastBaseUrl !== currentBase) {
    lastBaseUrl = currentBase;
    cachedClient = createAuthClient({
      baseURL: currentBase,
      credentials: 'include', // Send cookies for session auth
      fetchOptions: {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
    });
  }
  return cachedClient;
}

export const authClient = new Proxy({}, {
  get(_target, prop) {
    const client = getAuthClient();
    return client[prop];
  }
});

/**
 * Register a new user account.
 * Maps username → email format for Better Auth compatibility.
 */
export async function registerUser(username, password, fullname = '') {
  try {
    const email = `${username.toLowerCase()}@detektifdata.local`;
    const regPromise = authClient.signUp.email({
      email,
      password,
      name: fullname || username,
      username: username.trim(),
    });
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Koneksi pendaftaran timeout')), 3500)
    );

    const result = await Promise.race([regPromise, timeoutPromise]);

    if (result.error) {
      let errMsg = result.error.message || 'Gagal mendaftarkan akun!';
      if (errMsg.toLowerCase().includes('already exists') || errMsg.toLowerCase().includes('duplicate')) {
        errMsg = 'Username sudah terdaftar! Gunakan username lain.';
      }
      return {
        success: false,
        message: errMsg,
      };
    }

    if (result.data?.token) {
      try { localStorage.setItem('detektif_auth_token', result.data.token); } catch {}
    }
    return { success: true, data: result.data };
  } catch (err) {
    console.error('[authClient] Register error:', err);
    return { success: false, message: 'Gagal mendaftarkan akun! Cek koneksi server.' };
  }
}

/**
 * Login with username + password.
 */
export async function loginUser(username, password) {
  try {
    let clean = username.trim().toLowerCase();
    if (clean === 'fikran' || clean === 'admin') {
      clean = 'fikran02';
    }
    const email = `${clean}@detektifdata.local`;
    const loginPromise = authClient.signIn.email({
      email,
      password,
    });
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Koneksi login timeout')), 3500)
    );

    const result = await Promise.race([loginPromise, timeoutPromise]);

    if (result.error) {
      let errMsg = result.error.message || 'Username atau password salah!';
      if (errMsg.toLowerCase().includes('invalid') || errMsg.toLowerCase().includes('credential') || errMsg.toLowerCase().includes('password')) {
        errMsg = 'Username atau kata sandi salah!';
      }
      return {
        success: false,
        message: errMsg,
      };
    }

    if (result.data?.token) {
      try { localStorage.setItem('detektif_auth_token', result.data.token); } catch {}
    }

    return { success: true, data: result.data };
  } catch (err) {
    console.error('[authClient] Login error:', err);
    return { success: false, message: 'Gagal melakukan login! Cek koneksi server.' };
  }
}

/**
 * Logout current session.
 */
export async function logoutUser() {
  try {
    try { localStorage.removeItem('detektif_auth_token'); } catch {}
    await authClient.signOut();
    return { success: true };
  } catch (err) {
    console.error('[authClient] Logout error:', err);
    return { success: false };
  }
}

/**
 * Get the current authenticated session.
 * Returns { user, session } or null if not authenticated.
 */
export async function getSession() {
  try {
    const result = await authClient.getSession();
    if (result.data?.user) {
      return result.data;
    }
    return null;
  } catch {
    return null;
  }
}
