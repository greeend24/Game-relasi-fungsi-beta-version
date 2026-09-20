import os
import json

def build_scenes():
    public_dir = os.path.abspath('public')
    audio_dir = os.path.join(public_dir, 'audio')
    
    # We will list all files in audio_dir
    all_files = []
    for root, dirs, filenames in os.walk(audio_dir):
        for f in filenames:
            rel = os.path.relpath(os.path.join(root, f), public_dir).replace('\\', '/')
            all_files.append(rel)
            
    print(f"Total audio files found: {len(all_files)}")
    
    scenes = {}
    
    # Helper to find matching files
    def find_files(filter_str):
        return [f for f in all_files if filter_str in f]

    # 1A: Welcome First Login (pagi, siang, sore, malam)
    scenes['1A_pagi'] = [{'file': f, 'character': 'relo'} for f in all_files if 'Login Pertama' in f and '/pagi/' in f]
    scenes['1A_siang'] = [{'file': f, 'character': 'relo'} for f in all_files if 'Login Pertama' in f and '/siang/' in f]
    scenes['1A_sore'] = [{'file': f, 'character': 'relo'} for f in all_files if 'Login Pertama' in f and '/sore/' in f]
    scenes['1A_malam'] = [{'file': f, 'character': 'relo'} for f in all_files if 'Login Pertama' in f and '/malam/' in f]
    
    # 1B: Welcome Returning Login (pagi, siang, sore, malam)
    scenes['1B_pagi'] = [{'file': f, 'character': 'relo'} for f in all_files if 'Login Berikutnya' in f and '/pagi/' in f]
    scenes['1B_siang'] = [{'file': f, 'character': 'relo'} for f in all_files if 'Login Berikutnya' in f and '/siang/' in f]
    scenes['1B_sore'] = [{'file': f, 'character': 'relo'} for f in all_files if 'Login Berikutnya' in f and '/sore/' in f]
    scenes['1B_malam'] = [{'file': f, 'character': 'relo'} for f in all_files if 'Login Berikutnya' in f and '/malam/' in f]
    
    # 2A: Subbab Menu - Masuk (Relo)
    scenes['2A'] = [{'file': f, 'character': 'relo'} for f in all_files if 'Menu Subbab' in f and 'Tidak Memilih' not in f]
    
    # 2B: Subbab Menu - 30 Detik (Relo)
    scenes['2B'] = [{'file': f, 'character': 'relo'} for f in all_files if 'Tidak Memilih 30 Detik' in f]
    
    # 2C: Subbab Menu - 1 Menit (Relo)
    scenes['2C'] = [{'file': f, 'character': 'relo'} for f in all_files if 'Tidak Memilih 1 Menit' in f]
    
    # 8: Exit Game (Relo)
    scenes['8'] = [{'file': f, 'character': 'relo'} for f in all_files if 'Exit' in f and "relo's sound" in f]
    
    # 9: Meninggalkan Stage (Relo)
    scenes['9'] = [{'file': f, 'character': 'relo'} for f in all_files if 'Meninggalkan Stage' in f]
    
    # relo_terbang: Relo Launch (Relo)
    scenes['relo_terbang'] = [{'file': f, 'character': 'relo'} for f in all_files if 'relo terbang' in f]
    
    # 4: Quest Mode Masuk Menu (Snowy)
    scenes['4'] = [{'file': f, 'character': 'snowy'} for f in all_files if "snowy's sound" in f and 'quest mode' in f and 'belum terbuka' not in f]
    
    # 4_locked: Quest Mode Belum Terbuka (Snowy)
    scenes['4_locked'] = [{'file': f, 'character': 'snowy'} for f in all_files if 'belum terbuka' in f]
    
    # 7A: Settings Masuk Menu (Snowy)
    scenes['7A'] = [{'file': f, 'character': 'snowy'} for f in all_files if "snowy's sound" in f and 'Settings - Masuk Menu' in f and 'Menggeser Sound Effect' not in f]
    
    # 7B: Settings Menggeser Sound Effect (Snowy)
    scenes['7B'] = [{'file': f, 'character': 'snowy'} for f in all_files if "snowy's sound" in f and 'Menggeser Sound Effect' in f]
    
    # 6: Global High Score (Ryu)
    scenes['6'] = [{'file': f, 'character': 'ryu'} for f in all_files if "ryu's sound" in f and 'Global High Score' in f]
    
    # 10 / logout: Menu Mengganti Akun (Ryu)
    scenes['10'] = [{'file': f, 'character': 'ryu'} for f in all_files if "ryu's sound" in f and 'mengganti akun' in f]
    scenes['logout'] = scenes['10']
    
    # 5 / rank: Menu Rank (Ryu)
    scenes['5'] = [{'file': f, 'character': 'ryu'} for f in all_files if "ryu's sound" in f and 'Menu Rank' in f]
    scenes['rank'] = scenes['5']

    for k, v in scenes.items():
        print(f"Scene [{k}]: {len(v)} tracks")
        for item in v:
            print(f"   -> /{item['file']}")
            
if __name__ == '__main__':
    build_scenes()
