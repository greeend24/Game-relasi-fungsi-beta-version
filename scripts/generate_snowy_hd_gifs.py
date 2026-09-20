import os
import glob
from PIL import Image

BASE_DIR = os.path.abspath('public/Snowy')
OUTPUT_GIF_DIR = os.path.abspath('public/Snowy/gifs')
OUTPUT_FRAMES_DIR = os.path.abspath('public/Snowy/frames')
ARTIFACT_DIR = os.path.abspath(r'C:\Users\GreeND24\.gemini\antigravity-ide\brain\1c84e26a-946f-4808-8e9b-95be7d6d6957\gifs')

os.makedirs(OUTPUT_GIF_DIR, exist_ok=True)
os.makedirs(OUTPUT_FRAMES_DIR, exist_ok=True)
os.makedirs(ARTIFACT_DIR, exist_ok=True)

# Registration bounding box across all 24 Snowy frames
# Union bbox: (1045, 528, 5366, 6807) on (6408, 7215)
CROP_BOX = (900, 400, 5500, 6950) # (left, top, right, bottom)
TARGET_HEIGHT = 560
crop_w = CROP_BOX[2] - CROP_BOX[0]
crop_h = CROP_BOX[3] - CROP_BOX[1]
TARGET_WIDTH = int(round(TARGET_HEIGHT * (crop_w / crop_h))) # 393 x 560

print(f"Target GIF Resolution: {TARGET_WIDTH}x{TARGET_HEIGHT} (Uniform registered crop from {crop_w}x{crop_h})")

# In-memory cache for processed PNGs to achieve blazingly fast generation
FRAME_CACHE_QUANTIZED = {}
FRAME_CACHE_RGBA = {}

