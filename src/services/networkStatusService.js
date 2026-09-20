// Network Status Service
// Monitors real-time connectivity to both internet and the game backend server.
// Emits status changes to listeners (isOnline: boolean).

import { resolveApiBase } from './apiService.js';

class NetworkStatusService {
  constructor() {
    // Default false: game terhitung OFFLINE sampai berhasil terhubung ke server Ngrok
    this.isOnline = false;
    this.isChecking = false;
    this.lastChecked = Date.now();
    this.listeners = new Set();
    this.pollInterval = null;

    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.checkHealth(true));
      window.addEventListener('offline', () => this.setOnline(false));

      // Initial health check segera saat aplikasi dibuka
      this.checkHealth(true);

      // Heartbeat ping berkala setiap 10 detik untuk memantau status Ngrok
      this.pollInterval = setInterval(() => {
        this.checkHealth(false);
      }, 10000);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Send immediate initial state
    listener(this.isOnline, this.isChecking);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.isOnline, this.isChecking);
      } catch (err) {
        console.error('[networkStatus] listener error:', err);
      }
    });
  }

  setOnline(status) {
    if (this.isOnline !== status) {
      this.isOnline = status;
      this.lastChecked = Date.now();
      this.notify();
    }
  }

  async checkHealth(force = false) {
    if (this.isChecking && !force) return;

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      this.isChecking = false;
      this.setOnline(false);
      return;
    }

    this.isChecking = true;
    this.notify();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const currentBase = resolveApiBase();
      let healthUrl = `${currentBase}/api/health`;
      try {
        const cachedUserStr = localStorage.getItem('detektif_current_user');
        if (cachedUserStr) {
          const u = JSON.parse(cachedUserStr);
          if (u && u.username && !u._isGuest && u.username !== 'detektif_tamu') {
            healthUrl += `?u=${encodeURIComponent(u.username)}`;
          }
        }
      } catch {}

      const res = await fetch(healthUrl, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });

      clearTimeout(timeoutId);

      let online = false;
      if (res.ok) {
        try {
          const data = await res.json();
          // Server Ngrok dianggap terhubung jika backend membalas JSON dengan status: "ok"
          online = Boolean(data && data.status === 'ok');
        } catch {
          online = false;
        }
      }

      this.isChecking = false;
      this.setOnline(online);
    } catch (err) {
      this.isChecking = false;
      this.setOnline(false);
    }
  }
}

export const networkStatusService = new NetworkStatusService();
