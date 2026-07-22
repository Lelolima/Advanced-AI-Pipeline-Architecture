import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '../index.css';

console.log('[MAIN] Aplicação iniciada');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('[MAIN] ERRO: Root element não encontrado!');
} else {
  console.log('[MAIN] Renderizando App...');
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('[MAIN] App renderizado!');
}