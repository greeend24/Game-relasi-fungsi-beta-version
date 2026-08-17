// Better Auth Client for Frontend
// Handles sign-up, sign-in, sign-out, and session management

import { createAuthClient } from 'better-auth/react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const authClient = createAuthClient({
  baseURL: API_BASE,
  credentials: 'include', // Send cookies for session auth
});

/**
 * Register a new user account.
 * Maps username → email format for Better Auth compatibility.
 */
export async function registerUser(username, password, fullname = '') {
  try {
    const email = `${username.toLowerCase()}@detektifdata.local`;
    const result = await authClient.signUp.email({
      email,
      password,
      name: fullname || username,
      username: username.trim(),
    });

    if (result.error) {
      return {
        success: false,
        message: result.error.message || 'Gagal mendaftarkan akun!',
      };
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
    const email = `${username.toLowerCase()}@detektifdata.local`;
    const result = await authClient.signIn.email({
      email,
      password,
    });

    if (result.error) {
      return {
        success: false,
        message: result.error.message || 'Username atau password salah!',
      };
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
