import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, background: '#0a0d14', color: '#ff0055', fontFamily: 'sans-serif', minHeight: '100vh' }}>
          <h2 style={{ color: '#ff4757' }}>⚠️ TERJADI KESALAHAN PADA APLIKASI DETEKTIF</h2>
          <p style={{ color: '#ffffff', fontSize: 14, marginBottom: 8 }}>
            Detail Pesan Kesalahan (Error Detail):
          </p>
          <pre style={{ background: '#121824', padding: 16, borderRadius: 8, color: '#ffea00', overflow: 'auto', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: 13 }}>
            {this.state.error?.toString()}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
          <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
            <button 
              onClick={() => window.location.reload()} 
              style={{ padding: '12px 24px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}
            >
              🔄 Muat Ulang Halaman (Reload)
            </button>
            <button 
              onClick={() => {
                try { localStorage.clear(); } catch {}
                window.location.reload();
              }} 
              style={{ padding: '12px 24px', background: '#ef4444', color: '#ffffff', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}
            >
              🧹 Reset Data & Reset Sesi Masuk
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
