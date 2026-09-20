import os
import glob
from PIL import Image

BASE_DIR = os.path.abspath('public/Ryu')
OUTPUT_GIF_DIR = os.path.abspath('public/Ryu/gifs')
OUTPUT_FRAMES_DIR = os.path.abspath('public/Ryu/frames')
ARTIFACT_DIR = os.path.abspath(r'C:\Users\GreeND24\.gemini\antigravity-ide\brain\8f1bb144-a09d-489e-b9b5-c9288042b913\gifs')

os.makedirs(OUTPUT_GIF_DIR, exist_ok=True)
os.makedirs(OUTPUT_FRAMES_DIR, exist_ok=True)
os.makedirs(ARTIFACT_DIR, exist_ok=True)

# Registration bounding box across all Ryu frames
# Union bbox: (941, 666, 5384, 6524) on (6408, 7215)
CROP_BOX = (840, 500, 5480, 6700) # (left, top, right, bottom)
TARGET_HEIGHT = 560
crop_w = CROP_BOX[2] - CROP_BOX[0]
crop_h = CROP_BOX[3] - CROP_BOX[1]
TARGET_WIDTH = int(round(TARGET_HEIGHT * (crop_w / crop_h))) # 419 x 560

print(f"Target GIF Resolution: {TARGET_WIDTH}x{TARGET_HEIGHT} (Uniform registered crop from {crop_w}x{crop_h})")

# Ensure normalized filename for typo in source if present
typo_file = os.path.join(BASE_DIR, 'tutup mata kanan mikir.png.png')
clean_file = os.path.join(BASE_DIR, 'tutup mata kanan mikir.png')
if os.path.exists(typo_file) and not os.path.exists(clean_file):
    import shutil
    shutil.copy2(typo_file, clean_file)
    print("Created normalized copy: tutup mata kanan mikir.png")

# In-memory cache for processed PNGs to achieve blazingly fast generation
FRAME_CACHE_QUANTIZED = {}
FRAME_CACHE_RGBA = {}

