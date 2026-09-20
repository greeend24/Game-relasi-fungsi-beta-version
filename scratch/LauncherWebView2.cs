using System;
using System.ComponentModel;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using Microsoft.Win32;
using Microsoft.Win32.SafeHandles;

namespace DetektifDataWebView2
{
    static class Program
    {
        private static HttpListener _listener;
        private static string _webRoot;
        private static int _port;
        private static NotifyIcon _trayIcon;
        private static ContextMenu _trayMenu;
        private static string _gameUrl;
        private static long _lastActivityTime;
        private static System.Threading.Timer _idleTimer;
        private static Process _browserProcess;
        private static readonly string PortFilePath = Path.Combine(Path.GetTempPath(), "DetektifData_ActivePort.txt");

        [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
        private static extern SafeFileHandle CreateFileW(
            string lpFileName,
            uint dwDesiredAccess,
            uint dwShareMode,
            IntPtr lpSecurityAttributes,
            uint dwCreationDisposition,
            uint dwFlagsAndAttributes,
            IntPtr hTemplateFile);

        private static string NormalizeLongPath(string path)
        {
            if (string.IsNullOrEmpty(path)) return path;
            if (path.StartsWith(@"\\?\")) return path;
            if (path.StartsWith(@"\\")) return @"\\?\UNC\" + path.Substring(2);
            return @"\\?\" + path;
        }

        private static SafeFileHandle OpenFileRead(string path)
        {
            string longPath = NormalizeLongPath(path);
            return CreateFileW(longPath, 0x80000000, 3, IntPtr.Zero, 3, 0x08000000, IntPtr.Zero);
        }

        [STAThread]
        static void Main()
        {
            bool createdNew;
            using (Mutex mutex = new Mutex(true, "DetektifData_WebView2_Universal_Mutex", out createdNew))
            {
                if (!createdNew)
                {
                    try
                    {
                        if (File.Exists(PortFilePath))
                        {
                            string savedPort = File.ReadAllText(PortFilePath).Trim();
                            LaunchGameBrowser(string.Format("http://127.0.0.1:{0}/", savedPort));
                        }
                    }
                    catch { }
                    return;
                }

                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);

                try
                {
                    string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                    _webRoot = Path.Combine(baseDir, "game_data");
                    if (!Directory.Exists(_webRoot))
                    {
                        _webRoot = Path.Combine(baseDir, "dist");
                    }
                    if (!Directory.Exists(_webRoot))
                    {
                        _webRoot = baseDir;
                    }

                    // FIXED PREFERRED PORT 8088: Guarantees persistent localStorage & accounts across sessions!
                    _port = GetPreferredPort();
                    _gameUrl = string.Format("http://127.0.0.1:{0}/", _port);
                    _lastActivityTime = DateTime.UtcNow.Ticks;

                    try
                    {
                        File.WriteAllText(PortFilePath, _port.ToString());
                    }
                    catch { }

                    _listener = new HttpListener();
                    _listener.Prefixes.Add(_gameUrl);
                    _listener.Start();

                    Thread serverThread = new Thread(ListenLoop);
                    serverThread.IsBackground = true;
                    serverThread.Start();

                    _trayMenu = new ContextMenu();
                    _trayMenu.MenuItems.Add("Buka Game di Layar Penuh", OnOpenGame);
                    _trayMenu.MenuItems.Add("-");
                    _trayMenu.MenuItems.Add("Tutup Game & Keluar", OnExit);

                    _trayIcon = new NotifyIcon();
                    _trayIcon.Text = "Detektif Data: Relasi & Fungsi";
                    _trayIcon.Icon = SystemIcons.Application;
                    _trayIcon.ContextMenu = _trayMenu;
                    _trayIcon.Visible = true;
                    _trayIcon.DoubleClick += OnOpenGame;

                    LaunchGameBrowser(_gameUrl);

                    _idleTimer = new System.Threading.Timer(CheckIdle, null, 60000, 60000);

                    Application.Run();
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Gagal memulai game:\n" + ex.Message, "Detektif Data", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
                finally
                {
                    Cleanup();
                }
            }
        }

        private static void OnOpenGame(object sender, EventArgs e)
        {
            LaunchGameBrowser(_gameUrl);
        }

        private static void OnExit(object sender, EventArgs e)
        {
            Cleanup();
            Application.Exit();
        }

        private static void Cleanup()
        {
            try
            {
                if (File.Exists(PortFilePath)) File.Delete(PortFilePath);
            }
            catch { }

            try
            {
                if (_browserProcess != null && !_browserProcess.HasExited)
                {
                    _browserProcess.Kill();
                }
            }
            catch { }

            try
            {
                if (_idleTimer != null) { _idleTimer.Dispose(); _idleTimer = null; }
                if (_trayIcon != null) { _trayIcon.Visible = false; _trayIcon.Dispose(); _trayIcon = null; }
                if (_listener != null && _listener.IsListening) { _listener.Stop(); _listener.Close(); _listener = null; }
            }
            catch { }
        }

        private static void CheckIdle(object state)
        {
            TimeSpan idle = TimeSpan.FromTicks(DateTime.UtcNow.Ticks - Interlocked.Read(ref _lastActivityTime));
            if (idle.TotalMinutes > 60)
            {
                Cleanup();
                Environment.Exit(0);
            }
        }

        private static void LaunchGameBrowser(string url)
        {
            string browserPath = FindBestBrowserPath();
            // PERMANENT LOCALAPPDATA PROFILE: Guarantees accounts, progress, and settings persist permanently!
            string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            string userProfileDir = Path.Combine(localAppData, "DetektifData_Game_Profile");

            if (!string.IsNullOrEmpty(browserPath) && File.Exists(browserPath))
            {
                try
                {
                    ProcessStartInfo psi = new ProcessStartInfo
                    {
                        FileName = browserPath,
                        Arguments = string.Format("--app=\"{0}\" --start-fullscreen --autoplay-policy=no-user-gesture-required --user-data-dir=\"{1}\" --disable-features=TranslateUI --no-first-run", url, userProfileDir),
                        UseShellExecute = false
                    };
                    _browserProcess = Process.Start(psi);
                    return;
                }
                catch { }
            }

            try
            {
                _browserProcess = Process.Start(new ProcessStartInfo(url) { UseShellExecute = true });
            }
            catch
            {
                try
                {
                    _browserProcess = Process.Start("explorer.exe", url);
                }
                catch { }
            }
        }

        private static string FindBestBrowserPath()
        {
            string[] browsers = new string[] { "msedge.exe", "chrome.exe", "brave.exe", "opera.exe", "vivaldi.exe" };
            foreach (string b in browsers)
            {
                string path = GetAppPathFromRegistry(b);
                if (!string.IsNullOrEmpty(path) && File.Exists(path))
                {
                    return path;
                }
            }

            string localApp = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            string progFiles = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
            string progFilesX86 = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86);

            string[] fallbackPaths = new string[]
            {
                Path.Combine(progFiles, @"Microsoft\Edge\Application\msedge.exe"),
                Path.Combine(progFilesX86, @"Microsoft\Edge\Application\msedge.exe"),
                Path.Combine(localApp, @"Microsoft\Edge\Application\msedge.exe"),

                Path.Combine(progFiles, @"Google\Chrome\Application\chrome.exe"),
                Path.Combine(progFilesX86, @"Google\Chrome\Application\chrome.exe"),
                Path.Combine(localApp, @"Google\Chrome\Application\chrome.exe"),

                Path.Combine(progFiles, @"BraveSoftware\Brave-Browser\Application\brave.exe"),
                Path.Combine(localApp, @"BraveSoftware\Brave-Browser\Application\brave.exe")
            };

            foreach (string p in fallbackPaths)
            {
                if (!string.IsNullOrEmpty(p) && File.Exists(p)) return p;
            }

            return null;
        }

        private static string GetAppPathFromRegistry(string exeName)
        {
            string[] roots = new string[]
            {
                @"SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\" + exeName,
                @"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\App Paths\" + exeName
            };

            foreach (string subkey in roots)
            {
                try
                {
                    using (RegistryKey key = Registry.LocalMachine.OpenSubKey(subkey))
                    {
                        if (key != null)
                        {
                            object val = key.GetValue("");
                            if (val != null)
                            {
                                string s = val.ToString().Trim('"', ' ');
                                if (File.Exists(s)) return s;
                            }
                        }
                    }
                }
                catch { }

                try
                {
                    using (RegistryKey key = Registry.CurrentUser.OpenSubKey(subkey))
                    {
                        if (key != null)
                        {
                            object val = key.GetValue("");
                            if (val != null)
                            {
                                string s = val.ToString().Trim('"', ' ');
                                if (File.Exists(s)) return s;
                            }
                        }
                    }
                }
                catch { }
            }

            return null;
        }

        private static int GetPreferredPort()
        {
            int defaultPort = 8088;
            if (IsPortAvailable(defaultPort)) return defaultPort;
            for (int p = 8089; p <= 8095; p++)
            {
                if (IsPortAvailable(p)) return p;
            }
            return defaultPort;
        }

        private static bool IsPortAvailable(int port)
        {
            try
            {
                TcpListener l = new TcpListener(IPAddress.Loopback, port);
                l.Start();
                l.Stop();
                return true;
            }
            catch
            {
                return false;
            }
        }

        private static void ListenLoop()
        {
            while (_listener != null && _listener.IsListening)
            {
                try
                {
                    HttpListenerContext ctx = _listener.GetContext();
                    Interlocked.Exchange(ref _lastActivityTime, DateTime.UtcNow.Ticks);

                    ThreadPool.QueueUserWorkItem(delegate(object state)
                    {
                        HttpListenerContext context = (HttpListenerContext)state;
                        try
                        {
                            string rawPath = context.Request.Url.LocalPath;
                            string urlPath = Uri.UnescapeDataString(rawPath).TrimStart('/');
                            if (string.IsNullOrEmpty(urlPath)) urlPath = "index.html";

                            if (urlPath.Equals("api/shutdown", StringComparison.OrdinalIgnoreCase))
                            {
                                try
                                {
                                    context.Response.StatusCode = 200;
                                    byte[] resp = Encoding.UTF8.GetBytes("{\"status\":\"ok\"}");
                                    context.Response.ContentType = "application/json";
                                    context.Response.ContentLength64 = resp.Length;
                                    context.Response.OutputStream.Write(resp, 0, resp.Length);
                                    context.Response.OutputStream.Close();
                                }
                                catch { }

                                new Thread(delegate()
                                {
                                    Thread.Sleep(200);
                                    Cleanup();
                                    Application.Exit();
                                }).Start();
                                return;
                            }

                            string filePath = Path.Combine(_webRoot, urlPath.Replace('/', Path.DirectorySeparatorChar));

                            SafeFileHandle handle = OpenFileRead(filePath);
                            if (!handle.IsInvalid)
                            {
                                using (handle)
                                using (FileStream fs = new FileStream(handle, FileAccess.Read))
                                {
                                    string mime = GetMimeType(filePath);
                                    context.Response.ContentType = mime;
                                    context.Response.Headers.Add("Accept-Ranges", "bytes");
                                    context.Response.ContentLength64 = fs.Length;
                                    context.Response.StatusCode = 200;

                                    byte[] buffer = new byte[64 * 1024];
                                    int read;
                                    while ((read = fs.Read(buffer, 0, buffer.Length)) > 0)
                                    {
                                        context.Response.OutputStream.Write(buffer, 0, read);
                                    }
                                }
                            }
                            else
                            {
                                string indexPath = Path.Combine(_webRoot, "index.html");
                                SafeFileHandle indexHandle = OpenFileRead(indexPath);
                                if (!indexHandle.IsInvalid)
                                {
                                    using (indexHandle)
                                    using (FileStream fs = new FileStream(indexHandle, FileAccess.Read))
                                    {
                                        context.Response.ContentType = "text/html; charset=utf-8";
                                        context.Response.ContentLength64 = fs.Length;
                                        context.Response.StatusCode = 200;

                                        byte[] buffer = new byte[64 * 1024];
                                        int read;
                                        while ((read = fs.Read(buffer, 0, buffer.Length)) > 0)
                                        {
                                            context.Response.OutputStream.Write(buffer, 0, read);
                                        }
                                    }
                                }
                                else
                                {
                                    context.Response.StatusCode = 404;
                                }
                            }
                        }
                        catch
                        {
                            try { context.Response.StatusCode = 500; } catch { }
                        }
                        finally
                        {
                            try
                            {
                                context.Response.OutputStream.Close();
                            }
                            catch { }
                        }
                    }, ctx);
                }
                catch
                {
                    break;
                }
            }
        }

        private static string GetMimeType(string path)
        {
            string ext = Path.GetExtension(path).ToLowerInvariant();
            switch (ext)
            {
                case ".html": return "text/html; charset=utf-8";
                case ".js": case ".mjs": return "application/javascript; charset=utf-8";
                case ".css": return "text/css; charset=utf-8";
                case ".json": return "application/json; charset=utf-8";
                case ".png": return "image/png";
                case ".jpg": case ".jpeg": return "image/jpeg";
                case ".gif": return "image/gif";
                case ".svg": return "image/svg+xml";
                case ".webp": return "image/webp";
                case ".wav": return "audio/wav";
                case ".mp3": return "audio/mpeg";
                case ".ogg": return "audio/ogg";
                case ".woff": return "font/woff";
                case ".woff2": return "font/woff2";
                case ".ttf": return "font/ttf";
                default: return "application/octet-stream";
            }
        }
    }
}
