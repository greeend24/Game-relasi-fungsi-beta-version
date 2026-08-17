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
    <div className="w-full flex-1 flex flex-col justify-between min-h-0 font-hand relative z-20 space-y-1.5 overflow-hidden">
      
      {/* Interactive Workspace Children */}
      <div className="flex-1 flex flex-col justify-between min-h-0 relative z-20 space-y-1.5 overflow-hidden">
        {children}
      </div>

      {/* Menganalisis dan Mengevaluasi Proses Pemecahan Masalah (Error Evaluation) */}
      {errorDetails && (
        <div className="p-2 sm:p-2.5 rounded-2xl bg-[#FFE4E6] border-2 border-[#BE123C] shadow-[2px_2px_0px_#BE123C] space-y-1 animate-fade-in relative z-30 text-xs flex-shrink-0">
          <div className="flex items-center space-x-1.5 text-[#BE123C] font-black uppercase tracking-wider text-[10px] sm:text-xs border-b border-[#FECDD3] pb-0.5">
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>EVALUASI KESALAHAN PEMECAHAN</span>
          </div>
          
          <div className="space-y-0.5">
            {errorDetails.reasons.map((r, idx) => (
              <p key={idx} className="p-1.5 rounded-lg bg-white border border-[#BE123C]/40 text-[#BE123C] font-bold text-[11px] leading-snug">
                {r}
              </p>
            ))}
            {errorDetails.hint && (
              <div className="flex items-center space-x-1 text-[#B45309] font-extrabold text-[10px] sm:text-[11px] italic pt-0.5">
                <Lightbulb className="w-3 h-3 text-[#D97706] flex-shrink-0" />
                <span className="truncate">{errorDetails.hint}</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
