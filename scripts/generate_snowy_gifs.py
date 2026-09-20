import os
import glob
from PIL import Image

BASE_DIR = os.path.abspath('public/Snowy')
OUTPUT_DIR = os.path.abspath('public/Snowy/gifs')
ARTIFACT_DIR = os.path.abspath(r'C:\Users\GreeND24\.gemini\antigravity-ide\brain\1c84e26a-946f-4808-8e9b-95be7d6d6957\gifs')

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ARTIFACT_DIR, exist_ok=True)

# Fixed bounding box to keep all frames perfectly registered
# Union bbox is (1045, 528, 5366, 6807) on (6408, 7215)
CROP_BOX = (900, 400, 5500, 6950) # (left, top, right, bottom)
TARGET_HEIGHT = 640
crop_w = CROP_BOX[2] - CROP_BOX[0]
crop_h = CROP_BOX[3] - CROP_BOX[1]
TARGET_WIDTH = int(round(TARGET_HEIGHT * (crop_w / crop_h))) # e.g. 450 x 640

print(f"Target GIF Resolution: {TARGET_WIDTH}x{TARGET_HEIGHT} (Cropped from {crop_w}x{crop_h})")

def process_frame(fp, duration_ms):
    if not os.path.exists(fp):
        print(f"  Warning: File not found {fp}")
        return None
        
    raw_img = Image.open(fp)
    # Crop to registered box
    cropped = raw_img.crop(CROP_BOX)
    
    # Resize with high-quality Lanczos resampling
    resized = cropped.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)
    img = resized.convert("RGBA")
    
    # Clean alpha mask (crisp binary cutoff at 90)
    r, g, b, a = img.split()
    clean_alpha = a.point(lambda p: 255 if p > 90 else 0)
    img.putalpha(clean_alpha)
    
    # Solid background matte for clean palette extraction
    bg = Image.new("RGBA", img.size, (255, 255, 255, 0))
    bg.paste(img, (0, 0), mask=clean_alpha)
    
    rgb_img = bg.convert("RGB")
    quantized = rgb_img.quantize(colors=255, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    
    # Set transparency index to 255
    mask_trans = clean_alpha.point(lambda p: 255 if p == 0 else 0)
    quantized.paste(255, mask_trans)
    
    return quantized, duration_ms

def create_hd_transparent_gif(frame_list, output_name):
    print(f"Creating Snowy GIF: {output_name} ({len(frame_list)} frames)...")
    
    processed_frames = []
    for item in frame_list:
        if isinstance(item, tuple):
            fp, dur = item
        else:
            fp, dur = item, 250
            
        res = process_frame(fp, dur)
        if res:
            processed_frames.append(res)
            
    if not processed_frames:
        print(f"  Error: No frames for {output_name}")
        return
        
    first_frame, _ = processed_frames[0]
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
    print(f"  Saved: {output_name} ({size_kb:.1f} KB)")

def main():
    print("Testing 1 GIF generation for Snowy...")
    test_frames = [
        (os.path.join(BASE_DIR, 'normal.png'), 850),
        (os.path.join(BASE_DIR, 'tutup dua mata.png'), 190),
        (os.path.join(BASE_DIR, 'normal.png'), 950),
        (os.path.join(BASE_DIR, 'tutup mata kanan.png'), 190),
        (os.path.join(BASE_DIR, 'normal.png'), 750),
        (os.path.join(BASE_DIR, 'tutup mata kiri.png'), 190),
        (os.path.join(BASE_DIR, 'normal.png'), 850),
    ]
    create_hd_transparent_gif(test_frames, 'Snowy_standing_blinking.gif')

if __name__ == '__main__':
    main()

