import os

def check():
    public_dir = os.path.abspath('public')
    audio_dir = os.path.join(public_dir, 'audio')
    
    files = []
    for root, dirs, filenames in os.walk(audio_dir):
        for f in filenames:
            rel = os.path.relpath(os.path.join(root, f), public_dir).replace('\\', '/')
            files.append(rel)
            
    print(f"Total audio files found on disk: {len(files)}")
    for f in files:
        print(f"  /{f}")

if __name__ == '__main__':
    check()
