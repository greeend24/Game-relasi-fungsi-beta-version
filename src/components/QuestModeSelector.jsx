import React from 'react';
import { ArrowLeft, Play, ShieldAlert, Award, Clock } from 'lucide-react';
import { SUBBABS_DATA } from '../data/casesData';
import ProfessorOwlMascot from './ProfessorOwlMascot';
import { audioEngine } from '../services/audioEngine';

/**
 * QuestModeSelector
 * Displays Subbabs in a vertical downward stacked menu bar ("susun kebawah")
 * with a "Start Quest" button for each subbab.
 */
export default function QuestModeSelector({ onBackToMenu, onStartQuestSubbab }) {
  return (
    <div className="max-w-3xl mx-auto my-4 p-4 font-hand space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-white border-3 border-[#2D241E] shadow-[4px_5px_0px_#2D241E]">
        <button
          onClick={() => { audioEngine.playClick(); onBackToMenu(); }}
          onMouseEnter={() => audioEngine.playHover()}
          className="pencil-btn px-4 py-2 bg-[#FFFDF9] text-[#2D241E] font-extrabold text-xs flex items-center space-x-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu Utama</span>
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold font-pencil text-[#2D241E]">
          QUEST MODE: UJIAN 30 SOAL
        </h2>
      </div>

      {/* Mascot Assistant */}
      <div className="flex justify-center sm:justify-start">
        <ProfessorOwlMascot
          pose="exploring"
          emotion="idle"
          message="Pilih Subbab Ujian Quest Mode di bawah. Kamu memiliki waktu 30 menit untuk menjawab 30 soal tanpa bantuan petunjuk!"
          size="md"
        />
      </div>

      {/* Info Card */}
      <div className="p-4 rounded-3xl bg-[#FEF3C7] border-2 border-[#2D241E] shadow-[3px_4px_0px_#2D241E] space-y-1 text-xs sm:text-sm font-bold text-[#78350F]">
        <div className="flex items-center space-x-2 text-[#D97706] uppercase">
          <Clock className="w-5 h-5" />
          <span>KETENTUAN QUEST MODE:</span>
        </div>
        <ul className="list-disc list-inside space-y-0.5 text-[#4A3E3D] font-medium">
          <li>Durasi Waktu Total: 30 Menit (1800 Detik)</li>
          <li>Jumlah Soal: 30 Soal Ujian per Subbab</li>
          <li>Bebas berpindah nomor soal (misal #1 ke #5) setelah menekan tombol Start</li>
          <li>Skala Nilai Akhir: 0 – 100 (Hitungan Benar & Salah)</li>
          <li>Tidak ada tombol petunjuk / hint di dalam ujian</li>
        </ul>
      </div>

      {/* VERTICAL DOWNWARD STACKED SUBBAB MENU BAR ("SUSUN KEBAWAH") */}
      <div className="flex flex-col space-y-3 font-hand">
        {Object.values(SUBBABS_DATA).map((sub) => (
          <div
            key={sub.id}
            className="pencil-btn p-4 bg-white border-2.5 border-[#2D241E] shadow-[4px_4px_0px_#2D241E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#D97706]">SUBBAB UJIAN {sub.id}</span>
              <h3 className="text-xl font-bold font-pencil text-[#2D241E]">{sub.title}</h3>
              <p className="text-xs text-[#4A3E3D] font-medium">"{sub.caseTitle}" — 30 Soal Evaluasi</p>
            </div>

            <button
              onClick={() => {
                audioEngine.playClick();
                onStartQuestSubbab(sub.id);
              }}
              onMouseEnter={() => audioEngine.playHover()}
              className="pencil-btn px-5 py-3 bg-[#FDE68A] text-[#78350F] font-extrabold text-sm flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <Play className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
              <span>Start Quest Subbab {sub.id}</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
