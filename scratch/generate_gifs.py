import os
import sys
from PIL import Image

base_dir = r"d:\New folder (2)\Game-Relasi-Fungsi\public\relo\relo animation"
output_dir = r"d:\New folder (2)\Game-Relasi-Fungsi\public\relo\gifs"
artifacts_dir = r"C:\Users\GreeND24\.gemini\antigravity-ide\brain\a4118c3b-2ad8-49ac-b290-c8e25b17fb2c\gifs"

os.makedirs(output_dir, exist_ok=True)
os.makedirs(artifacts_dir, exist_ok=True)

def create_talking_gif(frame_paths, output_filename, duration_ms=90, target_height=400):
    images = []
    print(f"Processing {output_filename} ({len(frame_paths)} frames)...")

    for path in frame_paths:
        if not os.path.exists(path):
            print(f"Warning: File not found {path}")
            continue

        im = Image.open(path).convert("RGBA")
        # Resize preserving aspect ratio to target_height
        w, h = im.size
        new_w = int(w * (target_height / float(h)))
        im_resized = im.resize((new_w, target_height), Image.Resampling.LANCZOS)
        
        images.append(im_resized)

    if not images:
        print(f"Error: No images for {output_filename}")
        return

    # Convert frames to GIF mode (P) with transparency preservation
    gif_frames = []
    for img in images:
        # Create transparent background canvas
        alpha = img.split()[3]
        # Quantize RGB with adaptive palette
        rgb_img = img.convert("RGB").convert("P", palette=Image.Palette.ADAPTIVE, colors=255)
        # Set transparent pixels (alpha < 128) to index 255
        mask = Image.eval(alpha, lambda a: 255 if a < 128 else 0)
        rgb_img.paste(255, mask)
        rgb_img.info['transparency'] = 255
        gif_frames.append(rgb_img)

    out_path = os.path.join(output_dir, output_filename)
    art_path = os.path.join(artifacts_dir, output_filename)

    # Save animated GIF
    gif_frames[0].save(
        out_path,
        save_all=True,
        append_images=gif_frames[1:],
        duration=duration_ms,
        loop=0,
        disposal=2,
        transparency=255
    )

    gif_frames[0].save(
        art_path,
        save_all=True,
        append_images=gif_frames[1:],
        duration=duration_ms,
        loop=0,
        disposal=2,
        transparency=255
    )

    size_kb = os.path.getsize(out_path) / 1024.0
    print(f"Success: {output_filename} ({gif_frames[0].size[0]}x{gif_frames[0].size[1]}, {len(gif_frames)} frames, {size_kb:.1f} KB)")

def main():
    print("Generating Crystal Clear Animated GIFs via Python Pillow...")

    # 1. Standing Talking GIF
    standing_files = [
        os.path.join(base_dir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'DIAM.png'),
        os.path.join(base_dir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'a.png'),
        os.path.join(base_dir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'i.png'),
        os.path.join(base_dir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'u.png'),
        os.path.join(base_dir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'e.png'),
        os.path.join(base_dir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'o.png'),
        os.path.join(base_dir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'a.png'),
        os.path.join(base_dir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'DIAM.png'),
    ]
    create_talking_gif(standing_files, 'relo_standing_talking.gif', duration_ms=90)

    # 2. Thinking Talking GIF
    thinking_files = [
        os.path.join(base_dir, 'mikir', 'diam.png'),
        os.path.join(base_dir, 'mikir', 'a.png'),
        os.path.join(base_dir, 'mikir', 'i.png'),
        os.path.join(base_dir, 'mikir', 'u.png'),
        os.path.join(base_dir, 'mikir', 'e.png'),
        os.path.join(base_dir, 'mikir', 'o.png'),
        os.path.join(base_dir, 'mikir', 'a.png'),
        os.path.join(base_dir, 'mikir', 'diam.png'),
    ]
    create_talking_gif(thinking_files, 'relo_thinking_talking.gif', duration_ms=90)

    # 3. Point Right Talking GIF
    point_right_files = [
        os.path.join(base_dir, 'Berdiri', 'menunjuuk dengan sayap kanan', '2. DIAM 2 PER 2 SAYAP.png'),
        os.path.join(base_dir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'a.png'),
        os.path.join(base_dir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'i.png'),
        os.path.join(base_dir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'u.png'),
        os.path.join(base_dir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'e.png'),
        os.path.join(base_dir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'o.png'),
        os.path.join(base_dir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'a.png'),
    ]
    create_talking_gif(point_right_files, 'relo_point_right_talking.gif', duration_ms=90)

    # 4. Point Left Talking GIF
    point_left_files = [
        os.path.join(base_dir, 'Berdiri', 'menuunjuk dengan sayap kiri', '2. DIAM 2 PER 2 SAYAP.png'),
        os.path.join(base_dir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'A.png'),
        os.path.join(base_dir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'I.png'),
        os.path.join(base_dir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'U.png'),
        os.path.join(base_dir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'E.png'),
        os.path.join(base_dir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'O.png'),
        os.path.join(base_dir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'A.png'),
    ]
    create_talking_gif(point_left_files, 'relo_point_left_talking.gif', duration_ms=90)

    # 5. Flapping GIF
    flapping_files = [
        os.path.join(base_dir, 'Mengepakkan sayap', 'tanpa aksi mata', '1. sayap tertutup.png'),
        os.path.join(base_dir, 'Mengepakkan sayap', 'tanpa aksi mata', '2. 1 per 5 terbuka .png'),
        os.path.join(base_dir, 'Mengepakkan sayap', 'tanpa aksi mata', '3. 2 per 5 terbuka.png'),
        os.path.join(base_dir, 'Mengepakkan sayap', 'tanpa aksi mata', '4. 3 per 5 terbuka.png'),
        os.path.join(base_dir, 'Mengepakkan sayap', 'tanpa aksi mata', '5. 4 per 5 terbuka.png'),
        os.path.join(base_dir, 'Mengepakkan sayap', 'tanpa aksi mata', '6. 5 per 5 terbuka.png'),
        os.path.join(base_dir, 'Mengepakkan sayap', 'tanpa aksi mata', '5. 4 per 5 terbuka.png'),
        os.path.join(base_dir, 'Mengepakkan sayap', 'tanpa aksi mata', '4. 3 per 5 terbuka.png'),
        os.path.join(base_dir, 'Mengepakkan sayap', 'tanpa aksi mata', '3. 2 per 5 terbuka.png'),
        os.path.join(base_dir, 'Mengepakkan sayap', 'tanpa aksi mata', '2. 1 per 5 terbuka .png'),
    ]
    create_talking_gif(flapping_files, 'relo_flapping.gif', duration_ms=70)

    print("All crystal clear animated GIFs generated successfully!")

if __name__ == '__main__':
    main()
