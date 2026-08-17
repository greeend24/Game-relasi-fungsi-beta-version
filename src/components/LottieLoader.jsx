import React from 'react';
import { Lottie } from 'lottie-react';
import loadingAnimation from '../../public/assets/loading/loading_animation.json';

export default function LottieLoader({ text = 'Memuat...', size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 p-3 pointer-events-none ${className}`}>
      <div className={`flex items-center justify-center ${sizeClasses[size] || sizeClasses.md}`}>
        <Lottie 
          animationData={loadingAnimation} 
          loop={true} 
          autoplay={true} 
          className="w-full h-full object-contain filter drop-shadow-md"
        />
      </div>
      {text && (
        <p className="text-xs sm:text-sm font-bold text-[#78350F] font-pencil tracking-wide animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
