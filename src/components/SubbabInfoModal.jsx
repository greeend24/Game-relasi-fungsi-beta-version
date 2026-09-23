import React from 'react';
import { BookOpen, FileText, HelpCircle, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

const CHAPTER_MATH_SYMBOLS = {
  1: '• R: A → B : Aturan relasi yang memasangkan himpunan A ke B\n• Bebas Cabang : Elemen asal boleh bercabang ke banyak kawan atau kosong\n• 4 Cara Menyatakan : Diagram Panah, Pasangan Berurutan {(x, y)}, Kartesius, dan Tabel',
  2: '• f: A → B : Fungsi dari himpunan A ke B (relasi khusus)\n• Domain (Df) : Seluruh anggota daerah asal A (wajib tepat satu kawan)\n• Kodomain (Kf) : Seluruh anggota daerah kawan B\n• Range (Rf) : Daerah hasil (anggota B yang memiliki kawan)',
  3: '• f(x) = ax + b : Bentuk umum rumus fungsi linear\n• x : Variabel anggota daerah asal\n• f(x) : Nilai fungsi / bayangan hasil pemetaan\n• a : Koefisien pengali x\n• b : Konstanta fungsi',
  4: '• (x, y) = (x, f(x)) : Titik koordinat pada bidang Kartesius\n• Titik Potong Sumbu Y : Terjadi saat x = 0 → (0, b)\n• Titik Potong Sumbu X : Terjadi saat f(x) = 0\n• Gradien (m) : Nilai kemiringan garis m = a atau m = (y₂−y₁)/(x₂−x₁)',
  5: '• n(A) = n(B) : Syarat mutlak korespondensi satu-satu\n• n! (n Faktorial) : n × (n−1) × ... × 2 × 1 = Banyak kemungkinan korespondensi\n• Satu Lawan Satu : Setiap elemen punya tepat 1 pasangan unik timbal balik'
};

export default function SubbabInfoModal({ isOpen, onClose, subbabData }) {
  if (!isOpen || !subbabData) return null;

  const title = subbabData.title || `Chapter ${subbabData.id}`;
  const caseTitle = subbabData.caseTitle || subbabData.subtitle || title;
  const briefing = subbabData.briefing || subbabData.subtitle || 'Pelajari konsep materi fungsi ini secara bertahap melalui slide interaktif dan kuis adaptif.';
  const rules = subbabData.rules || [
    'Pelajari setiap segmen materi secara seksama.',
    'Jawab kuis adaptif di setiap segmen untuk menguji pemahaman.',
    'Jika jawaban belum tepat, pelajari penjelasan sederhana (remedial) & coba soal serupa.'
  ];
  const goal = subbabData.goal || 'Menuntaskan seluruh segmen materi dan kuis untuk membuka chapter berikutnya serta Quest Mode.';
  const symbolExplanation = CHAPTER_MATH_SYMBOLS[subbabData.id];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-hand">
      <div className="relative w-full max-w-3xl max-h-[92dvh] p-4 sm:p-5 rounded-3xl bg-cover bg-center border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-[#2D241E] space-y-2.5 overflow-y-auto no-scrollbar select-none"
        style={{ backgroundImage: "url('/assets/tampilan di setting/Asset/board_of_settings@4x.png')" }}>
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b-2 border-white/20">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-[#FEF3C7] border-2 border-[#2D241E] text-[#D97706]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-pencil text-[#FEF3C7] leading-tight">
                Info Chapter {subbabData.id}
              </h2>
              <p className="text-xs text-[#FDE68A] font-bold">{title} {subbabData.subtitle ? `- "${subbabData.subtitle}"` : ''}</p>
            </div>
          </div>
          <button 
            onClick={() => { try { audioEngine.playClick(); } catch {} onClose(); }}
            className="clean-icon-btn rounded-full overflow-hidden hover:scale-110 active:scale-95 transition-transform cursor-pointer"
            title="Tutup Menu"
          >
            <img 
              src="/assets/tampilan di setting/Asset/exit_button_of_menu@4x.png" 
              alt="Close" 
              className="w-10 h-10 object-contain rounded-full drop-shadow-md"
            />
          </button>
        </div>

        {/* 3 Section Compact Grid Briefing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
          
          <div className="p-3 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] space-y-1">
            <div className="flex items-center space-x-1.5 text-[#0284C7] font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>RINGKASAN MATERI</span>
            </div>
            <p className="text-[#4A3E3D] font-bold leading-snug text-[11px]">
              {briefing}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFFDF9] border-2 border-[#2D241E] shadow-[2px_2px_0px_#2D241E] space-y-1">
            <div className="flex items-center space-x-1.5 text-[#D97706] font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>ALUR BELAJAR</span>
            </div>
            <ul className="space-y-1 text-[#4A3E3D] font-bold text-[11px]">
              {rules.map((rule, idx) => (
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
              <span>TUJUAN CHAPTER</span>
            </div>
            <p className="text-[#4A3E3D] font-bold leading-snug text-[11px]">
              {goal}
            </p>
          </div>

        </div>

        {/* DETEKTIF RELO MATH SYMBOL EXPLANATION BANNER */}
        {symbolExplanation && (
          <div className="p-3 rounded-2xl bg-[#EFF6FF] border-2 border-[#2563EB] shadow-[2px_3px_0px_#2D241E] text-[#1E3A8A] text-xs font-hand space-y-1">
            <div className="flex items-center space-x-1.5 font-black text-[#1E40AF]">
              <span>🕵️‍♂️</span>
              <span>SIMBOL & ISTILAH MATEMATIKA DETEKTIF RELO</span>
            </div>
            <p className="font-bold text-[11px] leading-relaxed whitespace-pre-line text-[#1E3A8A]">
              {symbolExplanation}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
