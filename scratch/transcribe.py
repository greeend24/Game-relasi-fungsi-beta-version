import speech_recognition as sr
import wave
import contextlib
import os

def transcribe_chunks(wav_path, chunk_duration=10):
    r = sr.Recognizer()
    with contextlib.closing(wave.open(wav_path, 'r')) as f:
        frames = f.getnframes()
        rate = f.getframerate()
        total_duration = frames / float(rate)
    
    print(f"Total duration: {total_duration:.2f}s")
    
    results = []
    current_start = 0.0
    while current_start < total_duration:
        end_time = min(current_start + chunk_duration, total_duration)
        with sr.AudioFile(wav_path) as source:
            # record specific segment
            audio = r.record(source, offset=current_start, duration=chunk_duration)
            try:
                text = r.recognize_google(audio, language='id-ID')
                print(f"[{current_start:.1f}s - {end_time:.1f}s]: {text}")
                results.append((current_start, end_time, text))
            except sr.UnknownValueError:
                print(f"[{current_start:.1f}s - {end_time:.1f}s]: (silence/unrecognized)")
            except Exception as e:
                print(f"[{current_start:.1f}s - {end_time:.1f}s]: Error: {e}")
        current_start += chunk_duration
    
    return results

if __name__ == '__main__':
    transcribe_chunks('scratch/ch3_1_audio.wav', chunk_duration=8)
