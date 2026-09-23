import os

base = r"d:\File Penting\File S2\Thesis Project\Game-Relasi-Fungsi"

docs = [
    ("REVISI_CHAPTER_1_RELASI.md", "Revisi Ch1"),
    ("REVISI_CHAPTER_2_FUNGSI.md", "Revisi Ch2"),
    ("REVISI_CHAPTER_3_NOTASI_RUMUS.md", "Revisi Ch3"),
    ("REVISI_CHAPTER_4_GRAFIK.md", "Revisi Ch4"),
    ("REVISI_CHAPTER_5_KORESPONDENSI.md", "Revisi Ch5"),
    ("REVISI_BAGIAN_QUEST.md", "Revisi Quest"),
    ("REVISI_BAGIAN_ENDLESS.md", "Revisi Endless"),
]

codes = [
    ("src/data/casesData.js", "Chapter Mode Kasus"),
    ("src/data/endlessQuestions.js", "Endless Mode"),
    ("src/data/exercises/exerciseChapter1.js", "Latihan Ch1"),
    ("src/data/exercises/exerciseChapter2.js", "Latihan Ch2"),
    ("src/data/exercises/exerciseChapter3.js", "Latihan Ch3"),
    ("src/data/exercises/exerciseChapter4.js", "Latihan Ch4"),
    ("src/data/exercises/exerciseChapter5.js", "Latihan Ch5"),
    ("src/services/questQuestionsService.js", "Quest Mode"),
]

print("=== DOKUMEN REVISI (.md) ===")
for f, label in docs:
    path = os.path.join(base, f)
    if os.path.exists(path):
        sz = os.path.getsize(path)
        print(f"  {label}: ADA ({sz:,} bytes)")
    else:
        print(f"  {label}: TIDAK ADA")

print()
print("=== KODE SUMBER GAME (.js) - BELUM DIUPDATE ===")
for f, label in codes:
    path = os.path.join(base, f)
    if os.path.exists(path):
        sz = os.path.getsize(path)
        print(f"  {label}: {sz:,} bytes")
    else:
        print(f"  {label}: TIDAK ADA")
