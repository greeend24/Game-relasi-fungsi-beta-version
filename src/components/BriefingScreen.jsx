import React from 'react';
import { FileText, Play, CheckCircle2, ShieldCheck, HelpCircle, ArrowLeft } from 'lucide-react';
import DetectiveMascot from './DetectiveMascot';
import { audioEngine } from '../services/audioEngine';

export default function BriefingScreen({ subbabData, onStartStages, onBackToStages }) {
  if (!subbabData) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in my-4 space-y-6">
      
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => { audioEngine.playClick(); onBackToStages(); }}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition font-mono text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu</span>
        </button>

        <span className="text-xs font-mono font-bold text-cyan-400 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
          SUBBAB {subbabData.id} / 5
        </span>
      </div>

      {/* Animated Detective Mascot Live Advice */}
      <div className="flex justify-center sm:justify-start">
        <DetectiveMascot
          emotion="idle"
          message={`Halo Detektif! Pelajari aturan main tantangan "${subbabData.caseTitle}" dan selesaikan stage-nya!` }
          size="md"
        />
      </div>

      {/* Main Briefing Card */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/30 space-y-6 shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <FileText className="w-48 h-48 text-cyan-400" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-xs font-mono text-yellow-400 font-bold uppercase tracking-wider">
            BRIEFING KASUS
          </h3>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100">
            {subbabData.title}
          </h1>
          <p className="text-sm font-semibold text-cyan-400 font-mono">
            Judul Kasus: "{subbabData.caseTitle}"
          </p>
        </div>

        {/* Grid 3 Section Briefing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-sm">
          
          {/* Briefing */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold font-mono text-xs">
              <FileText className="w-4 h-4" />
              <span>BRIEFING KASUS</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {subbabData.briefing}
            </p>
          </div>

          {/* Aturan Main */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-yellow-400 font-bold font-mono text-xs">
              <HelpCircle className="w-4 h-4" />
              <span>ATURAN MAIN</span>
            </div>
            <ul className="space-y-2 text-slate-300 text-xs sm:text-sm">
              {subbabData.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-yellow-400 font-bold font-mono text-xs">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tujuan Level */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold font-mono text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>TUJUAN LEVEL</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {subbabData.goal}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 italic">
               💡 Pemahaman terbentuk lewat stage yang kamu mainkan!
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Kesulitan meningkat bertahap</span>
          </div>

          <button
            onClick={() => { audioEngine.playClick(); onStartStages(); }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold font-mono text-sm tracking-wider bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-500 text-black hover:brightness-110 transition shadow-xl shadow-cyan-500/20 flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5 fill-black" />
            <span>MULAI STAGE</span>
          </button>
        </div>

      </div>

    </div>
  );
}
