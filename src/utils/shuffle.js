/**
 * Fisher-Yates Shuffle Utility
 * Menghasilkan permutasi array acak tanpa memutasi array asli.
 * Digunakan untuk mengacak opsi jawaban soal objektif (MCQ, MCQ_COMPLEX, dll.)
 * agar posisi jawaban benar tidak dapat dihafal polanya oleh siswa.
 */
export function shuffleArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length <= 1) return arr ? [...arr] : [];
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
