import { storageService } from './storageService';

/**
 * DETECTIVE VOICE SCENE AUDIO MAPPING
 * Supports all 3 Detectives with matching emojis and themes:
 * - Relo 🦉🕵️‍♂️: Chapter Mode, Exit, Welcome (1A/1B), Flight
 * - Snowy 🐻❄️: Quest Mode (4), Settings (7A/7B)
 * - Ryu 🐉🔥: Global High Score (6), Menu Ganti Akun (10/logout), Menu Rank (5/rank)
 */
const RELO_SCENES = {
  // 1A: Welcome Menu - First Login (Relo)
  '1A_pagi': [
    {
      file: "/audio/relo's sound/Menu Selamat Datang - Login Pertama/pagi/Selamat pagi! Perkenalkan, aku Detektif Relo. Aku akan menemanimu dalam penyelidikan Relasi dan Fungsi. Siap jadi detektif.wav",
      text: 'Selamat pagi! ☀️ Perkenalkan, aku Detektif Relo 🦉. Aku akan menemanimu dalam penyelidikan Relasi dan Fungsi. Siap jadi detektif? 🕵️‍♂️🔍',
      character: 'relo'
    }
  ],
  '1A_siang': [
    {
      file: "/audio/relo's sound/Menu Selamat Datang - Login Pertama/siang/Halo, detektif! Selamat siang Aku Relo, Detektif Relo. Mulai sekarang, kita akan memecahkan berbagai misteri matematika bersama!.wav",
      text: 'Halo, detektif! 👋 Selamat siang! 🌤️ Aku Relo, Detektif Relo 🦉. Mulai sekarang, kita akan memecahkan berbagai misteri matematika bersama! 🔍✨',
      character: 'relo'
    }
  ],
  '1A_sore': [
    {
      file: "/audio/relo's sound/Menu Selamat Datang - Login Pertama/sore/Selamat sore! Aku Detektif Relo. Ada banyak misteri tentang Relasi dan Fungsi yang menunggu untuk kita pecahkan. Yuk, mulai penyelidikan!.wav",
      text: 'Selamat sore! 🌅 Aku Detektif Relo 🦉. Ada banyak misteri tentang Relasi dan Fungsi yang menunggu untuk kita pecahkan. Yuk, mulai penyelidikan! 🚀🕵️‍♂️',
      character: 'relo'
    }
  ],
  '1A_malam': [
    {
      file: "/audio/relo's sound/Menu Selamat Datang - Login Pertama/malam/Hai, selamat malam! Aku Detektif Relo. Senang akhirnya bertemu denganmu! Aku akan menjadi partner-mu dalam mengungkap rahasia Relasi dan Fungsi..wav",
      text: 'Hai, selamat malam! 🌙 Aku Detektif Relo 🦉. Senang akhirnya bertemu denganmu! Aku akan menjadi partner-mu dalam mengungkap rahasia Relasi dan Fungsi. 🔎✨',
      character: 'relo'
    }
  ],

  // 1B: Welcome Menu - Returning Login (Relo)
  '1B_pagi': [
    {
      file: "/audio/relo's sound/Menu Selamat Datang - Login Berikutnya/pagi/selamat pagi! Akhirnya kamu kembali juga, Detektif! Relo sudah menunggumu..wav",
      text: 'Selamat pagi! ☀️ Akhirnya kamu kembali juga, Detektif! 🕵️‍♂️ Relo sudah menunggumu 🦉🔍.',
      character: 'relo'
    }
  ],
  '1B_siang': [
    {
      file: "/audio/relo's sound/Menu Selamat Datang - Login Berikutnya/siang/Hai! Selamat siang! Wah, partner-ku kembali lagi. Sudah siap melanjutkan penyelidikan.wav",
      text: 'Hai! Selamat siang! 🌤️ Wah, partner-ku kembali lagi 🦉. Sudah siap melanjutkan penyelidikan? 🔍🕵️‍♂️',
      character: 'relo'
    }
  ],
  '1B_sore': [
    {
      file: "/audio/relo's sound/Menu Selamat Datang - Login Berikutnya/sore/selamat sore dan Selamat datang kembali! Aku tahu kamu belum menyerah mengungkap misteri Relasi dan Fungsi.wav",
      text: 'Selamat sore dan selamat datang kembali! 🌅 Aku tahu kamu belum menyerah mengungkap misteri Relasi dan Fungsi 🦉✨.',
      character: 'relo'
    }
  ],
  '1B_malam': [
    {
      file: "/audio/relo's sound/Menu Selamat Datang - Login Berikutnya/malam/Hei, kamu datang lagi! Selamat malam! Sepertinya masih ada banyak misteri yang belum kita pecahkan..wav",
      text: 'Hei, kamu datang lagi! Selamat malam! 🌙 Sepertinya masih ada banyak misteri yang belum kita pecahkan 🔍🦉.',
      character: 'relo'
    }
  ],

  // 2A: Subbab Menu - Masuk (Relo)
  '2A': [
    {
      file: "/audio/relo's sound/chapter mode/Menu Subbab - Masuk/Chapter Mode ini tempatnya para detektif belajar dan nambah pengetahuan. Yuk, asah kemampuanmu biar makin jago jadi detektif!.wav",
      text: 'Chapter Mode ini tempatnya para detektif belajar dan nambah pengetahuan 📚. Yuk, asah kemampuanmu biar makin jago jadi detektif! 🕵️‍♂️🦉✨',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Menu Subbab - Masuk/pelajari semuanya, ya, Detektif! Semoga nanti kamu bisa jadi detektif yang makin hebat!.wav",
      text: 'Pelajari semuanya ya, Detektif! 📂 Semoga nanti kamu bisa jadi detektif yang makin hebat! 🌟🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Menu Subbab - Masuk/Yuk, lanjut ke menu Stage, Detektif!.wav",
      text: 'Yuk, lanjut ke menu Stage, Detektif! 🗺️🚀🦉',
      character: 'relo'
    }
  ],

  // 2B: Subbab Menu - Tidak Memilih 30 Detik (Relo)
  '2B': [
    {
      file: "/audio/relo's sound/chapter mode/Menu Subbab - Masuk/Menu Subbab - Tidak Memilih 30 Detik/Hei, Detektif! Kok masih bengong aja Pilih satu chapter terus kita mulai penyelidikannya!.wav",
      text: 'Hei, Detektif! Kok masih bengong aja? 😮 Pilih satu chapter terus kita mulai penyelidikannya! 🔍🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Menu Subbab - Masuk/Menu Subbab - Tidak Memilih 30 Detik/Hei, Detektif! Kok masih diam saja Yuk, pilih satu dunia untuk mulai menyelidiki!.wav",
      text: 'Hei, Detektif! Kok masih diam saja? 🕵️‍♂️ Yuk, pilih satu dunia untuk mulai menyelidiki! 🗺️✨',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Menu Subbab - Masuk/Menu Subbab - Tidak Memilih 30 Detik/jangan cuma dilihat-lihat, Detektif. Kasusnya tidak akan terpecahkan sendiri, lho!.wav",
      text: 'Jangan cuma dilihat-lihat, Detektif! 🕵️‍♂️ Kasusnya tidak akan terpecahkan sendiri, lho! 🔍🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Menu Subbab - Masuk/Menu Subbab - Tidak Memilih 30 Detik/lagi ke toiletkah detektif.wav",
      text: 'Lagi ke toilet kah, Detektif? 🚽🤔 Jangan lama-lama ya! 🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Menu Subbab - Masuk/Menu Subbab - Tidak Memilih 30 Detik/Pilih satu chapter yang ada di depanmu. Hmm... kira-kira misteri apa yang bakal kita temuin di sana.wav",
      text: 'Pilih satu chapter yang ada di depanmu. Hmm… kira-kira misteri apa yang bakal kita temuin di sana? 🗺️🔍🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Menu Subbab - Masuk/Menu Subbab - Tidak Memilih 30 Detik/Waktunya jalan-jalan ke dunia penyelidikan! Pilih satu, lalu kita mulai!.wav",
      text: 'Waktunya jalan-jalan ke dunia penyelidikan! 🗺️ Pilih satu, lalu kita mulai! 🚀✨',
      character: 'relo'
    }
  ],

  // 2C: Subbab Menu - Tidak Memilih 1 Menit (Relo)
  '2C': [
    {
      file: "/audio/relo's sound/chapter mode/Menu Subbab - Masuk/Menu Subbab - Tidak Memilih 1 Menit/btw kamu udah 1 menit lo ga ngapa ngapain.wav",
      text: 'BTW, kamu udah 1 menit lho nggak ngapa-ngapain! ⏳ Ayo pilih chapternya, Detektif! 🦉🔍',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Menu Subbab - Masuk/Menu Subbab - Tidak Memilih 1 Menit/Detektif... kamu masih di sana, kan Jangan bilang kamu ketiduran!.wav",
      text: 'Detektif… kamu masih di sana, kan? 🕵️‍♂️ Jangan bilang kamu ketiduran! 😴💤',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Menu Subbab - Masuk/Menu Subbab - Tidak Memilih 1 Menit/Detektiiiiiiiif... kamu masih di sana, kan Jangan-jangan malah ketiduran, nih! banguuun weee detektif.wav",
      text: 'Detektiiiiif… kamu masih di sana, kan? Jangan-jangan malah ketiduran, nih! Banguuun wee, Detektif! ⏰😴🦉',
      character: 'relo'
    }
  ],

  // 3A: Stage Select - New Unplayed Stage (Relo)
  '3A': [
    {
      file: "/audio/relo's sound/chapter mode/Memilih Stage - Stage Baru/Hmm... kira-kira ada apa, ya, di depan Yuk, kita cari tahu bareng!.wav",
      text: 'Hmm… kira-kira ada apa ya di depan? Yuk, kita cari tahu bareng! 🔍🕵️‍♂️🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Memilih Stage - Stage Baru/Oke, Detektif! Ada kasus baru nih. Siapin diri kamu, yuk kita mulai!.wav",
      text: 'Oke, Detektif! Ada kasus baru nih. Siapin diri kamu, yuk kita mulai! 🚀📂🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Memilih Stage - Stage Baru/selamat datang di menu stage, pada menu ini kamu bisa memilih panduan agar pemahaman kamu tentang fungsi makin kuat!.wav",
      text: 'Selamat datang di menu Stage! 🗺️ Pada menu ini kamu bisa memilih panduan agar pemahaman kamu tentang fungsi makin kuat! 📖🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Memilih Stage - Stage Baru/Wah, ada kasus baru nih! Yuk, kita mulai dan cari tahu misterinya!.wav",
      text: 'Wah, ada kasus baru nih! 🔎 Yuk, kita mulai dan cari tahu misterinya! ✨🦉',
      character: 'relo'
    }
  ],

  // 3B: Stage Select - Resume Played Stage (Relo)
  '3B': [
    {
      file: "/audio/relo's sound/chapter mode/Memilih Stage - Melanjutkan Stage/akhirnya kamu kembali lagi, yuk lanjutkan proses belajar kamu agar kamu menjadi detektif hebat seperti aku.wav",
      text: 'Akhirnya kamu kembali lagi! Yuk, lanjutkan proses belajar kamu agar kamu menjadi detektif hebat seperti aku! 🦉🎓✨',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Memilih Stage - Melanjutkan Stage/selamat datang kembali detektif, kita lanjutin yang sebelumnya , siap.wav",
      text: 'Selamat datang kembali, Detektif. Kita lanjutin yang sebelumnya, siap? 📂🕵️‍♂️🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Memilih Stage - Melanjutkan Stage/yuk, Detektif! Kita lanjut lagi penyelidikannya!.wav",
      text: 'Yuk, Detektif! Kita lanjut lagi penyelidikannya! 🚀🔍🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Memilih Stage - Melanjutkan Stage/Yuk, lanjut lagi, Detektif! Tinggal dikit lagi nih, masih ada bagian yang belum kita pecahin!.wav",
      text: 'Yuk, lanjut lagi, Detektif! Tinggal dikit lagi nih, masih ada bagian yang belum kita pecahin! 💡🔎🦉',
      character: 'relo'
    }
  ],

  // 4: Quest Mode - Masuk Menu (Snowy)
  '4': [
    {
      file: "/audio/snowy's sound/quest mode- masuk menu/halo detektif, akulah si lucu dan imut detektif snowyyyyyyy, selamat datang di quest mode, pada quest mode ini, kamu akan mengerjakan soal-soal dari materi chapter mode yang sudah.wav",
      text: 'Halo Detektif! 👋 Akulah si lucu dan imut, Detektif Snowy 🐻❄️. Selamat datang di Quest Mode! Pada Quest Mode ini, kamu akan mengerjakan soal-soal dari materi Chapter Mode yang sudah kamu selesaikan sebelumnya. Lakukan yang terbaik dan jangan berbuat curang, oke? Semangat! ✨🎯',
      character: 'snowy'
    },
    {
      file: "/audio/snowy's sound/quest mode- masuk menu/halo detektif, sudah siap untuk menyelesaikan quest mode! .wav",
      text: 'Halo Detektif, sudah siap untuk menyelesaikan Quest Mode? ❄️🐻🎯',
      character: 'snowy'
    },
    {
      file: "/audio/snowy's sound/quest mode- masuk menu/selamat dataaaang di quest modeeeee!!!!, di quest mode ini kamu akan di dampingi oleh beruang imut ini, jangan sampe lupa ya, namaku snowy, S-N-O-W-Y , selamat mengerjakan detekti.wav",
      text: 'Selamat datang di Quest Mode! 🎉 Di Quest Mode ini, kamu akan didampingi oleh beruang imut ini. Jangan sampai lupa ya, namaku Snowy, S-N-O-W-Y! ❄️🐻 Selamat mengerjakan, detektif manis! ✨',
      character: 'snowy'
    },
    {
      file: "/audio/snowy's sound/quest mode- masuk menu/waktunya quest mode, pada quest mode ini kamu akan mengerjakan soal soal yang materinya tentu sudah kamu pelajari sebelumnya di chapter mode. jangan mudah menyerah detektif, aku y.wav",
      text: 'Waktunya Quest Mode! ⏱️ Pada Quest Mode ini kamu akan mengerjakan soal-soal yang materinya tentu sudah kamu pelajari sebelumnya di Chapter Mode. Jangan mudah menyerah Detektif, aku yakin kamu bisa! 💪🐻❄️',
      character: 'snowy'
    }
  ],

  // 4_locked: Quest Mode Belum Terbuka (Snowy)
  '4_locked': [
    {
      file: "/audio/snowy's sound/quest mode- masuk menu/quest mode belum terbuka karena belum menyelesaikan chapter mode/yaaah maaf detektif, belum ada quest mode yang bisa terbuka untukmuuu, kerjakan chapter mode dulu baru kesini lagi untuk menyelesaikan quest mode yaa, detektif relo sudah tidak sa.wav",
      text: 'Yaaah, maaf Detektif, belum ada Quest Mode yang bisa terbuka untukmu 🥺🐻. Kerjakan Chapter Mode dulu, baru ke sini lagi untuk menyelesaikan Quest Mode ya. Detektif Relo sudah tidak sabar untuk melakukan penyelidikan denganmu! ❄️🔒✨',
      character: 'snowy'
    }
  ],

  // 5 / rank: Menu Rank (Ryu)
  '5': [
    {
      file: "/audio/ryu's sound/Menu Rank/ini merupakan rank yang kamu dapatkan sekarang!!!...., kerjakan banyak tugas dan tingkatkan rank mu dengan memperoleh banyak score!!!!.wav",
      text: 'Ini merupakan rank yang kamu dapatkan sekarang! 🔥 Kerjakan banyak tugas dan tingkatkan rank-mu dengan memperoleh banyak score! 🏆🎖️🐉',
      character: 'ryu'
    },
    {
      file: "/audio/ryu's sound/Menu Rank/rank rank tersebut bisa kamu buka dengan menyelesaikan chapter mode, quest mode dan juga endless mode!!!, ayooo mulai penyelidikan mu sekarang.wav",
      text: 'Rank-rank tersebut bisa kamu buka dengan menyelesaikan Chapter Mode, Quest Mode, dan juga Endless Mode! Ayo mulai penyelidikanmu sekarang! 🔥🚀🐉',
      character: 'ryu'
    },
    {
      file: "/audio/ryu's sound/Menu Rank/selamaat, ini merupakan rank yang kamu peroleh, semangat teruss yaaaa, dan jangan lupa untuk terus jujur pada dirimuuuu!!! jangan pernah mencontek ok!.wav",
      text: 'Selamat! Ini merupakan rank yang kamu peroleh 🎖️. Semangat terus ya, dan jangan lupa untuk selalu jujur pada dirimu, jangan pernah mencontek ok! 🔥✨🐉',
      character: 'ryu'
    }
  ],
  'rank': [
    {
      file: "/audio/ryu's sound/Menu Rank/ini merupakan rank yang kamu dapatkan sekarang!!!...., kerjakan banyak tugas dan tingkatkan rank mu dengan memperoleh banyak score!!!!.wav",
      text: 'Ini merupakan rank yang kamu dapatkan sekarang! 🔥 Kerjakan banyak tugas dan tingkatkan rank-mu dengan memperoleh banyak score! 🏆🎖️🐉',
      character: 'ryu'
    },
    {
      file: "/audio/ryu's sound/Menu Rank/rank rank tersebut bisa kamu buka dengan menyelesaikan chapter mode, quest mode dan juga endless mode!!!, ayooo mulai penyelidikan mu sekarang.wav",
      text: 'Rank-rank tersebut bisa kamu buka dengan menyelesaikan Chapter Mode, Quest Mode, dan juga Endless Mode! Ayo mulai penyelidikanmu sekarang! 🔥🚀🐉',
      character: 'ryu'
    },
    {
      file: "/audio/ryu's sound/Menu Rank/selamaat, ini merupakan rank yang kamu peroleh, semangat teruss yaaaa, dan jangan lupa untuk terus jujur pada dirimuuuu!!! jangan pernah mencontek ok!.wav",
      text: 'Selamat! Ini merupakan rank yang kamu peroleh 🎖️. Semangat terus ya, dan jangan lupa untuk selalu jujur pada dirimu, jangan pernah mencontek ok! 🔥✨🐉',
      character: 'ryu'
    }
  ],

  // 6: Global High Score (Ryu)
  '6': [
    {
      file: "/audio/ryu's sound/Global High Score/Ini adalah skor para detektif lainnya. Jangan mau kalah! Buktikan kemampuanmu dan naikkan peringkatmu..wav",
      text: 'Ini adalah skor para detektif lainnya 🥇. Jangan mau kalah! Buktikan kemampuanmu dan naikkan peringkatmu! 🔥🐉🚀',
      character: 'ryu'
    },
    {
      file: "/audio/ryu's sound/Global High Score/ini merupakan papan peringkat yang menampilkan papan score seluuuuruh pemain.wav",
      text: 'Ini merupakan papan peringkat yang menampilkan skor seluruh pemain! 🏆🔥🐉',
      character: 'ryu'
    },
    {
      file: "/audio/ryu's sound/Global High Score/Papan peringkat berisi tampilan tampilan detektif hebat,kamu siap jadi si nomor 1 atauuuuu... jangan jangan kamu gamau dan terus menjadi orang yang ga mau maju.wav",
      text: 'Papan peringkat berisi detektif-detektif hebat! Kamu siap jadi nomor 1, atau jangan-jangan kamu gak mau maju? Ayo buktikan! 🔥👑🐉',
      character: 'ryu'
    }
  ],

  // 7A: Settings Menu Opened (Snowy)
  '7A': [
    {
      file: "/audio/snowy's sound/Settings - Masuk Menu/Di pengaturan ini kamu bisa mengatur berbagai suara dalam game. Silakan sesuaikan dengan kebutuhanmu..wav",
      text: 'Di pengaturan ini, kamu bisa mengatur berbagai suara dalam game ⚙️. Silakan sesuaikan dengan kebutuhanmu! ❄️🔊🎧',
      character: 'snowy'
    },
    {
      file: "/audio/snowy's sound/Settings - Masuk Menu/ini merupakan menu pengaturan, sesuaikan kebutuhanmu, jangan terlalu berisik yaa, takutnya tetangga kabur! hihihihihi.wav",
      text: 'Ini merupakan menu pengaturan. Sesuaikan kebutuhanmu, jangan terlalu berisik ya, takutnya tetangga kabur! Hihihihi! 🐻❄️😆',
      character: 'snowy'
    },
    {
      file: "/audio/snowy's sound/Settings - Masuk Menu/Kalau suara game terasa terlalu keras atau terlalu kecil, kamu bisa mengaturnya di sini..wav",
      text: 'Kalau suara game terasa terlalu keras atau terlalu kecil, kamu bisa mengaturnya di sini 🎚️❄️🎧.',
      character: 'snowy'
    }
  ],

  // 7B: Settings Slider Dragging (Snowy)
  '7B': [
    {
      file: "/audio/snowy's sound/Settings - Masuk Menu/Settings - Menggeser Sound Effect/dipengaturan ini kamu bisa mengatur sound, audio, dan mengatur suara emasku ini jugaaa, hehehe becanda ya detektif.wav",
      text: 'Di pengaturan ini kamu bisa mengatur sound, audio, dan mengatur suara emasku ini juga! Hehe, bercanda ya Detektif! ❄️🐻✨',
      character: 'snowy'
    },
    {
      file: "/audio/snowy's sound/Settings - Masuk Menu/Settings - Menggeser Sound Effect/tesss tessss tesssss, 1.... 2.... 3...., gimana detektif suaraku udah pas belum takutnya suara emasku ini mengganggu temanmu hahahahahaha!.wav",
      text: 'Tes tes tes tes, satu, dua, tiga 🎙️. Gimana Detektif, suaraku udah pas belum? Takutnya suara emasku ini mengganggu temanmu! Hahahaha! ❄️🐻',
      character: 'snowy'
    },
    {
      file: "/audio/snowy's sound/Settings - Masuk Menu/Settings - Menggeser Sound Effect/udah belum detektif, buruan selesaikan penyelidikan muuu jangan lama lama ngatur ini aja!!.wav",
      text: 'Udah belum Detektif? Buruan selesaikan penyelidikanmu, jangan lama-lama ngatur ini aja!! ⏱️❄️🏃‍♂️',
      character: 'snowy'
    }
  ],

  // 8: Exit Game Confirmation Modal (Relo)
  '8': [
    {
      file: "/audio/relo's sound/Exit - Pemain Menekan Keluar/ah... kamu mau meninggalkan Relo ya Kalau memang harus pergi, kita lanjutkan penyelidikan lain kali, ya!.wav",
      text: 'Ah… kamu mau meninggalkan Relo ya? 🥺 Kalau memang harus pergi, kita lanjutkan penyelidikan lain kali, ya! 👋🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/Exit - Pemain Menekan Keluar/Eh, tunggu! Kamu benar-benar mau pergi Kita masih punya banyak misteri untuk dipecahkan!.wav",
      text: 'Eh, tunggu! 🖐️ Kamu benar-benar mau pergi? Kita masih punya banyak misteri untuk dipecahkan! 🔍🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/Exit - Pemain Menekan Keluar/Jangan pergi dulu! Petunjuk berikutnya mungkin sudah menunggu kita..wav",
      text: 'Jangan pergi dulu! 🛑 Petunjuk berikutnya mungkin sudah menunggu kita! 💡🕵️‍♂️',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/Exit - Pemain Menekan Keluar/Lho... kamu mau ninggalin aku Kasus kita belum selesai, Detektif!.wav",
      text: 'Lho… kamu mau ninggalin aku? 🥺 Kasus kita belum selesai, Detektif! 🕵️‍♂️🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/Exit - Pemain Menekan Keluar/Mau berhenti sekarang Padahal aku masih penasaran dengan akhir penyelidikan kita....wav",
      text: 'Mau berhenti sekarang? 🤔 Padahal aku masih penasaran dengan akhir penyelidikan kita… 🦉🔍',
      character: 'relo'
    }
  ],

  // 9: Unfinished Stage Exit Confirmation (Relo)
  '9': [
    {
      file: "/audio/relo's sound/chapter mode/Meninggalkan Stage - Kasus Belum Selesai/Aduhhh, Detektif!!! 😭 Belum selesai, nih! Yuk, balik lagi. Masih ada yang harus kita cari tahu!.wav",
      text: 'Aduh Detektif, belum selesai nih! 😭 Yuk balik lagi, masih ada yang harus kita cari tahu! 📂🔍🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Meninggalkan Stage - Kasus Belum Selesai/Detektif, kok pergi Padahal kasusnya belum kelar, nih. Yuk, balik lagi!.wav",
      text: 'Detektif, kok pergi? 🛑 Padahal kasusnya belum kelar nih. Yuk, balik lagi! 🔎🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Meninggalkan Stage - Kasus Belum Selesai/Eh, Detektif! Kasus ini belum kelar, tau! Masa misterinya kita tinggal gitu aja Yuk, balik lagi dan cari jawaban.wav",
      text: 'Eh Detektif! Kasus ini belum kelar, tahu! Masa misterinya kita tinggal gitu aja? Yuk, balik lagi dan cari jawabannya! 🕵️‍♂️📂🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Meninggalkan Stage - Kasus Belum Selesai/Eits, tunggu dulu, Detektif! Penyelidikannya belum selesai, nih. Kenapa mau pergi Ada sesuatu, ya.wav",
      text: 'Eits, tunggu dulu, Detektif! ✋ Penyelidikannya belum selesai nih. Kenapa mau pergi? Ada sesuatu ya? ❓🕵️‍♂️🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Meninggalkan Stage - Kasus Belum Selesai/Lhooo, Detektif! Baru juga mulai, kok udah cabut aja sih 😭.wav",
      text: 'Lhoo Detektif! 😭 Baru juga mulai, kok udah cabut aja sih? 💔🦉',
      character: 'relo'
    },
    {
      file: "/audio/relo's sound/chapter mode/Meninggalkan Stage - Kasus Belum Selesai/Mau ke mana sih Buru-buru amat!.wav",
      text: 'Mau ke mana sih? Buru-buru amat! 🏃‍♂️💨🦉',
      character: 'relo'
    }
  ],

  // 10 / logout: Menu Mengganti Akun (Ryu)
  '10': [
    {
      file: "/audio/ryu's sound/menu mengganti akun/kamu mau keluar dari akun ini detektif (, yaudah de babaiii detektif huhuhu.wav",
      text: 'Kamu mau keluar dari akun ini, Detektif? Yaudah deh babaiii detektif, huhuhu... 👋🥺🔥🐉',
      character: 'ryu'
    },
    {
      file: "/audio/ryu's sound/menu mengganti akun/mau ganti akun yaaa.wav",
      text: 'Mau ganti akun yaaa? Sampai jumpa lagi, Detektif! 🔄🔥🐉',
      character: 'ryu'
    }
  ],
  'logout': [
    {
      file: "/audio/ryu's sound/menu mengganti akun/kamu mau keluar dari akun ini detektif (, yaudah de babaiii detektif huhuhu.wav",
      text: 'Kamu mau keluar dari akun ini, Detektif? Yaudah deh babaiii detektif, huhuhu... 👋🥺🔥🐉',
      character: 'ryu'
    },
    {
      file: "/audio/ryu's sound/menu mengganti akun/mau ganti akun yaaa.wav",
      text: 'Mau ganti akun yaaa? Sampai jumpa lagi, Detektif! 🔄🔥🐉',
      character: 'ryu'
    }
  ],

  // Relo Terbang Launch Voice (Relo)
  'relo_terbang': [
    {
      file: "/audio/relo's sound/relo terbang/woooosh, detektif reloo meluncuuuur!!!!.wav",
      text: 'Woooosh, Detektif Relo meluncur!!!! 🚀🦉✨',
      character: 'relo'
    }
  ]
};

