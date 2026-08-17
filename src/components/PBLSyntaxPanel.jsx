import React from 'react';
import { HelpCircle, BookOpen, Layers, CheckCircle2, Lightbulb } from 'lucide-react';

/**
 * PBLSyntaxPanel (Problem-Based Learning 5-Phase Model Engine)
 * Enforces 5 Official Sintaks Pembelajaran Berbasis Masalah (PBL):
 * 1. Orientasi Peserta Didik pada Masalah (Problem Orientation)
 * 2. Mengorganisasikan Peserta Didik untuk Belajar (Study Organization & Case Rules)
 * 3. Membimbing Penyelidikan Individu maupun Kelompok (Investigation Guidance)
 * 4. Mengembangkan dan Menyajikan Hasil Karya (Artifact & Solution Development)
 * 5. Menganalisis dan Mengevaluasi Proses Pemecahan Masalah (Process Analysis & Evaluation)
 */
export default function PBLSyntaxPanel({ 
  stageNum = 1,
  story = '',
  conceptDef = '',
  relationRule = '',
  errorDetails = null,
  children
}) {
  return (
    <div className="w-full space-y-2 font-hand relative z-20">
      
      {/* Orientasi Masalah + Organisasi Belajar & Aturan Kasus */}
      {(relationRule || story || conceptDef) && (
        <div className="p-2.5 rounded-2xl bg-[#FEF08A] border-2 border-[#D97706] shadow-[2px_2px_0px_#D97706] space-y-1 relative z-20 text-xs sm:text-sm">
          {/* Header Badge */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-black text-[#92400E] uppercase tracking-wider pb-1 border-b border-[#FDE68A]">
            <span className="flex items-center space-x-1">
              <BookOpen className="w-3.5 h-3.5 text-[#D97706] flex-shrink-0" />
              <span>ORIENTASI MASALAH & ATURAN KASUS</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#D97706] text-white text-[9px] sm:text-[10px] font-black">
              STAGE {stageNum}
            </span>
          </div>

          {/* Relation Rule & Concept */}
          <div className="text-[#78350F] font-black leading-snug">
            {relationRule && <div>📌 ATURAN KASUS AKTIF: "{relationRule.toUpperCase()}"</div>}
            {story && <div className="text-[#2D241E] font-bold text-xs mt-0.5">🔍 {story}</div>}
          </div>
        </div>
      )}

      {/* Mengembangkan dan Menyajikan Hasil Karya (Interactive Workspace) */}
      <div className="relative z-20 space-y-1">
        <div className="flex items-center space-x-1.5 text-[#059669] font-extrabold text-[11px] sm:text-xs uppercase tracking-wider px-1">
          <Layers className="w-3.5 h-3.5 flex-shrink-0" />
          <span>MENGEMBANGKAN & MENYAJIKAN HASIL KARYA</span>
        </div>
        {children}
      </div>

      {/* Menganalisis dan Mengevaluasi Proses Pemecahan Masalah */}
      {errorDetails && (
        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#FFE4E6] border-2 border-[#BE123C] shadow-[2px_3px_0px_#BE123C] space-y-1.5 animate-fade-in relative z-20 text-xs sm:text-sm">
          <div className="flex items-center space-x-1.5 text-[#BE123C] font-black uppercase tracking-wider text-[11px] sm:text-xs border-b border-[#FECDD3] pb-1">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>ANALISIS & EVALUASI KESALAHAN PEMECAHAN</span>
          </div>
          
          <div className="space-y-1">
            <p className="text-[#9F1239] font-extrabold text-xs sm:text-sm">
              ⚠️ {errorDetails.title}
            </p>
            {errorDetails.reasons.map((r, idx) => (
              <p key={idx} className="p-2 rounded-xl bg-white border border-[#BE123C]/40 text-[#BE123C] font-bold text-xs leading-relaxed shadow-[1px_1px_0px_#BE123C]/30">
                {r}
              </p>
            ))}
            <div className="flex items-center space-x-1.5 text-[#B45309] font-extrabold text-xs italic pt-1">
              <Lightbulb className="w-3.5 h-3.5 text-[#D97706] flex-shrink-0" />
              <span>{errorDetails.hint}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
