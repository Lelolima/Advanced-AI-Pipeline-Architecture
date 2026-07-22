// Versão simplificada para teste - App mínimo funcional
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      color: 'white',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          ✅ Advanced AI Pipeline
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
          Aplicação carregada com sucesso!
        </p>

        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🎉 Status: OK</h2>
          <p style={{ color: '#86efac' }}>
            React + Vite + TypeScript estão funcionando corretamente.
          </p>
        </div>

        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '1rem',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>📊 Contador de Teste</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => setCount(c => Math.max(0, c - 1))}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#ef4444',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              −
            </button>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', minWidth: '60px', textAlign: 'center' }}>
              {count}
            </span>
            <button
              onClick={() => setCount(c => c + 1)}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#22c55e',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              +
            </button>
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '0.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#a78bfa' }}>
            💡 <strong>Próximo passo:</strong> Substitua este arquivo pelo App.tsx completo quando o básico estiver funcionando.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;