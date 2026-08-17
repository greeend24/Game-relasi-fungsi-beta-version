import { storageService } from './storageService';

/**
 * RELO VOICE SCENE AUDIO MAPPING
 * 14 Distinct Scenes with crisp WAV audio tracks & formatted transcripts
 */
const RELO_SCENES = {
  // 1A: Welcome Menu - First Login
  '1A_pagi': [
    {
      file: 'Menu Selamat Datang – Login Pertama/pagi/Selamat pagi! Perkenalkan, aku Detektif Relo. Aku akan menemanimu dalam penyelidikan Relasi dan Fungsi. Siap jadi detektif.wav',
      text: 'Selamat pagi! Perkenalkan, aku Detektif Relo. Aku akan menemanimu dalam penyelidikan Relasi dan Fungsi. Siap jadi detektif?'
    }
  ],
  '1A_siang': [
    {
      file: 'Menu Selamat Datang – Login Pertama/siang/Halo, detektif! Selamat siang Aku Relo, Detektif Relo. Mulai sekarang, kita akan memecahkan berbagai misteri matematika bersama!”.wav',
      text: 'Halo, detektif! Selamat siang! Aku Relo, Detektif Relo. Mulai sekarang, kita akan memecahkan berbagai misteri matematika bersama!'
    }
  ],
  '1A_sore': [
    {
      file: 'Menu Selamat Datang – Login Pertama/sore/Selamat sore! Aku Detektif Relo. Ada banyak misteri tentang Relasi dan Fungsi yang menunggu untuk kita pecahkan. Yuk, mulai penyelidikan!.wav',
      text: 'Selamat sore! Aku Detektif Relo. Ada banyak misteri tentang Relasi dan Fungsi yang menunggu untuk kita pecahkan. Yuk, mulai penyelidikan!'
    }
  ],
  '1A_malam': [
    {
      file: 'Menu Selamat Datang – Login Pertama/malam/Hai, selamat malam! Aku Detektif Relo. Senang akhirnya bertemu denganmu! Aku akan menjadi partner-mu dalam mengungkap rahasia Relasi dan Fungsi..wav',
      text: 'Hai, selamat malam! Aku Detektif Relo. Senang akhirnya bertemu denganmu! Aku akan menjadi partner-mu dalam mengungkap rahasia Relasi dan Fungsi.'
    }
  ],

  // 1B: Welcome Menu - Returning Login
  '1B_pagi': [
    {
      file: 'Menu Selamat Datang – Login Berikutnya/pagi/selamat pagi! Akhirnya kamu kembali juga, Detektif! Relo sudah menunggumu..wav',
      text: 'Selamat pagi! Akhirnya kamu kembali juga, Detektif! Relo sudah menunggumu.'
    }
  ],
  '1B_siang': [
    {
      file: 'Menu Selamat Datang – Login Berikutnya/siang/Hai! Selamat siang! Wah, partner-ku kembali lagi. Sudah siap melanjutkan penyelidikan.wav',
      text: 'Hai! Selamat siang! Wah, partner-ku kembali lagi. Sudah siap melanjutkan penyelidikan?'
    }
  ],
  '1B_sore': [
    {
      file: 'Menu Selamat Datang – Login Berikutnya/sore/selamat sore dan Selamat datang kembali! Aku tahu kamu belum menyerah mengungkap misteri Relasi dan Fungsi.wav',
      text: 'Selamat sore dan selamat datang kembali! Aku tahu kamu belum menyerah mengungkap misteri Relasi dan Fungsi.'
    }
  ],
  '1B_malam': [
    {
      file: 'Menu Selamat Datang – Login Berikutnya/malam/Hei, kamu datang lagi! Selamat malam! Sepertinya masih ada banyak misteri yang belum kita pecahkan..wav',
      text: 'Hei, kamu datang lagi! Selamat malam! Sepertinya masih ada banyak misteri yang belum kita pecahkan.'
    }
  ],

  // 2A: Subbab Menu - Just Entered
  '2A': [
    {
      file: 'Menu Subbab – Baru Masuk/Detektif, waktunya memilih kasus! Tentukan salah satu dari tujuh dunia untuk memulai penyelidikanmu..wav',
      text: 'Detektif, waktunya memilih kasus! Tentukan salah satu dari tujuh dunia untuk memulai penyelidikanmu.'
    },
    {
      file: 'Menu Subbab – Baru Masuk/di depanmu ada tujuh dunia penyelidikan. Pilih salah satunya untuk memulai petualangan!.wav',
      text: 'Di depanmu ada tujuh dunia penyelidikan. Pilih salah satunya untuk memulai petualangan!'
    },
    {
      file: 'Menu Subbab – Baru Masuk/Hmm… aku melihat tujuh lokasi penuh misteri. Yuk, pilih satu dan cari tahu rahasia yang tersembunyi di dalamnya!.wav',
      text: 'Hmm… aku melihat tujuh lokasi penuh misteri. Yuk, pilih satu dan cari tahu rahasia yang tersembunyi di dalamnya!'
    },
    {
      file: 'Menu Subbab – Baru Masuk/Semua kasus sudah menunggumu. Pilih satu dunia di bawah ini dan mari kita mulai penyelidikan!.wav',
      text: 'Semua kasus sudah menunggumu. Pilih satu dunia di bawah ini dan mari kita mulai penyelidikan!'
    }
  ],

  // 2B: Subbab Menu - Idle 30 Seconds
  '2B': [
    {
      file: 'Menu Subbab – Baru Masuk/Menu Subbab – Tidak Memilih 30 Detik/Ayo mulai! Pilih satu dunia di depanmu. Aku penasaran misteri apa yang akan kita temukan..wav',
      text: 'Ayo mulai! Pilih satu dunia di depanmu. Aku penasaran misteri apa yang akan kita temukan.'
    },
    {
      file: 'Menu Subbab – Baru Masuk/Menu Subbab – Tidak Memilih 30 Detik/Hei, Detektif! Kok masih diam saja Yuk, pilih satu dunia untuk mulai menyelidiki!.wav',
      text: 'Hei, Detektif! Kok masih diam saja? Yuk, pilih satu dunia untuk mulai menyelidiki!'
    },
    {
      file: 'Menu Subbab – Baru Masuk/Menu Subbab – Tidak Memilih 30 Detik/Hmm… kamu sedang mencari petunjuk atau malah bingung memilih Ayo, salah satu dunia pasti menarik!.wav',
      text: 'Hmm… kamu sedang mencari petunjuk atau malah bingung memilih? Ayo, salah satu dunia pasti menarik!'
    },
    {
      file: 'Menu Subbab – Baru Masuk/Menu Subbab – Tidak Memilih 30 Detik/jangan cuma dilihat-lihat, Detektif. Kasusnya tidak akan terpecahkan sendiri, lho!.wav',
      text: 'Jangan cuma dilihat-lihat, Detektif. Kasusnya tidak akan terpecahkan sendiri, lho!'
    },
    {
      file: 'Menu Subbab – Baru Masuk/Menu Subbab – Tidak Memilih 30 Detik/Waktunya jalan-jalan ke dunia penyelidikan! Pilih satu, lalu kita mulai!.wav',
      text: 'Waktunya jalan-jalan ke dunia penyelidikan! Pilih satu, lalu kita mulai!'
    }
  ],

  // 2C: Subbab Menu - Idle 60 Seconds
  '2C': [
    {
      file: 'Menu Subbab – Baru Masuk/Menu Subbab – Tidak Memilih 1 Menit/Aku mulai curiga… jangan-jangan kamu sedang menunggu aku yang memilihkan.wav',
      text: 'Aku mulai curiga… jangan-jangan kamu sedang menunggu aku yang memilihkan?'
    },
    {
      file: 'Menu Subbab – Baru Masuk/Menu Subbab – Tidak Memilih 1 Menit/Detektif… kamu masih di sana, kan Jangan bilang kamu ketiduran!.wav',
      text: 'Detektif… kamu masih di sana, kan? Jangan bilang kamu ketiduran!'
    },
    {
      file: 'Menu Subbab – Baru Masuk/Menu Subbab – Tidak Memilih 1 Menit/Halo Detektif Kalau kamu masih di depan layar, ayo pilih dunianya!.wav',
      text: 'Halo Detektif! Kalau kamu masih di depan layar, ayo pilih dunianya!'
    },
    {
      file: 'Menu Subbab – Baru Masuk/Menu Subbab – Tidak Memilih 1 Menit/Hei! Kok layarnya belum berubah juga Kamu lagi mikir keras atau malah ngantuk.wav',
      text: 'Hei! Kok layarnya belum berubah juga? Kamu lagi mikir keras atau malah ngantuk?'
    },
    {
      file: 'Menu Subbab – Baru Masuk/Menu Subbab – Tidak Memilih 1 Menit/Satu menit berlalu… kasusnya masih belum dimulai. Jangan-jangan Detektif-nya sedang tidur jangan sampai relo keluar untuk membangunkanmu ya!.wav',
      text: 'Satu menit berlalu… kasusnya masih belum dimulai. Jangan-jangan Detektif-nya sedang tidur, jangan sampai Relo keluar untuk membangunkanmu ya!'
    }
  ],

  // 3A: Stage Select - New Unplayed Stage
  '3A': [
    {
      file: 'Memilih Stage – Stage Baru/Hmm… aku belum tahu apa yang menunggu di depan. Ayo kita cari tahu bersama!.wav',
      text: 'Hmm… aku belum tahu apa yang menunggu di depan. Ayo kita cari tahu bersama!'
    },
    {
      file: 'Memilih Stage – Stage Baru/ini adalah penyelidikan baru. Siapkan kemampuanmu dan mari kita mulai!.wav',
      text: 'Ini adalah penyelidikan baru. Siapkan kemampuanmu dan mari kita mulai!'
    },
    {
      file: 'Memilih Stage – Stage Baru/Kasus baru telah ditemukan! Yuk, mulai petualangan dan pecahkan misterinya!.wav',
      text: 'Kasus baru telah ditemukan! Yuk, mulai petualangan dan pecahkan misterinya!'
    },
    {
      file: 'Memilih Stage – Stage Baru/Kasus baru, petunjuk baru, tantangan baru! Detektif, waktunya beraksi!.wav',
      text: 'Kasus baru, petunjuk baru, tantangan baru! Detektif, waktunya beraksi!'
    },
    {
      file: 'Memilih Stage – Stage Baru/Petualangan baru menanti! Ikuti setiap petunjuk dan jangan lewatkan satu pun detail..wav',
      text: 'Petualangan baru menanti! Ikuti setiap petunjuk dan jangan lewatkan satu pun detail.'
    }
  ],

  // 3B: Stage Select - Resume Played Stage
  '3B': [
    {
      file: 'Memilih Stage – Melanjutkan Stage/Ah, kasus ini belum selesai! Ayo kita kembali dan tuntaskan sampai akhir..wav',
      text: 'Ah, kasus ini belum selesai! Ayo kita kembali dan tuntaskan sampai akhir.'
    },
    {
      file: 'Memilih Stage – Melanjutkan Stage/Kita sudah memulai kasus ini sebelumnya. Jangan biarkan misterinya menggantung, Detektif!.wav',
      text: 'Kita sudah memulai kasus ini sebelumnya. Jangan biarkan misterinya menggantung, Detektif!'
    },
    {
      file: 'Memilih Stage – Melanjutkan Stage/Lanjutkan penyelidikan! Kita tinggal menyelesaikan bagian yang masih belum terpecahkan..wav',
      text: 'Lanjutkan penyelidikan! Kita tinggal menyelesaikan bagian yang masih belum terpecahkan.'
    },
    {
      file: 'Memilih Stage – Melanjutkan Stage/Petunjuk sebelumnya masih tersimpan. Mari kita lanjutkan dari tempat terakhir kita berhenti..wav',
      text: 'Petunjuk sebelumnya masih tersimpan. Mari kita lanjutkan dari tempat terakhir kita berhenti.'
    },
    {
      file: 'Memilih Stage – Melanjutkan Stage/Yuk, lanjutkan penyelidikan yang sebelumnya.wav',
      text: 'Yuk, lanjutkan penyelidikan yang sebelumnya!'
    }
  ],

  // 4: Quest Mode
  '4': [
    {
      file: 'Quest Mode/Detektif, misi khusus menunggumu! Selesaikan tantangan dalam 30 menit dan kumpulkan skor setinggi mungkin..wav',
      text: 'Detektif, misi khusus menunggumu! Selesaikan tantangan dalam 30 menit dan kumpulkan skor setinggi mungkin.'
    },
    {
      file: 'Quest Mode/Di mode ini, kecepatan dan ketelitian akan diuji. Kamu punya 30 menit. Siap membuktikan kemampuanmu.wav',
      text: 'Di mode ini, kecepatan dan ketelitian akan diuji. Kamu punya 30 menit. Siap membuktikan kemampuanmu?'
    },
    {
      file: 'Quest Mode/Quest Mode dimulai! Waktu adalah tantanganmu. Kerjakan soal dengan cepat, tetapi jangan sampai terburu-buru dan ceroboh..wav',
      text: 'Quest Mode dimulai! Waktu adalah tantanganmu. Kerjakan soal dengan cepat, tetapi jangan sampai terburu-buru dan ceroboh.'
    },
    {
      file: 'Quest Mode/Selamat datang di Quest Mode! Kamu punya waktu 30 menit untuk menyelesaikan misi. Ingat, cepat saja tidak cukup—jawabanmu juga harus tepat!.wav',
      text: 'Selamat datang di Quest Mode! Kamu punya waktu 30 menit untuk menyelesaikan misi. Ingat, cepat saja tidak cukup—jawabanmu juga harus tepat!'
    },
    {
      file: 'Quest Mode/Waktumu terbatas, tapi tenang! Baca setiap soal dengan teliti, gunakan strategimu, dan jangan biarkan waktu mengalahkanmu!.wav',
      text: 'Waktumu terbatas, tapi tenang! Baca setiap soal dengan teliti, gunakan strategimu, dan jangan biarkan waktu mengalahkanmu!'
    }
  ],

  // 5: Badges Menu
  '5': [
    {
      file: 'Menu Lencana/Jangan berhenti di satu lencana! Terus pecahkan kasus, raih skor tinggi, dan lengkapi koleksimu..wav',
      text: 'Jangan berhenti di satu lencana! Terus pecahkan kasus, raih skor tinggi, dan lengkapi koleksimu.'
    },
    {
      file: 'Menu Lencana/Koleksi lencanamu adalah bukti perjalananmu sebagai detektif. Mampukah kamu mendapatkan semuanya.wav',
      text: 'Koleksi lencanamu adalah bukti perjalananmu sebagai detektif. Mampukah kamu mendapatkan semuanya?'
    },
    {
      file: 'Menu Lencana/Lihat lencana-lencana ini! Tingkatkan skor dan prestasimu untuk membuka lencana yang lebih istimewa..wav',
      text: 'Lihat lencana-lencana ini! Tingkatkan skor dan prestasimu untuk membuka lencana yang lebih istimewa.'
    },
    {
      file: 'Menu Lencana/Nah, ini dia koleksi lencana! Semakin hebat pencapaianmu, semakin keren lencana yang bisa kamu dapatkan.wav',
      text: 'Nah, ini dia koleksi lencana! Semakin hebat pencapaianmu, semakin keren lencana yang bisa kamu dapatkan.'
    },
    {
      file: 'Menu Lencana/Setiap lencana punya cerita tentang pencapaianmu. Yuk, kumpulkan semuanya dan buktikan kemampuanmu!.wav',
      text: 'Setiap lencana punya cerita tentang pencapaianmu. Yuk, kumpulkan semuanya dan buktikan kemampuanmu!'
    }
  ],

  // 6: Global High Score (Leaderboard)
  '6': [
    {
      file: 'Global High Score/Hmm… sepertinya ada beberapa detektif yang skornya tinggi sekali. Berani menantang mereka.wav',
      text: 'Hmm… sepertinya ada beberapa detektif yang skornya tinggi sekali. Berani menantang mereka?'
    },
    {
      file: 'Global High Score/Ini adalah skor para detektif lainnya. Jangan mau kalah! Buktikan kemampuanmu dan naikkan peringkatmu..wav',
      text: 'Ini adalah skor para detektif lainnya. Jangan mau kalah! Buktikan kemampuanmu dan naikkan peringkatmu.'
    },
    {
      file: 'Global High Score/Ini dia papan peringkat global! Coba lihat posisimu. Bisa naik lebih tinggi lagi, kan.wav',
      text: 'Ini dia papan peringkat global! Coba lihat posisimu. Bisa naik lebih tinggi lagi, kan?'
    },
    {
      file: 'Global High Score/Papan peringkat sudah menunggu. Terus berlatih, kumpulkan skor, dan jadilah Detektif terbaik!.wav',
      text: 'Papan peringkat sudah menunggu. Terus berlatih, kumpulkan skor, dan jadilah Detektif terbaik!'
    },
    {
      file: 'Global High Score/Wah, banyak detektif hebat di sini! Yuk, tingkatkan skormu dan kejar posisi teratas!.wav',
      text: 'Wah, banyak detektif hebat di sini! Yuk, tingkatkan skormu dan kejar posisi teratas!'
    }
  ],

  // 7A: Settings Menu Opened
  '7A': [
    {
      file: 'Settings – Masuk Menu/Di menu ini kamu bisa mengatur berbagai suara dalam game. Silakan sesuaikan dengan kebutuhanmu..wav',
      text: 'Di menu ini kamu bisa mengatur berbagai suara dalam game. Silakan sesuaikan dengan kebutuhanmu.'
    },
    {
      file: 'Settings – Masuk Menu/Ini ruang pengaturanmu. Mau suara game lebih keras atau lebih pelan Atur saja sesuai keinginanmu..wav',
      text: 'Ini ruang pengaturanmu. Mau suara game lebih keras atau lebih pelan? Atur saja sesuai keinginanmu.'
    },
    {
      file: 'Settings – Masuk Menu/Kalau suara game terasa terlalu keras atau terlalu kecil, kamu bisa mengaturnya di sini..wav',
      text: 'Kalau suara game terasa terlalu keras atau terlalu kecil, kamu bisa mengaturnya di sini.'
    },
    {
      file: 'Settings – Masuk Menu/Nah, di sini kamu bisa mengatur suara game sesuai kenyamananmu..wav',
      text: 'Nah, di sini kamu bisa mengatur suara game sesuai kenyamananmu.'
    },
    {
      file: 'Settings – Masuk Menu/Sebelum lanjut menyelidiki, pastikan pengaturan suaramu sudah nyaman, ya!.wav',
      text: 'Sebelum lanjut menyelidiki, pastikan pengaturan suaramu sudah nyaman, ya!'
    }
  ],

  // 7B: Settings Slider Dragging
  '7B': [
    {
      file: 'Settings – Menggeser Sound Effect/Halo, Detektif! Bisa dengar aku Atur sampai suaranya terasa pas, ya!.wav',
      text: 'Halo, Detektif! Bisa dengar aku? Atur sampai suaranya terasa pas, ya!'
    },
    {
      file: 'Settings – Menggeser Sound Effect/Haloooo! Kedengeran jelas, kan Atau suaraku masih terlalu kecil.wav',
      text: 'Haloooo! Kedengeran jelas, kan? Atau suaraku masih terlalu kecil?'
    },
    {
      file: 'Settings – Menggeser Sound Effect/Nah, coba dengarkan… sudah pas belum suaranya Jangan terlalu besar, nanti aku malah teriak!.wav',
      text: 'Nah, coba dengarkan… sudah pas belum suaranya? Jangan terlalu besar, nanti aku malah teriak!'
    },
    {
      file: 'Settings – Menggeser Sound Effect/Tes, tes… satu, dua! Nah, gimana Volume suaranya sudah pas.wav',
      text: 'Tes, tes… satu, dua! Nah, gimana? Volume suaranya sudah pas?'
    },
    {
      file: 'Settings – Menggeser Sound Effect/Wah, suaraku berubah! Menurutmu sekarang sudah nyaman didengar.wav',
      text: 'Wah, suaraku berubah! Menurutmu sekarang sudah nyaman didengar?'
    }
  ],

  // 8: Exit Game Confirmation Modal
  '8': [
    {
      file: 'ah… kamu mau meninggalkan Relo ya Kalau memang harus pergi, kita lanjutkan penyelidikan lain kali, ya!.wav',
      text: 'Ah… kamu mau meninggalkan Relo ya? Kalau memang harus pergi, kita lanjutkan penyelidikan lain kali, ya!'
    },
    {
      file: 'Eh, tunggu! Kamu benar-benar mau pergi Kita masih punya banyak misteri untuk dipecahkan!.wav',
      text: 'Eh, tunggu! Kamu benar-benar mau pergi? Kita masih punya banyak misteri untuk dipecahkan!'
    },
    {
      file: 'Jangan pergi dulu! Petunjuk berikutnya mungkin sudah menunggu kita..wav',
      text: 'Jangan pergi dulu! Petunjuk berikutnya mungkin sudah menunggu kita.'
    },
    {
      file: 'Lho… kamu mau ninggalin aku Kasus kita belum selesai, Detektif!.wav',
      text: 'Lho… kamu mau ninggalin aku? Kasus kita belum selesai, Detektif!'
    },
    {
      file: 'Mau berhenti sekarang Padahal aku masih penasaran dengan akhir penyelidikan kita….wav',
      text: 'Mau berhenti sekarang? Padahal aku masih penasaran dengan akhir penyelidikan kita…'
    }
  ],

  // 9: Unfinished Stage Exit Confirmation
  '9': [
    {
      file: 'Meninggalkan Stage – Kasus Belum Selesai/Ada apa, Detektif Kenapa kamu meninggalkan kasus ini begitu saja Padahal penyelidikannya belum selesai..wav',
      text: 'Ada apa, Detektif? Kenapa kamu meninggalkan kasus ini begitu saja? Padahal penyelidikannya belum selesai.'
    },
    {
      file: 'Meninggalkan Stage – Kasus Belum Selesai/Hmm… sepertinya kamu berhenti di tengah penyelidikan. Jangan khawatir, kasusnya masih menunggumu!.wav',
      text: 'Hmm… sepertinya kamu berhenti di tengah penyelidikan. Jangan khawatir, kasusnya masih menunggumu!'
    },
    {
      file: 'Meninggalkan Stage – Kasus Belum Selesai/Lho, kok kembali Kasus ini masih belum terpecahkan, Detektif. Kamu yakin mau meninggalkannya.wav',
      text: 'Lho, kok kembali? Kasus ini masih belum terpecahkan, Detektif. Kamu yakin mau meninggalkannya?'
    },
    {
      file: 'Meninggalkan Stage – Kasus Belum Selesai/Tunggu dulu! Kita belum menyelesaikan penyelidikan ini. Ada alasan kamu ingin meninggalkan kasusnya.wav',
      text: 'Tunggu dulu! Kita belum menyelesaikan penyelidikan ini. Ada alasan kamu ingin meninggalkan kasusnya?'
    },
    {
      file: 'Meninggalkan Stage – Kasus Belum Selesai/Yah, padahal kita sudah sejauh ini… Jangan biarkan misterinya menggantung, Detektif..wav',
      text: 'Yah, padahal kita sudah sejauh ini… Jangan biarkan misterinya menggantung, Detektif.'
    }
  ],

  // Relo Terbang Launch Voice
  'relo_terbang': [
    {
      file: 'relo terbang/woooosh, detektif reloo meluncuuuur!!!!.wav',
      text: 'Woooosh, Detektif Relo meluncur!!!!'
    }
  ]
};

