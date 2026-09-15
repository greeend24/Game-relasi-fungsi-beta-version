import React from 'react';
import DetektifRelo from './DetektifRelo';

/**
 * DetectiveMascot ("Detektif Relo")
 * Wrapper around DetektifRelo ensuring all mascot instances in the game
 * render the unified high-resolution PNG frame animation system.
 */
export default function DetectiveMascot({ emotion = 'idle', message = '', size = 'md', className = '' }) {
  return (
    <DetektifRelo
      emotion={emotion}
      message={message}
      size={size}
      className={className}
      pose={emotion === 'thinking' ? 'thinking' : 'default'}
    />
  );
}
