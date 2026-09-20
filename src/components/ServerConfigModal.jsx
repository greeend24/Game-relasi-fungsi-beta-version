import React, { useState, useEffect } from 'react';
import { 
  Server, Wifi, RefreshCw, CheckCircle2, AlertTriangle, 
  X, HelpCircle, ArrowRight, Laptop, Globe, HardDrive 
} from 'lucide-react';
import { 
  getCustomServerUrl, 
  setCustomServerUrl, 
  testServerConnection, 
  resolveApiBase,
  DEFAULT_NGROK_URL 
} from '../services/apiService';
import { networkStatusService } from '../services/networkStatusService';
import { storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';

export default function ServerConfigModal({ isOpen, onClose }) {
  const [inputUrl, setInputUrl] = useState('');
  const [currentResolved, setCurrentResolved] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // { success: boolean, msg: string }
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [isOnline, setIsOnline] = useState(networkStatusService.isOnline);

  useEffect(() => {
    if (isOpen) {
      const custom = getCustomServerUrl();
      setInputUrl(custom);
      setCurrentResolved(resolveApiBase());
      setTestResult(null);
      setSyncResult(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const unsub = networkStatusService.subscribe((online) => {
      setIsOnline(online);
    });
    return unsub;
  }, []);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    try { audioEngine.playClick(); } catch {}
    setIsTesting(true);
    setTestResult(null);

    const startTime = performance.now();
    const result = await testServerConnection(inputUrl);
    const duration = Math.round(performance.now() - startTime);

    setIsTesting(false);
    if (result.success) {
      try { audioEngine.playCorrect(); } catch {}
      setTestResult({
        success: true,
        msg: `🟢 Terhubung! Respons server dalam ${duration}ms (Status: OK)`,
      });
    } else {
      try { audioEngine.playError(); } catch {}
      setTestResult({
        success: false,
        msg: `🔴 Gagal terhubung ke server! Periksa alamat IP atau apakah laptop host sudah menjalankan server (port 3001).`,
      });
    }
  };

  const handleSave = async () => {
    try { audioEngine.playClick(); } catch {}
    setCustomServerUrl(inputUrl);
    const newBase = resolveApiBase();
    setCurrentResolved(newBase);

    // Trigger immediate health check and sync
    networkStatusService.checkHealth(true);
    const syncRes = await storageService.syncPendingDataToServer();
    
    if (syncRes.success) {
      try { audioEngine.playStageClear?.(); } catch {}
      setSyncResult({
        success: true,
        msg: syncRes.count > 0 
          ? `✅ Alamat server tersimpan! ${syncRes.count} akun/data offline berhasil disinkronkan ke server pusat.`
          : `✅ Alamat server berhasil disimpan & terhubung ke sistem.`,
      });
    } else {
      setSyncResult({
        success: false,
        msg: `⚠️ Alamat tersimpan, namun server belum merespons. Game akan tetap aman berjalan dalam mode offline.`,
      });
    }
  };

  const handleResetDefault = () => {
    try { audioEngine.playClick(); } catch {}
    setInputUrl('');
    setCustomServerUrl('');
    const newBase = resolveApiBase();
    setCurrentResolved(newBase);
    setTestResult(null);
    setSyncResult({
      success: true,
      msg: 'Alamat server dikembalikan ke setelan bawaan sistem.',
    });
    networkStatusService.checkHealth(true);
  };

  const handleSetLocalhost = () => {
    try { audioEngine.playClick(); } catch {}
    const local = 'http://127.0.0.1:3001';
    setInputUrl(local);
  };

  const handleManualSync = async () => {
    try { audioEngine.playClick(); } catch {}
    setIsSyncing(true);
    setSyncResult(null);

    const res = await storageService.syncPendingDataToServer();
    setIsSyncing(false);

    if (res.success) {
      try { audioEngine.playCorrect(); } catch {}
      setSyncResult({
        success: true,
        msg: res.count > 0 
          ? `🎉 Berhasil! ${res.count} data akun & skor baru terkirim ke server pusat.`
          : '👍 Semua data akun dan nilai di laptop ini sudah tersinkronkan lengkap ke server!',
      });
    } else {
      try { audioEngine.playError(); } catch {}
      setSyncResult({
        success: false,
        msg: res.reason === 'offline' 
          ? '❌ Server tidak dapat dihubungi. Pastikan laptop terhubung ke jaringan server.'
          : `❌ Gagal sinkronisasi: ${res.error || 'Terjadi kesalahan'}.`,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in font-hand select-none">
      
      {/* WOODEN BOARD CONTAINER */}
      <div 
        className="relative w-full max-w-lg max-h-[92dvh] p-4 sm:p-6 rounded-3xl bg-cover bg-center border-4 border-[#2D241E] shadow-[8px_10px_0px_#2D241E] text-[#2D241E] flex flex-col items-center space-y-3 sm:space-y-4 overflow-y-auto"
        style={{ backgroundImage: `url('/assets/tampilan di setting/Asset/board_of_settings@4x.png')` }}
      >
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={() => { try { audioEngine.playMenuClose(); } catch {} onClose(); }}
          className="clean-icon-btn rounded-full overflow-hidden absolute top-3 right-3 sm:top-4 sm:right-4 z-30 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
          title="Tutup Pengaturan Server"
        >
          <img 
            src="/assets/tampilan di setting/Asset/exit_button_of_menu@4x.png" 
            alt="Exit" 
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-md rounded-full"
          />
        </button>

        {/* HEADER */}
        <div className="flex flex-col items-center relative -mt-2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#3B82F6]/90 border-2 border-white flex items-center justify-center text-white drop-shadow-md">
            <Server className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h2 className="font-pencil text-xl sm:text-2xl font-black text-white mt-1 uppercase tracking-wider text-center drop-shadow">
            Koneksi Server & Lab
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-bold text-center">
            Sinkronisasi Akun & Progres Siswa Antar-Laptop
          </p>
        </div>

        {/* STATUS BADGE CARD */}
        <div className="w-full bg-[#FFFDF9]/95 rounded-2xl p-3 border-2 border-[#2D241E] shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-3.5 w-3.5">
              {isOnline ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                </>
              ) : (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500 shadow-[0_0_8px_#EF4444]" />
                </>
              )}
            </span>
            <div>
              <div className="text-xs sm:text-sm font-black text-[#2D241E]">
                {isOnline ? '🟢 TERHUBUNG KE SERVER NGROK' : '🔴 MODE OFFLINE LOKAL'}
              </div>
              <div className="text-[10px] sm:text-xs text-[#4B5563] font-bold truncate max-w-[240px] sm:max-w-[320px]">
                {currentResolved || 'Belum diatur'}
              </div>
            </div>
          </div>

          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="pencil-btn px-2.5 py-1.5 bg-[#F59E0B] text-white text-[11px] font-black flex items-center space-x-1 cursor-pointer disabled:opacity-50"
            title="Kirim data offline ke server pusat"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sinkron...' : 'Sync'}</span>
          </button>
        </div>

        {/* INPUT SERVER ADDRESS */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-black text-white flex items-center space-x-1 drop-shadow">
              <Wifi className="w-4 h-4 text-amber-300" />
              <span>Alamat IP Server Guru / Lab:</span>
            </label>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="text-[11px] text-amber-200 hover:text-white font-bold underline flex items-center space-x-0.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showGuide ? 'Tutup Panduan' : 'Cara Sambung Lab'}</span>
            </button>
          </div>

          {/* Quick Guidance Box */}
          {showGuide && (
            <div className="p-3 bg-[#FEF3C7] rounded-xl border-2 border-[#D97706] text-xs font-bold text-[#78350F] space-y-1.5 animate-fade-in shadow-inner">
              <div className="font-black flex items-center space-x-1 text-[#92400E]">
                <Laptop className="w-3.5 h-3.5" />
                <span>Langkah Menghubungkan Laptop di Lab Sekolah (Offline LAN):</span>
              </div>
              <ol className="list-decimal list-inside space-y-0.5 text-[11px] leading-relaxed">
                <li>Sambungkan semua laptop ke Wi-Fi / Hotspot yang sama.</li>
                <li>Di laptop guru (Server), buka CMD lalu ketik <code className="bg-amber-100 px-1 rounded font-mono">ipconfig</code>. Lihat <b>IPv4 Address</b> (misal: 192.168.1.15).</li>
                <li>Ketik di kolom bawah: <code className="bg-amber-100 px-1 rounded font-mono">http://192.168.1.15:3001</code> lalu klik <b>Simpan & Hubungkan</b>.</li>
              </ol>
            </div>
          )}

          <div className="relative">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
                setTestResult(null);
                setSyncResult(null);
              }}
              placeholder="Contoh: http://192.168.1.15:3001"
              className="w-full px-3 py-2 sm:py-2.5 rounded-xl glass-input text-xs sm:text-sm font-bold text-[#2D241E] focus:outline-none border-2 border-[#2D241E] shadow-inner bg-white/95"
            />
          </div>

          {/* QUICK SHORTCUT BUTTONS */}
          <div className="flex items-center space-x-2 pt-0.5">
            <button
              type="button"
              onClick={handleSetLocalhost}
              className="pencil-btn px-2 py-1 bg-white/80 hover:bg-white text-[10px] sm:text-[11px] font-bold text-[#374151] flex items-center space-x-1 cursor-pointer"
            >
              <HardDrive className="w-3 h-3 text-blue-600" />
              <span>Localhost (3001)</span>
            </button>
            <button
              type="button"
              onClick={handleResetDefault}
              className="pencil-btn px-2 py-1 bg-white/80 hover:bg-white text-[10px] sm:text-[11px] font-bold text-[#374151] flex items-center space-x-1 cursor-pointer"
            >
              <Globe className="w-3 h-3 text-emerald-600" />
              <span>Reset Default</span>
            </button>
          </div>
        </div>

        {/* FEEDBACK BANNERS */}
        {testResult && (
          <div className={`w-full p-2.5 rounded-xl border-2 text-xs font-bold flex items-start space-x-2 ${
            testResult.success 
              ? 'bg-[#D1FAE5] border-[#059669] text-[#065F46]' 
              : 'bg-[#FFE4E6] border-[#BE123C] text-[#9F1239]'
          }`}>
            {testResult.success ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
            <span>{testResult.msg}</span>
          </div>
        )}

        {syncResult && (
          <div className={`w-full p-2.5 rounded-xl border-2 text-xs font-bold flex items-start space-x-2 ${
            syncResult.success 
              ? 'bg-[#D1FAE5] border-[#059669] text-[#065F46]' 
              : 'bg-[#FEF3C7] border-[#D97706] text-[#92400E]'
          }`}>
            {syncResult.success ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
            <span>{syncResult.msg}</span>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="w-full flex items-center space-x-2.5 pt-1">
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={isTesting}
            className="pencil-btn flex-1 py-2 sm:py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-black text-xs sm:text-sm flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
            <span>{isTesting ? 'Menguji...' : 'Tes Koneksi'}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="pencil-btn flex-1 py-2 sm:py-2.5 bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Simpan & Sambungkan</span>
          </button>
        </div>

        {/* FOOTER NOTE */}
        <div className="w-full text-center text-[10px] sm:text-[11px] text-white/70 font-bold border-t border-white/20 pt-2">
          Data game tersimpan aman di laptop ini dan otomatis sinkron saat terhubung ke server guru.
        </div>

      </div>

    </div>
  );
}