class ReloVoiceService {
  constructor() {
    this.reloAudioEl = new Audio();
    this.isSpeaking = false;
    this.currentSpeaker = null;
    this.subscribers = new Set();
    this.currentScene = null;
    this.lastPlayTime = 0;
    this.lastSceneRequested = null;
    this.lastText = '';
    this.audioCache = new Map();
    this.pendingAudio = null;

    // Load initial settings from storageService
    const settings = storageService.getAudioSettings();
    this.reloVol = settings.reloVol !== undefined ? settings.reloVol / 100 : 0.8;
    this.isReloOn = settings.isReloOn !== undefined ? settings.isReloOn : true;

    this.reloAudioEl.volume = this.reloVol;

    // Preload voice files asynchronously in background for 0ms latency
    setTimeout(() => this.preloadVoiceFiles(), 200);

    // Persistent auto-unlock & retry playback on ANY user interaction
    if (typeof window !== 'undefined') {
      const unlock = () => {
        if (this.pendingAudio && this.isReloOn && this.reloVol > 0) {
          const audioToPlay = this.pendingAudio;
          this.pendingAudio = null;
          this.stopVoice();
          this.reloAudioEl = audioToPlay;
          this.reloAudioEl.currentTime = 0;
          this.reloAudioEl.volume = this.reloVol;
          this.reloAudioEl.play().then(() => {
            this.setSpeaking(true, this.currentSpeaker || 'relo');
          }).catch((e) => {
            console.warn('[reloVoice] unlock retry deferred:', e);
          });
        }
      };

      ['pointerdown', 'mousedown', 'click', 'keydown', 'touchstart'].forEach(evt => {
        window.addEventListener(evt, unlock, { passive: true });
      });
    }
  }

