import React, { useEffect, useState } from 'react';
import { Lottie } from 'lottie-react';
import loadingAnimation from '../../public/assets/loading/loading_animation.json';
import { preloadAllGameAssets } from '../services/reloFrameService';

const LOADING_TIPS = [
  'Memeriksa Berkas Kasus Matematika...',
  'Menajamkan Kaca Pembesar & Logika...',
  'Menghubungkan Himpunan Relasi & Fungsi...',
  'Memuat 7 Peta Dunia Penyelidikan...',
  'Menyiapkan Suara Detektif Relo...',
  'Detektif Relo Siap Beraksi! 🚀'
];

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(25);
  const [tipIndex, setTipIndex] = useState(0);

  // Rotate tips
  useEffect(() => {
    const tipTimer = setInterval(() => {
      setTipIndex(prev => (prev + 1) % LOADING_TIPS.length);
    }, 800);
    return () => clearInterval(tipTimer);
  }, []);

  // Preload all assets and track real loading progress
  useEffect(() => {
    let isMounted = true;
    let visualProgress = 50;

    // Smooth and snappy visual ticker: advances smoothly to visualProgress
    const ticker = setInterval(() => {
      if (!isMounted) return;
      setProgress(prev => {
        if (prev < visualProgress) {
          return Math.min(visualProgress, prev + 8);
        }
        return prev;
      });
    }, 15);

    const startPreloading = async () => {
      try {
        await preloadAllGameAssets((percent) => {
          if (isMounted) {
            visualProgress = Math.max(visualProgress, Math.min(95, percent));
          }
        });
      } catch (err) {
        console.warn('Preload notice:', err);
      }

      // Complete to 100%
      if (isMounted) {
        visualProgress = 100;
        setProgress(100);
        setTimeout(() => {
          if (isMounted) {
            onFinish();
          }
        }, 80);
      }
    };

    startPreloading();

    return () => {
      isMounted = false;
      clearInterval(ticker);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#FAF7F2] font-hand animate-fade-in text-[#2D241E] select-none">
      <div className="w-full max-w-sm text-center space-y-4">
        
        {/* SINGLE FOCUSED LOTTIE LOADING ANIMATION */}
        <div className="flex justify-center items-center w-36 h-36 mx-auto">
          <Lottie 
            animationData={loadingAnimation} 
            loop={true} 
            autoplay={true} 
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-3xl font-bold font-pencil text-[#2D241E] tracking-wider">
            DETEKTIF DATA
          </h2>
          <p className="text-sm font-bold text-[#78350F] min-h-[22px] transition-all duration-300">
            {LOADING_TIPS[tipIndex]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full h-4 rounded-full bg-white border-2 border-[#2D241E] overflow-hidden p-0.5 shadow-[2px_2px_0px_#2D241E]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center px-1 text-xs font-bold text-[#2D241E] font-mono">
            <span>MEMUAT GAME</span>
            <span>{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
}
