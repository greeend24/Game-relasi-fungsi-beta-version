import os
import glob
from PIL import Image

BASE_DIR = os.path.abspath('public/relo/relo animation')
OUTPUT_DIR = os.path.abspath('public/relo/gifs')
ARTIFACT_DIR = os.path.abspath(r'C:\Users\GreeND24\.gemini\antigravity-ide\brain\25528442-b755-4566-a65f-bdeb4b89c913\gifs')

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ARTIFACT_DIR, exist_ok=True)

def create_hd_transparent_gif(frame_list, output_name, duration_ms=250):
    print(f"Creating Ultra-HD Crisp GIF: {output_name} ({len(frame_list)} frames)...")
    
    processed_frames = []
    
    for item in frame_list:
        if isinstance(item, tuple):
            fp, dur = item
        else:
            fp, dur = item, duration_ms
            
        if not os.path.exists(fp):
            print(f"  Warning: File not found {fp}")
            continue
            
        # Open frame and convert to full 32-bit RGBA
        raw_img = Image.open(fp)
        img = raw_img.convert("RGBA")
        
        # Split RGB and Alpha
        r, g, b, a = img.split()
        
        # Clean alpha mask (crisp binary cutoff at 128 - eliminates edge noise and dark fringes)
        clean_alpha = a.point(lambda p: 255 if p > 90 else 0)
        
        # Put clean alpha back
        img.putalpha(clean_alpha)
        
        # Create solid canvas with white/neutral matte for background-less color quantization
        bg = Image.new("RGBA", img.size, (255, 255, 255, 0))
        bg.paste(img, (0, 0), mask=clean_alpha)
        
        # Quantize to 255 colors with NO DITHERING for solid, smooth, razor-sharp cartoon fills
        rgb_img = bg.convert("RGB")
        quantized = rgb_img.quantize(colors=255, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
        
        # Set transparency index to 255
        mask_trans = clean_alpha.point(lambda p: 255 if p == 0 else 0)
        quantized.paste(255, mask_trans)
        
        processed_frames.append((quantized, dur))
        
    if not processed_frames:
        print(f"  Error: No frames for {output_name}")
        return
        
    first_frame, first_dur = processed_frames[0]
    other_frames = [f[0] for f in processed_frames[1:]]
    durations = [f[1] for f in processed_frames]
    
    out_path = os.path.join(OUTPUT_DIR, output_name)
    art_path = os.path.join(ARTIFACT_DIR, output_name)
    
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
    
    size_kb = os.path.getsize(out_path) / 1024
    print(f"  Saved: {output_name} ({size_kb:.1f} KB, Crisp Native Ultra-HD)")

def main():
    print("Generating Ultra-HD Crisp Non-Dithered Vector-Sharp GIFs...")
    
    # 1. QUEST MODE - THINKING IDLE (Pondering with natural eye blinks)
    quest_frames = [
        (os.path.join(BASE_DIR, 'mikir', 'diam.png'), 750),
        (os.path.join(BASE_DIR, 'mikir', 'TUTUP MATA DUA DUANYA.png'), 180),
        (os.path.join(BASE_DIR, 'mikir', 'diam.png'), 850),
        (os.path.join(BASE_DIR, 'mikir', 'TUTUP MATA KANAN.png'), 180),
        (os.path.join(BASE_DIR, 'mikir', 'diam.png'), 650),
        (os.path.join(BASE_DIR, 'mikir', 'TUTUP MATA KIRI.png'), 180),
        (os.path.join(BASE_DIR, 'mikir', 'diam.png'), 750),
    ]
    create_hd_transparent_gif(quest_frames, 'relo_thinking_idle.gif')
    create_hd_transparent_gif(quest_frames, 'relo_thinking.gif')

    # 1b. QUEST MODE - THINKING TALKING (Talking lip-sync in thinking pose)
    quest_talking_frames = [
        (os.path.join(BASE_DIR, 'mikir', 'diam.png'), 90),
        (os.path.join(BASE_DIR, 'mikir', 'A.png'), 90),
        (os.path.join(BASE_DIR, 'mikir', 'I.png'), 90),
        (os.path.join(BASE_DIR, 'mikir', 'U.png'), 90),
        (os.path.join(BASE_DIR, 'mikir', 'E.png'), 90),
        (os.path.join(BASE_DIR, 'mikir', 'O.png'), 90),
        (os.path.join(BASE_DIR, 'mikir', 'A.png'), 90),
        (os.path.join(BASE_DIR, 'mikir', 'diam.png'), 90),
    ]
    create_hd_transparent_gif(quest_talking_frames, 'relo_thinking_talking.gif')
    
    # 2. CHAPTER MODE - POINTING WINGS (Right Wing 1/2 -> 2/2 -> Left Wing 1/2 -> 2/2)
    chapter_frames = [
        (os.path.join(BASE_DIR, 'Berdiri', 'menunjuuk dengan sayap kanan', '1. DIAM 1 PER 2 SAYAP.png'), 220),
        (os.path.join(BASE_DIR, 'Berdiri', 'menunjuuk dengan sayap kanan', '2. DIAM 2 PER 2 SAYAP.png'), 480),
        (os.path.join(BASE_DIR, 'Berdiri', 'menunjuuk dengan sayap kanan', '1. DIAM 1 PER 2 SAYAP.png'), 180),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 200),
        (os.path.join(BASE_DIR, 'Berdiri', 'menuunjuk dengan sayap kiri', '1. DIAM 1 PER 2 SAYAP.png'), 220),
        (os.path.join(BASE_DIR, 'Berdiri', 'menuunjuk dengan sayap kiri', '2. DIAM 2 PER 2 SAYAP.png'), 480),
        (os.path.join(BASE_DIR, 'Berdiri', 'menuunjuk dengan sayap kiri', '1. DIAM 1 PER 2 SAYAP.png'), 180),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 200),
    ]
    create_hd_transparent_gif(chapter_frames, 'relo_chapter_pointing.gif')
    create_hd_transparent_gif(chapter_frames, 'relo_pointing.gif')
    
    # 3. SURVIVAL / ENDLESS MODE & JUMP/FLIGHT - FLAPPING WINGS FLIGHT (10-frame loop)
    flapping_frames = [
        (os.path.join(BASE_DIR, 'Mengepakkan sayap', 'tanpa aksi mata', '1. sayap tertutup.png'), 70),
        (os.path.join(BASE_DIR, 'Mengepakkan sayap', 'tanpa aksi mata', '2. 1 per 5 terbuka .png'), 70),
        (os.path.join(BASE_DIR, 'Mengepakkan sayap', 'tanpa aksi mata', '3. 2 per 5 terbuka.png'), 70),
        (os.path.join(BASE_DIR, 'Mengepakkan sayap', 'tanpa aksi mata', '4. 3 per 5 terbuka.png'), 70),
        (os.path.join(BASE_DIR, 'Mengepakkan sayap', 'tanpa aksi mata', '5. 4 per 5 terbuka.png'), 70),
        (os.path.join(BASE_DIR, 'Mengepakkan sayap', 'tanpa aksi mata', '6. 5 per 5 terbuka.png'), 70),
        (os.path.join(BASE_DIR, 'Mengepakkan sayap', 'tanpa aksi mata', '5. 4 per 5 terbuka.png'), 70),
        (os.path.join(BASE_DIR, 'Mengepakkan sayap', 'tanpa aksi mata', '4. 3 per 5 terbuka.png'), 70),
        (os.path.join(BASE_DIR, 'Mengepakkan sayap', 'tanpa aksi mata', '3. 2 per 5 terbuka.png'), 70),
        (os.path.join(BASE_DIR, 'Mengepakkan sayap', 'tanpa aksi mata', '2. 1 per 5 terbuka .png'), 70),
    ]
    create_hd_transparent_gif(flapping_frames, 'relo_flapping.gif')
    
    # 4. STANDING IDLE WITH NATURAL EYE BLINKING (Asynchronous non-synchronized blinking for each mode)
    # 4a. Base / Instructor Relo in Lobby
    standing_blink_frames = [
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 850),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'mengedip', 'mengedip 2 mata.png'), 190),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 950),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'mengedip', 'mengedip mata kanan.png'), 190),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 750),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'mengedip', 'mengedip mata kiri.png'), 190),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 850),
    ]
    create_hd_transparent_gif(standing_blink_frames, 'relo_standing_idle.gif')
    create_hd_transparent_gif(standing_blink_frames, 'relo_standing_blinking.gif')
    create_hd_transparent_gif(standing_blink_frames, 'relo_standing.gif')

    # 4b. Quest Relo Asynchronous Blinking (Starts quickly with right wink)
    quest_blink_frames = [
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 400),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'mengedip', 'mengedip mata kanan.png'), 180),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 1200),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'mengedip', 'mengedip 2 mata.png'), 190),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 700),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'mengedip', 'mengedip mata kiri.png'), 180),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 800),
    ]
    create_hd_transparent_gif(quest_blink_frames, 'relo_standing_blinking_quest.gif')

    # 4c. Chapter Relo Asynchronous Blinking (Delayed first blink with left wink)
    chapter_blink_frames = [
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 1300),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'mengedip', 'mengedip mata kiri.png'), 180),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 800),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'mengedip', 'mengedip 2 mata.png'), 190),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 900),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'mengedip', 'mengedip mata kanan.png'), 180),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 600),
    ]
    create_hd_transparent_gif(chapter_blink_frames, 'relo_standing_blinking_chapter.gif')

    # 4d. Endless Relo Asynchronous Blinking (Double blink cycle)
    endless_blink_frames = [
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 700),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'mengedip', 'mengedip 2 mata.png'), 190),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 1400),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'mengedip', 'mengedip mata kanan.png'), 180),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 500),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'mengedip', 'mengedip mata kiri.png'), 180),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 1000),
    ]
    create_hd_transparent_gif(endless_blink_frames, 'relo_standing_blinking_endless.gif')

    # 5. STANDING TALKING (Lip sync while talking)
    talking_frames = [
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'a.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'i.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'u.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'e.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'o.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'a.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), 90),
    ]
    create_hd_transparent_gif(talking_frames, 'relo_standing_talking.gif')
    
    # 6. POINT RIGHT TALKING & POINT LEFT TALKING
    point_r_frames = [
        (os.path.join(BASE_DIR, 'Berdiri', 'menunjuuk dengan sayap kanan', '2. DIAM 2 PER 2 SAYAP.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'menunjuuk dengan sayap kanan', 'a.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'menunjuuk dengan sayap kanan', 'i.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'menunjuuk dengan sayap kanan', 'u.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'menunjuuk dengan sayap kanan', 'e.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'menunjuuk dengan sayap kanan', 'o.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'menunjuuk dengan sayap kanan', 'a.png'), 90),
    ]
    create_hd_transparent_gif(point_r_frames, 'relo_point_right_talking.gif')

    point_l_frames = [
        (os.path.join(BASE_DIR, 'Berdiri', 'menuunjuk dengan sayap kiri', '2. DIAM 2 PER 2 SAYAP.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'menuunjuk dengan sayap kiri', 'A.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'menuunjuk dengan sayap kiri', 'I.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'menuunjuk dengan sayap kiri', 'U.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'menuunjuk dengan sayap kiri', 'E.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'menuunjuk dengan sayap kiri', 'O.png'), 90),
        (os.path.join(BASE_DIR, 'Berdiri', 'menuunjuk dengan sayap kiri', 'A.png'), 90),
    ]
    create_hd_transparent_gif(point_l_frames, 'relo_point_left_talking.gif')

    print("All Ultra-HD Crisp Non-Dithered GIFs generated with 100% perfection!")

if __name__ == '__main__':
    main()