  setupAudioListeners(audioEl) {
    audioEl.addEventListener('play', () => {
      this.setSpeaking(true, this.currentSpeaker || 'relo');
    });
    audioEl.addEventListener('ended', () => {
      this.currentScene = null;
      this.setSpeaking(false, null);
    });
    audioEl.addEventListener('pause', () => {
      this.setSpeaking(false, null);
    });
    audioEl.addEventListener('error', (e) => {
      console.warn('[reloVoice] Audio element error for:', audioEl.src, e);
      this.currentScene = null;
      this.setSpeaking(false, null);
    });
  }

  preloadVoiceFiles() {
    try {
      // Smart Preload: Only preload the current time-of-day welcome voice to prevent network pipeline choking
      const timeOfDay = this.getTimeOfDay();
      const initialScenes = [
        RELO_SCENES[`1A_${timeOfDay}`]?.[0]?.file,
        RELO_SCENES[`1B_${timeOfDay}`]?.[0]?.file
      ].filter(Boolean);

      initialScenes.forEach(rawUrl => {
        const url = encodeURI(rawUrl);
        if (!this.audioCache.has(url)) {
          const audio = new Audio(url);
          audio.preload = 'auto';
          this.setupAudioListeners(audio);
          this.audioCache.set(url, audio);
        }
      });
    } catch {}
  }

