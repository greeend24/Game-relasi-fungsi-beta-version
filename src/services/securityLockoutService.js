/**
 * SecurityLockoutService
 * Tab-switch monitoring with 3 strikes & 5-minute lockout
 */

const STORAGE_KEY_LOCKOUT = 'detektif_lockout_until';
const STORAGE_KEY_STRIKES = 'detektif_tab_switch_strikes';
const STORAGE_KEY_LAST_STRIKE = 'detektif_last_strike_time';
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const STRIKE_DECAY_MS = 5 * 60 * 1000; // 5 minutes of clean activity decays 1 strike
const VIOLATION_COOLDOWN_MS = 1500; // Debounce multiple events within 1.5s (e.g. blur + visibilitychange)

class SecurityLockoutService {
  constructor() {
    this.listeners = new Set();
    this.lastViolationTime = 0;
  }

  decayStrikesIfNeeded() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_STRIKES);
      const strikes = parseInt(raw || '0', 10);
      if (isNaN(strikes) || strikes <= 0) return;

      const lastTime = parseInt(localStorage.getItem(STORAGE_KEY_LAST_STRIKE) || '0', 10);
      if (!lastTime) return;

      const now = Date.now();
      const elapsed = now - lastTime;

      if (elapsed >= STRIKE_DECAY_MS) {
        const decayCount = Math.floor(elapsed / STRIKE_DECAY_MS);
        const newStrikes = Math.max(0, strikes - decayCount);

        if (newStrikes === 0) {
          localStorage.removeItem(STORAGE_KEY_STRIKES);
          localStorage.removeItem(STORAGE_KEY_LAST_STRIKE);
        } else {
          localStorage.setItem(STORAGE_KEY_STRIKES, String(newStrikes));
          localStorage.setItem(STORAGE_KEY_LAST_STRIKE, String(lastTime + decayCount * STRIKE_DECAY_MS));
        }
      }
    } catch {}
  }

  getStrikes() {
    try {
      this.decayStrikesIfNeeded();
      const val = parseInt(localStorage.getItem(STORAGE_KEY_STRIKES) || '0', 10);
      return isNaN(val) ? 0 : val;
    } catch {
      return 0;
    }
  }

  setStrikes(count) {
    try {
      if (count <= 0) {
        localStorage.removeItem(STORAGE_KEY_STRIKES);
        localStorage.removeItem(STORAGE_KEY_LAST_STRIKE);
      } else {
        localStorage.setItem(STORAGE_KEY_STRIKES, String(count));
        localStorage.setItem(STORAGE_KEY_LAST_STRIKE, String(Date.now()));
      }
    } catch {}
  }

  getLockoutUntil() {
    try {
      const val = parseInt(localStorage.getItem(STORAGE_KEY_LOCKOUT) || '0', 10);
      return isNaN(val) ? 0 : val;
    } catch {
      return 0;
    }
  }

  setLockoutUntil(timestamp) {
    try {
      localStorage.setItem(STORAGE_KEY_LOCKOUT, String(timestamp));
    } catch {}
  }

  isAdmin(userOrUsername) {
    if (!userOrUsername) return false;
    let username = '';
    if (typeof userOrUsername === 'string') {
      username = userOrUsername;
    } else if (typeof userOrUsername === 'object') {
      if (userOrUsername.isAdmin) return true;
      username = userOrUsername.username || userOrUsername.name || userOrUsername.fullname || '';
    }
    const clean = username.toLowerCase().trim();
    return clean === 'fikran02' || clean === 'fikran' || clean === 'admin';
  }

  checkStatus(userOrUsername = null) {
    if (this.isAdmin(userOrUsername)) {
      this.clearLockout();
      return {
        isLocked: false,
        remainingSeconds: 0,
        strikes: 0,
        justLocked: false,
      };
    }

    const now = Date.now();
    const lockoutUntil = this.getLockoutUntil();

    if (lockoutUntil > now) {
      const remainingSeconds = Math.max(1, Math.ceil((lockoutUntil - now) / 1000));
      return {
        isLocked: true,
        remainingSeconds,
        strikes: 3,
        justLocked: false,
      };
    }

    // If lockout has naturally expired, reset strikes and lockout key
    if (lockoutUntil > 0 && lockoutUntil <= now) {
      this.clearLockout();
    }

    return {
      isLocked: false,
      remainingSeconds: 0,
      strikes: this.getStrikes(),
      justLocked: false,
    };
  }

  clearLockout() {
    try {
      localStorage.removeItem(STORAGE_KEY_LOCKOUT);
      localStorage.removeItem(STORAGE_KEY_STRIKES);
      localStorage.removeItem(STORAGE_KEY_LAST_STRIKE);
    } catch {}
    this.notify();
  }

  resetStrikes() {
    try {
      localStorage.removeItem(STORAGE_KEY_STRIKES);
      localStorage.removeItem(STORAGE_KEY_LAST_STRIKE);
    } catch {}
    this.notify();
  }

  recordViolation(userOrUsername = null) {
    if (this.isAdmin(userOrUsername)) {
      return {
        isLocked: false,
        remainingSeconds: 0,
        strikes: 0,
        justLocked: false,
      };
    }

    const now = Date.now();

    // Prevent duplicate violation counts if events fire in rapid succession (e.g. blur + visibilitychange)
    if (now - this.lastViolationTime < VIOLATION_COOLDOWN_MS) {
      return this.checkStatus(userOrUsername);
    }
    this.lastViolationTime = now;

    // Check if already locked
    const currentStatus = this.checkStatus(userOrUsername);
    if (currentStatus.isLocked) {
      return currentStatus;
    }

    const currentStrikes = this.getStrikes();
    const newStrikes = currentStrikes + 1;

    if (newStrikes >= 3) {
      // 3 strikes reached: lock game for 5 minutes
      const lockoutUntil = now + LOCKOUT_DURATION_MS;
      this.setLockoutUntil(lockoutUntil);
      this.setStrikes(3);
      const result = {
        isLocked: true,
        remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
        strikes: 3,
        justLocked: true,
      };
      this.notify(result);
      return result;
    }

    // Strike 1 or 2
    this.setStrikes(newStrikes);
    const result = {
      isLocked: false,
      remainingSeconds: 0,
      strikes: newStrikes,
      justLocked: false,
    };
    this.notify(result);
    return result;
  }

  recordTabLeave(userOrUsername = null) {
    return this.recordViolation(userOrUsername);
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.checkStatus());
    return () => this.listeners.delete(callback);
  }

  notify(customStatus) {
    const status = customStatus || this.checkStatus();
    this.listeners.forEach((cb) => {
      try {
        cb(status);
      } catch {}
    });
  }
}

export const securityLockoutService = new SecurityLockoutService();

