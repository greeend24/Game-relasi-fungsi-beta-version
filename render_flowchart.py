import subprocess
import os
import time
from PIL import Image

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
html_path = os.path.abspath("flowchart_template.html")
png_output = os.path.abspath("flowchart_temp.png")
jpg_output = os.path.abspath("flowchart_game_relasi_fungsi.jpg")

print("Rendering high-resolution flowchart...")
print(f"Source: {html_path}")

cmd = [
    chrome_path,
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--virtual-time-budget=3000",
    "--window-size=4400,2800",
    f"--screenshot={png_output}",
    f"file:///{html_path}"
]

res = subprocess.run(cmd, capture_output=True, text=True)
print("Chrome return code:", res.returncode)

if os.path.exists(png_output):
    size_mb = os.path.getsize(png_output) / (1024 * 1024)
    print(f"Raw PNG generated: {size_mb:.2f} MB. Processing to high-definition JPG...")
    
    img = Image.open(png_output)
    rgb_img = img.convert('RGB')
    
    # Save with 96% quality and 0 subsampling (4:4:4 full chroma) for razor-sharp text on zoom
    rgb_img.save(
        jpg_output,
        'JPEG',
        quality=96,
        subsampling=0,
        optimize=True
    )
    
    jpg_size_mb = os.path.getsize(jpg_output) / (1024 * 1024)
    print(f"Flowchart JPG created successfully: {jpg_output} ({jpg_size_mb:.2f} MB, {img.width}x{img.height} px)")
    
    try:
        os.remove(png_output)
    except:
        pass
else:
    print("Screenshot failed!")
    print(res.stderr)