  // Subscribe to speaking state changes (passes isSpeaking and speaker character)
  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.isSpeaking, this.currentSpeaker);
    return () => this.subscribers.delete(callback);
  }

  setSpeaking(state, speaker = null) {
    this.currentSpeaker = state ? (speaker || this.currentSpeaker || 'relo') : null;
    this.isSpeaking = state;
    this.subscribers.forEach(cb => {
      try { cb(state, this.currentSpeaker); } catch {}
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
    if (this.reloAudioEl) this.reloAudioEl.volume = this.reloVol;
    this.audioCache.forEach(audio => {
      if (audio) audio.volume = this.reloVol;
    });

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
    this.pendingAudio = null;
    try {
      if (this.reloAudioEl) {
        this.reloAudioEl.pause();
        this.reloAudioEl.currentTime = 0;
      }
      this.audioCache.forEach(audio => {
        if (audio && !audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    } catch {}
    this.currentScene = null;
    this.setSpeaking(false, null);
  }

  stopAll() {
    this.stopVoice();
  }

  /**
   * Play scene audio & return selected text transcript
   * @param {string} sceneBase - e.g. '1A', '1B', '2A', '2B', '2C', '3A', '3B', '4', '4_locked', '5', '6', '7A', '7B', '8', '9', '10', 'logout', 'rank', 'relo_terbang'
   * @param {boolean} isStageContext - if true, readable text is preserved even when muted
   * @param {boolean} forceRestart - force restart voice track
   */
  playScene(sceneBase, isStageContext = false, forceRestart = true) {
    const now = Date.now();
    // Debounce duplicate invocations within 350ms for same scene
    if (now - this.lastPlayTime < 350 && this.lastSceneRequested === sceneBase && !forceRestart) {
      return { audioPath: null, text: this.lastText, character: this.currentSpeaker || 'relo' };
    }

    // ENFORCE SINGLE AUDIO CHANNEL: Always stop previous voice line
    this.stopVoice();

    let key = sceneBase;
    if (sceneBase === '1A' || sceneBase === '1B') {
      key = `${sceneBase}_${this.getTimeOfDay()}`;
    }

    const sceneList = RELO_SCENES[key] || RELO_SCENES['2A'];
    if (!sceneList || sceneList.length === 0) return { audioPath: null, text: '', character: 'relo' };

    const randomIndex = Math.floor(Math.random() * sceneList.length);
    const selected = sceneList[randomIndex];
    const activeChar = selected.character || 'relo';

    const isSpecialAction = sceneBase === 'relo_terbang';
    const isMuted = !isSpecialAction && (!this.isReloOn || this.reloVol <= 0);

    const returnText = isMuted ? '(. . . . . . . . . . . . . . . )' : selected.text;

    this.lastText = returnText;
    this.lastPlayTime = now;
    this.lastSceneRequested = sceneBase;
    this.currentScene = sceneBase;
    this.currentSpeaker = activeChar;

    if (isMuted) {
      this.setSpeaking(false, null);
      return { audioPath: null, text: '(. . . . . . . . . . . . . . . )', character: activeChar };
    }

    // Play WAV audio file directly from clean path (encoded for standard browser compatibility)
    const audioUrl = encodeURI(selected.file);
    let targetAudio = this.audioCache.get(audioUrl);

    if (!targetAudio) {
      targetAudio = new Audio(audioUrl);
      targetAudio.preload = 'auto';
      this.setupAudioListeners(targetAudio);
      this.audioCache.set(audioUrl, targetAudio);
    }

    const effectiveVol = isSpecialAction ? (this.reloVol > 0 ? this.reloVol : 0.8) : this.reloVol;

    this.reloAudioEl = targetAudio;
    this.reloAudioEl.currentTime = 0;
    this.reloAudioEl.volume = effectiveVol;

    const playPromise = this.reloAudioEl.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.pendingAudio = null;
        this.setSpeaking(true, activeChar);
      }).catch((err) => {
        console.warn('[reloVoice] Play was blocked by browser autoplay policy. Queued for user interaction:', err);
        this.pendingAudio = targetAudio;
        this.setSpeaking(false, null);
      });
    }

    return { audioPath: audioUrl, text: returnText, character: activeChar };
  }
}

export const reloVoiceService = new ReloVoiceService();
