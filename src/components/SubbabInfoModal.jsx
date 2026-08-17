import React from 'react';
import { X, BookOpen, FileText, HelpCircle, CheckCircle2 } from 'lucide-react';
import ProfessorOwlMascot from './ProfessorOwlMascot';
import { audioEngine } from '../services/audioEngine';
import { SUBBAB_SYMBOL_EXPLANATIONS } from '../data/casesData';

export default function SubbabInfoModal({ isOpen, onClose, subbabData }) {
  if (!isOpen || !subbabData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      <div className="relative w-full max-w-3xl p-4 sm:p-6 overflow-hidden rounded-3xl bg-white border-3 border-[#2D241E] shadow-[6px_8px_0px_#2D241E] text-[#2D241E] space-y-4 max-h-[92vh] overflow-y-auto drag-scroller">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b-2 border-[#EFECE6]">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-[#FEF3C7] border-2 border-[#2D241E] text-[#D97706]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-pencil text-[#2D241E] leading-tight">
                Info Materi Chapter {subbabData.id}
              </h2>
              <p className="text-[11px] text-[#78350F] font-bold">{subbabData.title} - "{subbabData.caseTitle}"</p>
            </div>
          </div>
          <button 
            onClick={() => { audioEngine.playClick(); onClose(); }}
            className="pencil-btn p-1.5 bg-[#F3F4F6] text-[#374151]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>



        {/* Compact Background Topic Illustration */}
        {subbabData.image && (
          <div className="rounded-2xl overflow-hidden border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] relative min-h-[90px] flex flex-col justify-end p-3 group">
            <img 
              src={subbabData.image} 
              alt={subbabData.caseTitle} 
              onError={(e) => { e.currentTarget.src = '/images/3d_subbab' + subbabData.id + '.jpg'; }}
              className="absolute inset-0 w-full h-full object-cover object-[center_25%] opacity-80 group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/90 via-[#2D241E]/40 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] text-[#F59E0B] font-bold uppercase tracking-wider">KASUS AKTIF:</span>
              <h3 className="text-lg font-bold font-pencil text-white leading-tight">{subbabData.caseTitle}</h3>
            </div>
          </div>
        )}

        {/* 3 Section Compact Grid Briefing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
          
          <div className="p-3 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] space-y-1">
            <div className="flex items-center space-x-1.5 text-[#0284C7] font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>BRIEFING KASUS</span>
            </div>
            <p className="text-[#4A3E3D] font-bold leading-snug text-[11px]">
              {subbabData.briefing}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] space-y-1">
            <div className="flex items-center space-x-1.5 text-[#D97706] font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>ATURAN MAIN</span>
            </div>
            <ul className="space-y-1 text-[#4A3E3D] font-bold text-[11px]">
              {subbabData.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start space-x-1">
                  <span className="text-[#D97706] font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] space-y-1">
            <div className="flex items-center space-x-1.5 text-[#059669] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>TUJUAN LEVEL</span>
            </div>
            <p className="text-[#4A3E3D] font-bold leading-snug text-[11px]">
              {subbabData.goal}
            </p>
          </div>

        </div>

        {/* DETEKTIF RELO MATH SYMBOL EXPLANATION BANNER */}
        {SUBBAB_SYMBOL_EXPLANATIONS[subbabData.id] && (
          <div className="p-3 rounded-2xl bg-[#EFF6FF] border-2 border-[#2563EB] shadow-[2px_3px_0px_#2D241E] text-[#1E3A8A] text-xs font-hand space-y-1">
            <div className="flex items-center space-x-1.5 font-black text-[#1E40AF]">
              <span>🕵️‍♂️</span>
              <span>PENJELASAN SIMBOL MATEMATIKA DETEKTIF RELO</span>
            </div>
            <p className="font-bold text-[11px] leading-relaxed whitespace-pre-line text-[#1E3A8A]">
              {SUBBAB_SYMBOL_EXPLANATIONS[subbabData.id]}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
