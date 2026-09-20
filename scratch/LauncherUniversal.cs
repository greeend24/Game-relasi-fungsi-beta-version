using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using Microsoft.Win32;

namespace DetektifDataLauncher
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
        private static readonly string PortFilePath = Path.Combine(Path.GetTempPath(), "DetektifData_ActivePort.txt");

        [STAThread]
        static void Main()
        {
            // Prevent multiple server instances running simultaneously
            bool createdNew;
            using (Mutex mutex = new Mutex(true, "DetektifData_Game_SingleInstance_Mutex", out createdNew))
            {
                if (!createdNew)
                {
                    // Already running - read active port and open browser
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

                    // Find a free port
                    _port = GetFreePort();
                    _gameUrl = string.Format("http://127.0.0.1:{0}/", _port);
                    _lastActivityTime = DateTime.UtcNow.Ticks;

                    try
                    {
                        File.WriteAllText(PortFilePath, _port.ToString());
                    }
                    catch { }

                    // Start local HTTP Server
                    _listener = new HttpListener();
                    _listener.Prefixes.Add(_gameUrl);
                    _listener.Start();

                    Thread serverThread = new Thread(ListenLoop);
                    serverThread.IsBackground = true;
                    serverThread.Start();

                    // Create System Tray Icon
                    _trayMenu = new ContextMenu();
                    _trayMenu.MenuItems.Add("🎮 Buka Game di Browser", OnOpenGame);
                    _trayMenu.MenuItems.Add("-");
                    _trayMenu.MenuItems.Add("❌ Tutup Game & Keluar", OnExit);

                    _trayIcon = new NotifyIcon();
                    _trayIcon.Text = "Detektif Data - Relasi & Fungsi (Aktif)";
                    _trayIcon.Icon = SystemIcons.Application;
                    _trayIcon.ContextMenu = _trayMenu;
                    _trayIcon.Visible = true;
                    _trayIcon.DoubleClick += OnOpenGame;

                    // Launch browser in app mode
                    LaunchGameBrowser(_gameUrl);

                    // Optional idle monitor: auto shutdown if no requests for 45 minutes
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
                if (_idleTimer != null) { _idleTimer.Dispose(); _idleTimer = null; }
                if (_trayIcon != null) { _trayIcon.Visible = false; _trayIcon.Dispose(); _trayIcon = null; }
                if (_listener != null && _listener.IsListening) { _listener.Stop(); _listener.Close(); _listener = null; }
            }
            catch { }
        }

        private static void CheckIdle(object state)
        {
            TimeSpan idle = TimeSpan.FromTicks(DateTime.UtcNow.Ticks - Interlocked.Read(ref _lastActivityTime));
            if (idle.TotalMinutes > 45)
            {
                Cleanup();
                Environment.Exit(0);
            }
        }

        private static void LaunchGameBrowser(string url)
        {
            string browserPath = FindBestBrowserPath();
            string userProfileDir = Path.Combine(Path.GetTempPath(), "DetektifData_Browser_Profile");

            if (!string.IsNullOrEmpty(browserPath))
            {
                try
                {
                    ProcessStartInfo psi = new ProcessStartInfo
                    {
                        FileName = browserPath,
                        Arguments = string.Format("--app=\"{0}\" --window-size=1280,720 --start-fullscreen --user-data-dir=\"{1}\" --disable-features=TranslateUI --no-first-run", url, userProfileDir),
                        UseShellExecute = false
                    };
                    Process.Start(psi);
                    return;
                }
                catch { }
            }

            // Fallback: Open system default browser
            try
            {
                Process.Start(new ProcessStartInfo(url) { UseShellExecute = true });
            }
            catch
            {
                try
                {
                    Process.Start("explorer.exe", url);
                }
                catch { }
            }
        }

        private static string FindBestBrowserPath()
        {
            // 1. Try Registry App Paths for popular Chromium browsers
            string[] browsers = new string[] { "msedge.exe", "chrome.exe", "brave.exe", "opera.exe", "vivaldi.exe" };
            foreach (string b in browsers)
            {
                string path = GetAppPathFromRegistry(b);
                if (!string.IsNullOrEmpty(path) && File.Exists(path))
                {
                    return path;
                }
            }

            // 2. Standard Program Files search
            string localApp = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            string progFiles = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
            string progFilesX86 = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86);

            string[] fallbackPaths = new string[]
            {
                Path.Combine(progFilesX86, @"Microsoft\Edge\Application\msedge.exe"),
                Path.Combine(progFiles, @"Microsoft\Edge\Application\msedge.exe"),
                Path.Combine(localApp, @"Microsoft\Edge\Application\msedge.exe"),
                Path.Combine(progFiles, @"Google\Chrome\Application\chrome.exe"),
                Path.Combine(progFilesX86, @"Google\Chrome\Application\chrome.exe"),
                Path.Combine(localApp, @"Google\Chrome\Application\chrome.exe"),
                Path.Combine(progFiles, @"BraveSoftware\Brave-Browser\Application\brave.exe"),
                Path.Combine(localApp, @"BraveSoftware\Brave-Browser\Application\brave.exe"),
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
                            if (val != null && File.Exists(val.ToString())) return val.ToString();
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
                            if (val != null && File.Exists(val.ToString())) return val.ToString();
                        }
                    }
                }
                catch { }
            }

            return null;
        }

        private static int GetFreePort()
        {
            try
            {
                TcpListener l = new TcpListener(IPAddress.Loopback, 0);
                l.Start();
                int port = ((IPEndPoint)l.LocalEndpoint).Port;
                l.Stop();
                return port;
            }
            catch
            {
                return 8080;
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

                            string filePath = Path.Combine(_webRoot, urlPath.Replace('/', Path.DirectorySeparatorChar));

                            string fullWebRoot = Path.GetFullPath(_webRoot);
                            string fullFilePath = Path.GetFullPath(filePath);

                            if (fullFilePath.StartsWith(fullWebRoot, StringComparison.OrdinalIgnoreCase) && File.Exists(fullFilePath))
                            {
                                byte[] bytes = File.ReadAllBytes(fullFilePath);
                                string mime = GetMimeType(fullFilePath);
                                context.Response.ContentType = mime;
                                context.Response.ContentLength64 = bytes.Length;
                                context.Response.StatusCode = 200;
                                context.Response.OutputStream.Write(bytes, 0, bytes.Length);
                            }
                            else
                            {
                                // SPA fallback: serve index.html
                                string indexPath = Path.Combine(_webRoot, "index.html");
                                if (File.Exists(indexPath))
                                {
                                    byte[] bytes = File.ReadAllBytes(indexPath);
                                    context.Response.ContentType = "text/html; charset=utf-8";
                                    context.Response.ContentLength64 = bytes.Length;
                                    context.Response.StatusCode = 200;
                                    context.Response.OutputStream.Write(bytes, 0, bytes.Length);
                                }
                                else
                                {
                                    context.Response.StatusCode = 404;
                                }
                            }
                        }
                        catch
                        {
                            context.Response.StatusCode = 500;
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
                case ".ico": return "image/x-icon";
                case ".webp": return "image/webp";
                case ".wav": return "audio/wav";
                case ".mp3": return "audio/mpeg";
                case ".ogg": return "audio/ogg";
                case ".m4a": return "audio/mp4";
                case ".woff": return "font/woff";
                case ".woff2": return "font/woff2";
                case ".ttf": return "font/ttf";
                default: return "application/octet-stream";
            }
        }
    }
}