def get_processed_frame(filename):
    if filename in FRAME_CACHE_QUANTIZED:
        return FRAME_CACHE_QUANTIZED[filename]
        
    fp = os.path.join(BASE_DIR, filename)
    if not os.path.exists(fp):
        print(f"  [Error] Frame file not found: {filename}")
        return None
        
    raw_img = Image.open(fp)
    cropped = raw_img.crop(CROP_BOX)
    resized = cropped.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)
    img = resized.convert("RGBA")
    
    # Save optimized standalone PNG frame
    opt_frame_path = os.path.join(OUTPUT_FRAMES_DIR, filename)
    resized.save(opt_frame_path, "PNG", optimize=True)
    
    # Split alpha
    r, g, b, a = img.split()
    clean_alpha = a.point(lambda p: 255 if p > 90 else 0)
    img.putalpha(clean_alpha)
    
    FRAME_CACHE_RGBA[filename] = img
    
    # Create matte background for clean color extraction
    bg = Image.new("RGBA", img.size, (255, 255, 255, 0))
    bg.paste(img, (0, 0), mask=clean_alpha)
    
    rgb_img = bg.convert("RGB")
    quantized = rgb_img.quantize(colors=255, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    
    # Set transparency index to 255
    mask_trans = clean_alpha.point(lambda p: 255 if p == 0 else 0)
    quantized.paste(255, mask_trans)
    
    FRAME_CACHE_QUANTIZED[filename] = quantized
    return quantized

def create_hd_transparent_gif(frame_list, output_names):
    if isinstance(output_names, str):
        output_names = [output_names]
        
    primary_name = output_names[0]
    print(f"Creating Snowy GIF: {primary_name} ({len(frame_list)} frames)...")
    
    processed_frames = []
    durations = []
    
    for filename, dur in frame_list:
        frame = get_processed_frame(filename)
        if frame is not None:
            processed_frames.append(frame)
            durations.append(dur)
            
    if not processed_frames:
        print(f"  [Error] No valid frames for {primary_name}")
        return
        
    first_frame = processed_frames[0]
    other_frames = processed_frames[1:]
    
    for out_name in output_names:
        out_path = os.path.join(OUTPUT_GIF_DIR, out_name)
        art_path = os.path.join(ARTIFACT_DIR, out_name)
        
        first_frame.save(
            out_path,
            save_all=True,
            append_images=other_frames,
            duration=durations,
            loop=0,
            transparency=255,
            disposal=2
        )
        
        first_frame.save(
            art_path,
            save_all=True,
            append_images=other_frames,
            duration=durations,
            loop=0,
            transparency=255,
            disposal=2
        )
        
    size_kb = os.path.getsize(os.path.join(OUTPUT_GIF_DIR, primary_name)) / 1024
    print(f"  -> Generated: {', '.join(output_names)} ({size_kb:.1f} KB)")

def main():
    print("\n--- PRE-CACHING AND OPTIMIZING ALL 24 Snowy SOURCE FRAMES ---")
    all_files = sorted([f for f in os.listdir(BASE_DIR) if f.endswith('.png')])
    for f in all_files:
        get_processed_frame(f)
    print(f"Cached {len(FRAME_CACHE_QUANTIZED)} frames successfully!\n")
    
    print("--- GENERATING ULTRA-HD CRISP Snowy GIF ANIMATIONS ---")
    
    # 1. STANDING / NORMAL IDLE WITH ASYNCHRONOUS EYE BLINKING
    # 1a. Default Idle Blinking
    standing_blinking = [
        ('normal.png', 850),
        ('tutup dua mata.png', 190),
        ('normal.png', 950),
        ('tutup mata kanan.png', 190),
        ('normal.png', 750),
        ('tutup mata kiri.png', 190),
        ('normal.png', 850),
    ]
    create_hd_transparent_gif(standing_blinking, [
        'Snowy_standing_blinking.gif',
        'Snowy_standing_idle.gif',
        'Snowy_standing.gif'
    ])
    
    # 1b. Standing Quest Mode Blinking
    standing_quest = [
        ('normal.png', 400),
        ('tutup mata kanan.png', 180),
        ('normal.png', 1200),
        ('tutup dua mata.png', 190),
        ('normal.png', 700),
        ('tutup mata kiri.png', 180),
        ('normal.png', 800),
    ]
    create_hd_transparent_gif(standing_quest, ['Snowy_standing_blinking_quest.gif'])
    
    # 1c. Standing Chapter Mode Blinking
    standing_chapter = [
        ('normal.png', 1300),
        ('tutup mata kiri.png', 180),
        ('normal.png', 800),
        ('tutup dua mata.png', 190),
        ('normal.png', 900),
        ('tutup mata kanan.png', 180),
        ('normal.png', 600),
    ]
    create_hd_transparent_gif(standing_chapter, ['Snowy_standing_blinking_chapter.gif'])
    
    # 1d. Standing Endless Mode Blinking
    standing_endless = [
        ('normal.png', 700),
        ('tutup dua mata.png', 190),
        ('normal.png', 1400),
        ('tutup mata kanan.png', 180),
        ('normal.png', 500),
        ('tutup mata kiri.png', 180),
        ('normal.png', 1000),
    ]
    create_hd_transparent_gif(standing_endless, ['Snowy_standing_blinking_endless.gif'])
    
    # 1e. Standing Talking (Lip Sync Vowels: Neutral -> A -> I -> O/U -> E -> O/U -> A -> Neutral)
    standing_talking = [
        ('normal.png', 90),
        ('normal A.png', 90),
        ('normal I.png', 90),
        ('NORMAL O dan U.png', 90),
        ('normal E.png', 90),
        ('NORMAL O dan U.png', 90),
        ('normal A.png', 90),
        ('normal.png', 90),
    ]
    create_hd_transparent_gif(standing_talking, ['Snowy_standing_talking.gif'])
    
    # 2. THINKING (MIKIR) POSES
    # 2a. Thinking Idle Blinking
    thinking_blinking = [
        ('mikir.png', 750),
        ('tutup dua mata mikir.png', 180),
        ('mikir.png', 850),
        ('tutup mata kanan mikir.png', 180),
        ('mikir.png', 650),
        ('tutup mata kiri mikir.png', 180),
        ('mikir.png', 750),
    ]
    create_hd_transparent_gif(thinking_blinking, [
        'Snowy_thinking_idle.gif',
        'Snowy_thinking_blinking.gif',
        'Snowy_thinking.gif'
    ])
    
    # 2b. Thinking Talking (Lip Sync Vowels in Thinking Pose)
    thinking_talking = [
        ('mikir.png', 90),
        ('mikir A.png', 90),
        ('mikir I.png', 90),
        ('mikir o dan u.png', 90),
        ('mikir e.png', 90),
        ('mikir o dan u.png', 90),
        ('mikir A.png', 90),
        ('mikir.png', 90),
    ]
    create_hd_transparent_gif(thinking_talking, ['Snowy_thinking_talking.gif'])
    
    # 3. THUMBS UP (JEMPOL) POSES
    # 3a. Thumbs Up Idle Blinking
    thumbsup_blinking = [
        ('jempol.png', 850),
        ('tutup dua mata jempol.png', 190),
        ('jempol.png', 950),
        ('tutup mata kanan jempol.png', 190),
        ('jempol.png', 750),
        ('tutup mata kiri jempol.png', 190),
        ('jempol.png', 850),
    ]
    create_hd_transparent_gif(thumbsup_blinking, [
        'Snowy_thumbsup_idle.gif',
        'Snowy_thumbsup_blinking.gif',
        'Snowy_thumbsup.gif',
        'Snowy_jempol.gif',
        'Snowy_jempol_blinking.gif'
    ])
    
    # 3b. Thumbs Up Talking (Lip Sync Vowels in Thumbs Up Pose)
    thumbsup_talking = [
        ('jempol.png', 90),
        ('jempol A.png', 90),
        ('jempol I.png', 90),
        ('jempol u dan o.png', 90),
        ('jempol e.png', 90),
        ('jempol u dan o.png', 90),
        ('jempol A.png', 90),
        ('jempol.png', 90),
    ]
    create_hd_transparent_gif(thumbsup_talking, [
        'Snowy_thumbsup_talking.gif',
        'Snowy_jempol_talking.gif'
    ])
    
    # 4. EXPRESSIVE COMBO ANIMATIONS
    # 4a. Playful Winking
    winking = [
        ('normal.png', 550),
        ('tutup mata kanan.png', 320),
        ('normal.png', 650),
        ('tutup mata kiri.png', 320),
        ('normal.png', 650),
    ]
    create_hd_transparent_gif(winking, [
        'Snowy_winking.gif',
        'Snowy_wink.gif'
    ])
    
    # 4b. Cheering / Celebrating / Success
    celebrating = [
        ('normal.png', 300),
        ('jempol.png', 400),
        ('tutup mata kanan jempol.png', 300),
        ('jempol.png', 350),
        ('tutup dua mata jempol.png', 300),
        ('jempol.png', 600),
    ]
    create_hd_transparent_gif(celebrating, [
        'Snowy_celebrating.gif',
        'Snowy_cheering.gif',
        'Snowy_success.gif'
    ])
    
    # 4c. Eureka / Aha Idea (Thinking -> Sudden Inspiration -> Thumbs Up)
    eureka = [
        ('mikir.png', 800),
        ('tutup dua mata mikir.png', 200),
        ('mikir.png', 400),
        ('normal.png', 200),
        ('jempol.png', 700),
        ('tutup mata kanan jempol.png', 300),
        ('jempol.png', 700),
    ]
    create_hd_transparent_gif(eureka, [
        'Snowy_idea.gif',
        'Snowy_aha.gif',
        'Snowy_ponder_to_thumbsup.gif'
    ])

    print("\n[SUCCESS] All Snowy HD transparent GIFs and optimized frames generated with 100% perfection!")

if __name__ == '__main__':
    main()

