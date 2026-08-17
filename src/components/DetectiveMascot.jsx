import React from 'react';
import ProfessorOwlMascot from './ProfessorOwlMascot';

/**
 * DetectiveMascot ("Detektif Relo")
 * Wrapper around ProfessorOwlMascot ensuring all mascot instances in the game
 * render the unified high-resolution PNG frame animation system.
 */
export default function DetectiveMascot({ emotion = 'idle', message = '', size = 'md', className = '' }) {
  return (
    <ProfessorOwlMascot
      emotion={emotion}
      message={message}
      size={size}
      className={className}
      pose={emotion === 'thinking' ? 'thinking' : 'default'}
    />
  );
}
