import React, { useState, useEffect } from 'react';
import { networkStatusService } from '../services/networkStatusService';

/**
 * NetworkStatusBadge
 * Minimalist LED Status Light indicator (pure visual status, non-clickable):
 * - Green (Lampu Hijau) when connected to server & auto-synced
 * - Red (Lampu Merah) when offline (data saved locally, auto-syncs when online)
 */
export default function NetworkStatusBadge({
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
}) {
  const [isOnline, setIsOnline] = useState(networkStatusService.isOnline);

  useEffect(() => {
    const unsubscribe = networkStatusService.subscribe((online) => {
      setIsOnline(online);
    });
    return unsubscribe;
  }, []);

  const titleText = isOnline
    ? 'Lampu Hijau: Terhubung ke Server'
    : 'Lampu Merah: Mode Offline';

  const sizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }[size] || 'w-3.5 h-3.5';

  return (
    <div
      title={titleText}
      aria-label={titleText}
      className={`relative inline-flex items-center justify-center select-none pointer-events-none p-1 rounded-full ${className}`}
    >
      <span className="relative flex items-center justify-center">
        {isOnline ? (
          <>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 ${sizeClasses}`} />
            <span
              className={`relative inline-flex rounded-full border-2 border-white/95 bg-emerald-500 shadow-[0_0_10px_#10B981,0_0_4px_#34D399] ${sizeClasses}`}
            />
          </>
        ) : (
          <>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-60 ${sizeClasses}`} />
            <span
              className={`relative inline-flex rounded-full border-2 border-white/95 bg-rose-500 shadow-[0_0_10px_#EF4444,0_0_4px_#F87171] animate-pulse ${sizeClasses}`}
            />
          </>
        )}
      </span>
    </div>
  );
}
