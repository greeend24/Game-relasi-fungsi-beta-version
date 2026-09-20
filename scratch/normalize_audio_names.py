import os

def normalize_audio():
    audio_dir = os.path.abspath('public/audio')
    
    # 1. Rename files first
    for root, dirs, files in os.walk(audio_dir, topdown=False):
        for f in files:
            old_path = os.path.join(root, f)
            new_name = f.replace('\u2013', '-').replace('\u2014', '-').replace('\u2026', '...').replace('\u201d', '').replace('\u201c', '')
            if new_name != f:
                new_path = os.path.join(root, new_name)
                os.rename(old_path, new_path)
                print(f"Renamed file: {f} -> {new_name}")
                
    # 2. Rename directories
    for root, dirs, files in os.walk(audio_dir, topdown=False):
        for d in dirs:
            old_path = os.path.join(root, d)
            new_name = d.replace('\u2013', '-').replace('\u2014', '-').replace('\u2026', '...').replace('\u201d', '').replace('\u201c', '')
            if new_name != d:
                new_path = os.path.join(root, new_name)
                os.rename(old_path, new_path)
                print(f"Renamed dir: {d} -> {new_name}")

if __name__ == '__main__':
    normalize_audio()
