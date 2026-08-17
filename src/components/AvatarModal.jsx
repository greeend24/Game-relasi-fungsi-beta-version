import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';
import { storageService } from '../services/storageService';

export const AVATAR_LIST = [
  { id: 'cat', name: 'Kucing', path: '/assets/tampilan di avatar menu board/Assets/cat_avatar@4x.png' },
  { id: 'deer', name: 'Rusa', path: '/assets/tampilan di avatar menu board/Assets/deer_avatar@4x.png' },
  { id: 'giraffe', name: 'Jerapah', path: '/assets/tampilan di avatar menu board/Assets/giraffe_avatar@4x.png' },
  { id: 'fox', name: 'Rubah', path: '/assets/tampilan di avatar menu board/Assets/fox_avatar@4x.png' },
  { id: 'lion', name: 'Singa', path: '/assets/tampilan di avatar menu board/Assets/leon_avatar@4x.png' },
  { id: 'panda', name: 'Panda', path: '/assets/tampilan di avatar menu board/Assets/panda_avatar@4x.png' },
  { id: 'rabbit', name: 'Kelinci', path: '/assets/tampilan di avatar menu board/Assets/rabbit_avatar@4x.png' },
  { id: 'donkey', name: 'Keledai', path: '/assets/tampilan di avatar menu board/Assets/donkey_avatar@4x.png' },
  { id: 'elephant', name: 'Gajah', path: '/assets/tampilan di avatar menu board/Assets/elephent_avatar@4x.png' },
  { id: 'tiger', name: 'Harimau', path: '/assets/tampilan di avatar menu board/Assets/tiger_avatar@4x.png' },
  { id: 'bear', name: 'Beruang', path: '/assets/tampilan di avatar menu board/Assets/bear_avatar@4x.png' },
  { id: 'wolf', name: 'Serigala', path: '/assets/tampilan di avatar menu board/Assets/wolf_avatar@4x.png' },
  { id: 'chicken', name: 'Ayam', path: '/assets/tampilan di avatar menu board/Assets/chicken_avatar@4x.png' },
  { id: 'sheep', name: 'Domba', path: '/assets/tampilan di avatar menu board/Assets/sheep_avatar@4x.png' },
  { id: 'dog', name: 'Anjing', path: '/assets/tampilan di avatar menu board/Assets/dog_avatar@4x.png' },
  { id: 'owl', name: 'Relo Owl', path: '/assets/tampilan di avatar menu board/Assets/owl_avatar@4x.png' },
];

export function getAvatarPath(avatarId) {
  const found = AVATAR_LIST.find(a => a.id === avatarId);
  return found ? found.path : AVATAR_LIST[0].path;
}

export default function AvatarModal({ isOpen, onClose, currentUser, onAvatarSelected }) {
  const [selectedId, setSelectedId] = useState(currentUser?.avatarId || 'cat');

  useEffect(() => {
    if (currentUser?.avatarId) {
      setSelectedId(currentUser.avatarId);
    }
  }, [currentUser?.avatarId, isOpen]);

  if (!isOpen) return null;

  const currentAvatar = AVATAR_LIST.find(a => a.id === selectedId) || AVATAR_LIST[0];

  const handleSelectAvatar = async (avatar) => {
    try { audioEngine.playClick(); } catch {}
    setSelectedId(avatar.id);
    const updatedUser = await storageService.updateAvatar(avatar.id);
    onAvatarSelected?.(updatedUser || { ...currentUser, avatarId: avatar.id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      
      {/* WOODEN BOARD CONTAINER MATCHING REFERENCE SCREENSHOT */}
      <div 
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-cover bg-center border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-[#2D241E] flex flex-col items-center space-y-4 max-h-[90vh] overflow-y-auto drag-scroller"
        style={{ backgroundImage: `url('/assets/tampilan di avatar menu board/Assets/board_of_avatar@4x.png')` }}
      >
        
        {/* GREEN ROUND EXIT BUTTON (CIRCULAR HITBOX TOP RIGHT CORNER OF BOARD) */}
        <button 
          onClick={() => { try { audioEngine.playClick(); } catch {} onClose(); }}
          className="clean-icon-btn rounded-full overflow-hidden absolute top-3 right-3 sm:top-4 sm:right-4 z-30 cursor-pointer"
          title="Tutup Menu Avatar"
        >
          <img 
            src="/assets/tampilan di avatar menu board/Assets/exit_buutton_avatar@4x.png" 
            alt="Close" 
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-md rounded-full"
          />
        </button>

        {/* TOP HEADER: WOODEN FRAME (avatar_border) DISPLAYING CURRENT SELECTED AVATAR & BROWN BACKGROUND */}
        <div className="flex flex-col items-center relative -mt-3">
          <div 
            className="w-24 h-24 sm:w-28 sm:h-28 bg-contain bg-no-repeat bg-center flex items-center justify-center relative p-2 sm:p-3 drop-shadow-lg flex-shrink-0"
            style={{ backgroundImage: `url('/assets/tampilan di avatar menu board/Assets/avatar_border@4x.png')` }}
          >
            <div 
              className="w-15 h-15 sm:w-18 sm:h-18 rounded-xl bg-[#8A6746] bg-cover bg-center flex items-center justify-center overflow-hidden shadow-inner"
              style={{ backgroundImage: `url('/assets/tampilan di avatar menu board/Assets/avatar_background@4x.png')` }}
            >
              <img 
                src={currentAvatar.path} 
                alt={currentAvatar.name}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-sm"
              />
            </div>
          </div>
          <h2 className="font-pencil text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-1 uppercase tracking-wider">
            {currentAvatar.name}
          </h2>
        </div>

        {/* 15 AVATAR SELECTION GRID (3 ROWS OF 5 AVATARS) */}
        <div className="grid grid-cols-5 gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-[#2D241E]/30 w-full justify-items-center">
          {AVATAR_LIST.slice(0, 15).map((avatar) => {
            const isSelected = selectedId === avatar.id;

            return (
              <button
                key={avatar.id}
                onClick={() => handleSelectAvatar(avatar)}
                onMouseEnter={() => { try { audioEngine.playHover(); } catch {} }}
                title={avatar.name}
                className={`relative p-0.5 transition-all cursor-pointer flex items-center justify-center ${
                  isSelected 
                    ? 'scale-110 shadow-[0_0_18px_rgba(250,204,21,0.9)] z-10' 
                    : 'hover:scale-105 active:scale-95 opacity-85 hover:opacity-100'
                }`}
              >
                {/* Mini Avatar Frame Box with Brown Background */}
                <div 
                  className="w-13 h-13 sm:w-15 sm:h-15 bg-contain bg-no-repeat bg-center flex items-center justify-center relative p-1 flex-shrink-0"
                  style={{ backgroundImage: `url('/assets/tampilan di avatar menu board/Assets/avatar_border@4x.png')` }}
                >
                  <div 
                    className="w-8 h-8 sm:w-9.5 sm:h-9.5 rounded-lg bg-[#8A6746] bg-cover bg-center flex items-center justify-center overflow-hidden shadow-inner"
                    style={{ backgroundImage: `url('/assets/tampilan di avatar menu board/Assets/avatar_background@4x.png')` }}
                  >
                    <img 
                      src={avatar.path} 
                      alt={avatar.name}
                      className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
                
                {/* Active Checkmark Pill */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white rounded-full border-2 border-[#2D241E] flex items-center justify-center shadow-md z-20">
                    <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}
