import React, { useState, useEffect } from 'react';
import { networkStatusService } from '../services/networkStatusService';
import { storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import ServerConfigModal from './ServerConfigModal';

/**
 * NetworkStatusBadge
 * Minimalist LED Status Light with optional label & configuration modal:
 * - Green (Lampu Hijau) when connected to server & auto-synced
 * - Red (Lampu Merah) when offline (data saved locally, auto-syncs when online)
 * - Clicking opens ServerConfigModal to view/change IP & trigger sync
 */
export default function NetworkStatusBadge({
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  compact = false,
  showLabel = false,
  allowConfig = true,
}) {
  const [isOnline, setIsOnline] = useState(networkStatusService.isOnline);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = networkStatusService.subscribe((online) => {
      setIsOnline(online);
    });
    return unsubscribe;
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    try { audioEngine.playClick?.(); } catch {}
    networkStatusService.checkHealth(true);
    storageService.syncPendingDataToServer();
    if (allowConfig) {
      setIsModalOpen(true);
    }
  };

  const titleText = isOnline
    ? 'Lampu Hijau: Terhubung ke Server Ngrok (Online)'
    : 'Lampu Merah: Mode Offline Lokal (Tidak terhubung ke Server Ngrok)';

  const sizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }[size] || 'w-3.5 h-3.5';

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        title={titleText}
        aria-label={titleText}
        className={`relative inline-flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 select-none ${
          showLabel
            ? 'px-3 py-1.5 rounded-full bg-[#2D241E]/85 hover:bg-[#2D241E] text-white border-2 border-white/80 shadow-md space-x-2 backdrop-blur-sm'
            : `p-1 rounded-full ${className}`
        }`}
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

        {showLabel && (
          <span className="text-xs font-pencil font-black tracking-wide text-white/95">
            {isOnline ? 'SERVER ONLINE' : 'MODE OFFLINE'}
          </span>
        )}
      </button>

      {allowConfig && (
        <ServerConfigModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}
