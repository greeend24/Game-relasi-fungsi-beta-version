import React from 'react';
import { CheckCircle2, Lightbulb } from 'lucide-react';

/**
 * CaseWorkspacePanel - Kontainer Area Kerja Interaktif Kasus Detektif
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
    <div className="flex-1 h-full min-h-0 flex flex-col justify-between font-hand relative z-20 overflow-hidden space-y-1 sm:space-y-1.5">
      
      {/* Interactive Workspace Children wrapped in authentic frosted glass-panel */}
      <div className="flex-1 min-h-0 p-2.5 sm:p-3.5 rounded-3xl glass-panel glass-sheen border-2 border-white/80 shadow-lg flex flex-col justify-between relative z-20 overflow-hidden">
        {children}
      </div>

      {/* Compact Error Evaluation (Scaled to min 20px) */}
      {errorDetails && (
        <div className="p-2.5 sm:p-3 rounded-2xl bg-[#FFE4E6]/90 backdrop-blur-md border-2.5 border-[#BE123C] shadow-[2px_3px_0px_#BE123C] space-y-1.5 animate-fade-in relative z-30 flex-shrink-0">
          <div className="flex items-center space-x-2 text-[#BE123C] font-black uppercase tracking-wider text-sm sm:text-base lg:text-[18px] border-b border-[#FECDD3] pb-1">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{errorDetails.title || 'CATATAN PETUNJUK DETEKTIF'}</span>
          </div>
          
          <div className="space-y-1">
            {errorDetails.reasons.map((r, idx) => (
              <p key={idx} className="p-1.5 rounded-xl glass-panel-subtle border border-[#BE123C]/40 text-[#BE123C] font-bold text-base sm:text-lg lg:text-[20px] leading-snug">
                {r}
              </p>
            ))}
            {errorDetails.hint && (
              <div className="flex items-center space-x-1.5 text-[#B45309] font-extrabold text-base sm:text-lg lg:text-[20px] italic pt-1">
                <Lightbulb className="w-5 h-5 text-[#D97706] flex-shrink-0" />
                <span className="break-words">{errorDetails.hint}</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