def get_processed_frame(filename):
    if filename in FRAME_CACHE_QUANTIZED:
        return FRAME_CACHE_QUANTIZED[filename]
        
    fp = os.path.join(BASE_DIR, filename)
    if not os.path.exists(fp):
        # Check alternative naming
        if filename == 'tutup mata kanan mikir.png' and os.path.exists(os.path.join(BASE_DIR, 'tutup mata kanan mikir.png.png')):
            fp = os.path.join(BASE_DIR, 'tutup mata kanan mikir.png.png')
        else:
            print(f"  [Error] Frame file not found: {filename}")
            return None
        
    raw_img = Image.open(fp)
    cropped = raw_img.crop(CROP_BOX)
    resized = cropped.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)
    img = resized.convert("RGBA")
    
    # Save optimized standalone PNG frame
    opt_frame_path = os.path.join(OUTPUT_FRAMES_DIR, filename.replace('.png.png', '.png'))
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
    print(f"Creating Ryu GIF: {primary_name} ({len(frame_list)} frames)...")
    
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
    print("\n--- PRE-CACHING AND OPTIMIZING ALL 24 RYU SOURCE FRAMES ---")
    all_files = sorted([f for f in os.listdir(BASE_DIR) if f.endswith('.png')])
    for f in all_files:
        get_processed_frame(f)
    print(f"Cached {len(FRAME_CACHE_QUANTIZED)} frames successfully!\n")
    
    print("--- GENERATING ULTRA-HD CRISP RYU GIF ANIMATIONS ---")
    
    # 1. STANDING / NORMAL IDLE WITH ASYNCHRONOUS EYE BLINKING
    # 1a. Default Idle Blinking
    standing_blinking = [
        ('normal.png', 850),
        ('tutup mata normal.png', 190),
        ('normal.png', 950),
        ('tutup mata kanan normal.png', 190),
        ('normal.png', 750),
        ('tutup mata kiri normal.png', 190),
        ('normal.png', 850),
    ]
    create_hd_transparent_gif(standing_blinking, [
        'ryu_standing_blinking.gif',
        'ryu_standing_idle.gif',
        'ryu_standing.gif'
    ])
    
    # 1b. Standing Quest Mode Blinking
    standing_quest = [
        ('normal.png', 400),
        ('tutup mata kanan normal.png', 180),
        ('normal.png', 1200),
        ('tutup mata normal.png', 190),
        ('normal.png', 700),
        ('tutup mata kiri normal.png', 180),
        ('normal.png', 800),
    ]
    create_hd_transparent_gif(standing_quest, ['ryu_standing_blinking_quest.gif'])
    
    # 1c. Standing Chapter Mode Blinking
    standing_chapter = [
        ('normal.png', 1300),
        ('tutup mata kiri normal.png', 180),
        ('normal.png', 800),
        ('tutup mata normal.png', 190),
        ('normal.png', 900),
        ('tutup mata kanan normal.png', 180),
        ('normal.png', 600),
    ]
    create_hd_transparent_gif(standing_chapter, ['ryu_standing_blinking_chapter.gif'])
    
    # 1d. Standing Endless Mode Blinking
    standing_endless = [
        ('normal.png', 700),
        ('tutup mata normal.png', 190),
        ('normal.png', 1400),
        ('tutup mata kanan normal.png', 180),
        ('normal.png', 500),
        ('tutup mata kiri normal.png', 180),
        ('normal.png', 1000),
    ]
    create_hd_transparent_gif(standing_endless, ['ryu_standing_blinking_endless.gif'])
    
    # 1e. Standing Talking (Lip Sync Vowels: Neutral -> A -> I -> U/O -> E -> U/O -> A -> Neutral)
    standing_talking = [
        ('normal.png', 90),
        ('normal A.png', 90),
        ('normal I.png', 90),
        ('normal U dan O.png', 90),
        ('normal E.png', 90),
        ('normal U dan O.png', 90),
        ('normal A.png', 90),
        ('normal.png', 90),
    ]
    create_hd_transparent_gif(standing_talking, ['ryu_standing_talking.gif'])
    
    # 2. THINKING (MIKIR) POSES
    # 2a. Thinking Idle Blinking
    thinking_blinking = [
        ('mikir normal.png', 750),
        ('tutup mata mikir.png', 180),
        ('mikir normal.png', 850),
        ('tutup mata kanan mikir.png', 180),
        ('mikir normal.png', 650),
        ('tutup mata kiri mikir.png', 180),
        ('mikir normal.png', 750),
    ]
    create_hd_transparent_gif(thinking_blinking, [
        'ryu_thinking_idle.gif',
        'ryu_thinking_blinking.gif',
        'ryu_thinking.gif'
    ])
    
    # 2b. Thinking Talking (Lip Sync Vowels in Thinking Pose)
    thinking_talking = [
        ('mikir normal.png', 90),
        ('mikir A.png', 90),
        ('mikir I.png', 90),
        ('mikir U.png', 90),
        ('mikir E.png', 90),
        ('mikir U.png', 90),
        ('mikir A.png', 90),
        ('mikir normal.png', 90),
    ]
    create_hd_transparent_gif(thinking_talking, ['ryu_thinking_talking.gif'])
    
    # 3. TANGAN PINGGANG (HANDS ON HIPS / CONFIDENT) POSES
    # 3a. Tangan Pinggang Idle Blinking
    tangan_pinggang_blinking = [
        ('tangan pinggang normal.png', 850),
        ('ngedip dua duanya tangan pinggang.png', 190),
        ('tangan pinggang normal.png', 950),
        ('ngedip kanan tangan pinggang.png', 190),
        ('tangan pinggang normal.png', 750),
        ('ngedip kiri tangan pinggang.png', 190),
        ('tangan pinggang normal.png', 850),
    ]
    create_hd_transparent_gif(tangan_pinggang_blinking, [
        'ryu_tangan_pinggang_idle.gif',
        'ryu_tangan_pinggang_blinking.gif',
        'ryu_tangan_pinggang.gif',
        'ryu_hands_on_hips_idle.gif',
        'ryu_hands_on_hips_blinking.gif',
        'ryu_confident_idle.gif'
    ])
    
    # 3b. Tangan Pinggang Talking (Lip Sync Vowels in Hands on Hips Pose)
    tangan_pinggang_talking = [
        ('tangan pinggang normal.png', 90),
        ('tangan pinggang A.png', 90),
        ('tangan pinggang I.png', 90),
        ('tangan pinggang U.png', 90),
        ('tangan pinggang E.png', 90),
        ('tangan pinggang U.png', 90),
        ('tangan pinggang A.png', 90),
        ('tangan pinggang normal.png', 90),
    ]
    create_hd_transparent_gif(tangan_pinggang_talking, [
        'ryu_tangan_pinggang_talking.gif',
        'ryu_hands_on_hips_talking.gif',
        'ryu_confident_talking.gif'
    ])
    
    # 4. EXPRESSIVE COMBO ANIMATIONS
    # 4a. Playful Winking (Normal stance)
    winking = [
        ('normal.png', 550),
        ('tutup mata kanan normal.png', 320),
        ('normal.png', 650),
        ('tutup mata kiri normal.png', 320),
        ('normal.png', 650),
    ]
    create_hd_transparent_gif(winking, [
        'ryu_winking.gif',
        'ryu_wink.gif'
    ])
    
    # 4b. Hands on Hips Winking (Confident Wink)
    hands_on_hips_wink = [
        ('tangan pinggang normal.png', 550),
        ('ngedip kanan tangan pinggang.png', 320),
        ('tangan pinggang normal.png', 650),
        ('ngedip kiri tangan pinggang.png', 320),
        ('tangan pinggang normal.png', 650),
    ]
    create_hd_transparent_gif(hands_on_hips_wink, [
        'ryu_tangan_pinggang_wink.gif',
        'ryu_hands_on_hips_wink.gif',
        'ryu_confident_wink.gif'
    ])
    
    # 4c. Cheering / Celebrating / Success
    celebrating = [
        ('normal.png', 300),
        ('tangan pinggang normal.png', 400),
        ('ngedip kanan tangan pinggang.png', 300),
        ('tangan pinggang normal.png', 350),
        ('ngedip dua duanya tangan pinggang.png', 300),
        ('tangan pinggang normal.png', 600),
    ]
    create_hd_transparent_gif(celebrating, [
        'ryu_celebrating.gif',
        'ryu_cheering.gif',
        'ryu_success.gif'
    ])
    
    # 4d. Eureka / Aha Idea (Thinking -> Sudden Inspiration -> Confident Akimbo)
    eureka = [
        ('mikir normal.png', 800),
        ('tutup mata mikir.png', 200),
        ('mikir normal.png', 400),
        ('normal.png', 250),
        ('tangan pinggang normal.png', 700),
        ('ngedip kanan tangan pinggang.png', 300),
        ('tangan pinggang normal.png', 700),
    ]
    create_hd_transparent_gif(eureka, [
        'ryu_idea.gif',
        'ryu_aha.gif',
        'ryu_ponder_to_confident.gif'
    ])

    # 4e. Dynamic Stance Shift (Normal -> Thinking -> Hands on Hips)
    stance_shift = [
        ('normal.png', 800),
        ('tutup mata normal.png', 180),
        ('normal.png', 400),
        ('mikir normal.png', 900),
        ('tutup mata mikir.png', 180),
        ('mikir normal.png', 400),
        ('tangan pinggang normal.png', 900),
        ('ngedip kanan tangan pinggang.png', 250),
        ('tangan pinggang normal.png', 800),
    ]
    create_hd_transparent_gif(stance_shift, [
        'ryu_stance_shift.gif',
        'ryu_pose_transition.gif'
    ])

    print("\n[SUCCESS] All Ryu HD transparent GIFs and optimized frames generated with 100% perfection!")

if __name__ == '__main__':
    main()