class ReloVoiceService {
  constructor() {
    this.reloAudioEl = new Audio();
    this.isSpeaking = false;
    this.subscribers = new Set();
    this.currentScene = null;
    this.lastPlayTime = 0;
    this.lastText = '';

    // Load initial settings from storageService
    const settings = storageService.getAudioSettings();
    this.reloVol = settings.reloVol !== undefined ? settings.reloVol / 100 : 0.8;
    this.isReloOn = settings.isReloOn !== undefined ? settings.isReloOn : true;

    this.reloAudioEl.volume = this.reloVol;

    // Event listeners to drive mouth movement & speaking state
    this.reloAudioEl.addEventListener('play', () => this.setSpeaking(true));
    this.reloAudioEl.addEventListener('ended', () => {
      this.currentScene = null;
      this.setSpeaking(false);
    });
    this.reloAudioEl.addEventListener('pause', () => this.setSpeaking(false));
    this.reloAudioEl.addEventListener('error', () => {
      this.currentScene = null;
      this.setSpeaking(false);
    });
  }

  // Subscribe to speaking state changes (for mouth movement & audio ducking)
  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.isSpeaking);
    return () => this.subscribers.delete(callback);
  }

  setSpeaking(state) {
    this.isSpeaking = state;
    this.subscribers.forEach(cb => {
      try { cb(state); } catch {}
    });
  }

  // Calculate time of day ('pagi' | 'siang' | 'sore' | 'malam')
  getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return 'pagi';
    if (hour >= 11 && hour < 15) return 'siang';
    if (hour >= 15 && hour < 18.5) return 'sore';
    return 'malam';
  }

  setReloVolume(percent) {
    this.reloVol = Math.max(0, Math.min(1, percent / 100));
    this.reloAudioEl.volume = this.reloVol;
    const settings = storageService.getAudioSettings();
    settings.reloVol = percent;
    storageService.saveAudioSettings(settings);

    if (percent === 0) {
      this.stopVoice();
    }
  }

  toggleReloVoice(state) {
    this.isReloOn = state !== undefined ? state : !this.isReloOn;
    const settings = storageService.getAudioSettings();
    settings.isReloOn = this.isReloOn;
    storageService.saveAudioSettings(settings);

    if (!this.isReloOn) {
      this.stopVoice();
    }
    return this.isReloOn;
  }

  // Stop any currently playing voice audio (ENFORCES SINGLE AUDIO CHANNEL)
  stopVoice() {
    try {
      this.reloAudioEl.pause();
      this.reloAudioEl.currentTime = 0;
    } catch {}
    this.currentScene = null;
    this.setSpeaking(false);
  }

  /**
   * Play scene audio & return selected text transcript
   * @param {string} sceneBase - e.g. '1A', '1B', '2A', '2B', '2C', '3A', '3B', '4', '5', '6', '7A', '7B', '8', '9', 'relo_terbang'
   * @param {boolean} isStageContext - if true, readable text is preserved even when muted
   * @param {boolean} forceRestart - force restart voice track
   */
  playScene(sceneBase, isStageContext = false, forceRestart = false) {
    // Complete Relo's current sentence before changing to another line, unless forceRestart is true!
    if (this.isSpeaking && !forceRestart) {
      return { audioPath: this.reloAudioEl.src, text: this.lastText || '...' };
    }

    // ENFORCE SINGLE AUDIO CHANNEL: Stop previous voice audio
    this.stopVoice();

    let key = sceneBase;
    if (sceneBase === '1A' || sceneBase === '1B') {
      key = `${sceneBase}_${this.getTimeOfDay()}`;
    }

    const sceneList = RELO_SCENES[key] || RELO_SCENES['2A'];
    if (!sceneList || sceneList.length === 0) return { audioPath: null, text: '' };

    const randomIndex = Math.floor(Math.random() * sceneList.length);
    const selected = sceneList[randomIndex];

    // Check mute / volume state
    const isMuted = !this.isReloOn || this.reloVol <= 0;

    const returnText = isMuted
      ? (isStageContext ? selected.text : '..............')
      : selected.text;

    this.lastText = returnText;
    this.lastPlayTime = Date.now();
    this.currentScene = sceneBase;

    if (isMuted) {
      return { audioPath: null, text: returnText };
    }

    // Play WAV audio file
    const audioUrl = `/relo/${encodeURI(selected.file)}`;
    this.reloAudioEl.src = audioUrl;
    this.reloAudioEl.volume = this.reloVol;
    this.reloAudioEl.play().catch(() => {
      this.setSpeaking(false);
    });

    return { audioPath: audioUrl, text: returnText };
  }
}

export const reloVoiceService = new ReloVoiceService();
