using System;
using System.IO;

class Test {
    static void Main() {
        string urlPath = @"audio/relo's sound/Menu Selamat Datang - Login Pertama/pagi/Selamat pagi! Perkenalkan, aku Detektif Relo. Aku akan menemanimu dalam penyelidikan Relasi dan Fungsi. Siap jadi detektif.wav";
        string baseDir = @"D:\File Penting\File S2\Thesis Project\Game-Relasi-Fungsi\DISTRIBUSI_GAME_ALL_PLATFORM\5_WINDOWS_WEBVIEW2";
        string webRoot = Path.Combine(baseDir, "game_data");
        string filePath = Path.Combine(webRoot, urlPath.Replace('/', Path.DirectorySeparatorChar));

        // Test 1: Add \?\ to filePath
        try {
            string longPath = @"\\?\" + filePath;
            Console.WriteLine("Testing with longPath: " + longPath);
            Console.WriteLine("File.Exists: " + File.Exists(longPath));
            byte[] bytes = File.ReadAllBytes(longPath);
            Console.WriteLine("SUCCESS: Read " + bytes.Length + " bytes!");
        } catch (Exception ex) {
            Console.WriteLine("FAIL \\?\: " + ex.ToString());
        }

        // Test 2: FileStream with \?\
        try {
            string longPath = @"\\?\" + filePath;
            using (FileStream fs = new FileStream(longPath, FileMode.Open, FileAccess.Read, FileShare.Read)) {
                Console.WriteLine("FileStream Length: " + fs.Length);
            }
        } catch (Exception ex) {
            Console.WriteLine("FAIL FileStream: " + ex.ToString());
        }
    }
}
