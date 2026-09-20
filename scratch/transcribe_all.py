import speech_recognition as sr
import subprocess
import os
import json

FFMPEG_PATH = "node_modules/ffmpeg-static/ffmpeg.exe"

def extract_and_transcribe(video_path, chunk_duration=7):
    base = os.path.splitext(os.path.basename(video_path))[0]
    wav_path = f"scratch/{base}.wav"
    
    # Extract audio using ffmpeg
    cmd = [FFMPEG_PATH, "-y", "-i", video_path, "-vn", "-ar", "16000", "-ac", "1", wav_path]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    
    r = sr.Recognizer()
    import wave, contextlib
    with contextlib.closing(wave.open(wav_path, 'r')) as f:
        total_duration = f.getnframes() / float(f.getframerate())
    
    print(f"=== Transcribing {base} (duration: {total_duration:.1f}s) ===")
    cues = []
    current_start = 0.0
    while current_start < total_duration:
        end_time = min(current_start + chunk_duration, total_duration)
        with sr.AudioFile(wav_path) as source:
            audio = r.record(source, offset=current_start, duration=chunk_duration)
            try:
                text = r.recognize_google(audio, language='id-ID')
                cues.append({"start": round(current_start, 1), "end": round(end_time, 1), "text": text})
                print(f"[{current_start:.1f}s - {end_time:.1f}s]: {text}")
            except sr.UnknownValueError:
                pass
            except Exception as e:
                print(f"Error at {current_start}: {e}")
        current_start += chunk_duration
    
    with open(f"scratch/{base}_subtitles.json", "w", encoding="utf-8") as out_f:
        json.dump(cues, out_f, indent=2, ensure_ascii=False)
    print(f"Saved {len(cues)} cues to scratch/{base}_subtitles.json\n")

if __name__ == '__main__':
    for v in ["chapter 3.2.mp4", "chapter 3.3.mp4", "chapter 3.4.mp4"]:
        path = os.path.join("public/materi/chapter 3", v)
        if os.path.exists(path):
            extract_and_transcribe(path, chunk_duration=7)
