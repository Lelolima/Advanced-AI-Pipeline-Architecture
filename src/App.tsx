// App.tsx - Versão funcional simplificada
// Esta versão é auto-contida e não depende de hooks customizados

import { useState, useCallback, useEffect } from 'react';

const API_URL = 'http://localhost:8000';

const NODE_ICONS: Record<string, string> = {
  input: '📄',
  cnn: '👁️',
  llm: '💬',
  rnn: '🕸️',
  integration: '🔗',
  output: '⚡'
};

const NODE_DETAILS: Record<string, { title: string; tech: string; description: string; features: string[] }> = {
  input: {
    title: 'Input Data Layer',
    tech: 'HTML5 File API',
    description: 'Camada de entrada de dados multimodais',
    features: ['Upload', 'Validação', 'Preview']
  },
  cnn: {
    title: 'CNN - EfficientNet',
    tech: 'TensorFlow',
    description: 'Rede neural para características visuais',
    features: ['784 features', 'Batch norm', 'Dropout 0.3']
  },
  llm: {
    title: 'LLM - BERT',
    tech: 'Transformers',
    description: 'Modelo para linguagem natural',
    features: ['768 dimensões', '12 camadas', '12 heads']
  },
  rnn: {
    title: 'RNN - LSTM',
    tech: 'Bidirectional LSTM',
    description: 'Rede para padrões sequenciais',
    features: ['256 unidades', 'Bidirecional', 'Dropout 0.2']
  },
  integration: {
    title: 'Integration Layer',
    tech: 'Cross-Attention',
    description: 'Fusão de features multimodais',
    features: ['Attention weights', 'Fusão híbrida']
  },
  output: {
    title: 'Output Layer',
    tech: 'Softmax/Sigmoid',
    description: 'Predições finais e classificações',
    features: ['5 classes', 'Confidence scoring']
  }
};

const PIPELINE_NODES = [
  { id: 'input', title: 'Input Data', description: 'Raw images and text data enter the pipeline', color: 'bg-blue-500' },
  { id: 'cnn', title: 'CNN', description: 'Processes visual data using convolutional neural networks', color: 'bg-purple-500' },
  { id: 'llm', title: 'LLM', description: 'Analyzes and processes textual data', color: 'bg-green-500' },
  { id: 'rnn', title: 'RNN', description: 'Processes sequential data and temporal patterns', color: 'bg-orange-500' },
  { id: 'integration', title: 'Integration Layer', description: 'Combines outputs from all models', color: 'bg-red-500' },
  { id: 'output', title: 'Final Output', description: 'Generates predictions and insights', color: 'bg-indigo-500' }
];

const COLOR_MAP: Record<string, string> = {
  'bg-blue-500': 'rgba(59, 130, 246, 0.2)',
  'bg-purple-500': 'rgba(168, 85, 247, 0.2)',
  'bg-green-500': 'rgba(34, 197, 94, 0.2)',
  'bg-orange-500': 'rgba(249, 115, 22, 0.2)',
  'bg-red-500': 'rgba(239, 68, 68, 0.2)',
  'bg-indigo-500': 'rgba(99, 102, 241, 0.2)'
};

interface AnalysisResult {
  status: 'success' | 'error' | 'pending';
  mode: 'text' | 'image' | 'multimodal' | null;
  data: Record<string, unknown>;
  message: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'analysis'>('analysis');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [textResult, setTextResult] = useState<AnalysisResult | null>(null);
  const [textLoading, setTextLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${API_URL}/health`, { method: 'GET' });
        setIsOnline(response.ok);
      } catch {
        setIsOnline(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleTextAnalysis = useCallback(async () => {
    if (!textInput.trim()) return;
    setTextLoading(true);
    try {
      const response = await fetch(`${API_URL}/analyze/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textInput }),
      });
      if (response.ok) {
        const data = await response.json();
        setTextResult({ status: 'success', mode: 'text', data, message: 'Análise concluída' });
      } else {
        throw new Error('Backend indisponível');
      }
    } catch {
      const words = textInput.trim().split(/\s+/).length;
      const sentences = (textInput.match(/[.!?]+/g) || []).length || 1;
      setTextResult({
        status: 'success',
        mode: 'text',
        data: { word_count: words, sentence_count: sentences },
        message: 'Análise local (backend offline)'
      });
    }
    setTextLoading(false);
  }, [textInput]);

  const handleImageSelect = useCallback((file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      color: 'white',
      padding: 0,
      margin: 0
    }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #1e293b',
        padding: '1rem 0'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🧠</span>
              <div>
                <h1 style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  margin: 0,
                  background: 'linear-gradient(to right, #60a5fa, #a78bfa, #f472b6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Advanced AI Pipeline
                </h1>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
                  CNN + LLM + RNN • {isOnline === null ? 'Iniciando...' : isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setActiveTab('pipeline')}
                style={{
                  padding: '0.5rem 1rem',
                  background: activeTab === 'pipeline' ? '#3b82f6' : 'transparent',
                  border: `1px solid ${activeTab === 'pipeline' ? '#3b82f6' : '#334155'}`,
                  borderRadius: '0.5rem',
                  color: activeTab === 'pipeline' ? 'white' : '#94a3b8',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                📊 Pipeline
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                style={{
                  padding: '0.5rem 1rem',
                  background: activeTab === 'analysis' ? '#8b5cf6' : 'transparent',
                  border: `1px solid ${activeTab === 'analysis' ? '#8b5cf6' : '#334155'}`,
                  borderRadius: '0.5rem',
                  color: activeTab === 'analysis' ? 'white' : '#94a3b8',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                🔬 Análise
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Pipeline Tab */}
        {activeTab === 'pipeline' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {PIPELINE_NODES.map((node, idx) => {
              const isSelected = selectedNode === node.id;
              const details = NODE_DETAILS[node.id];
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(prev => prev === node.id ? null : node.id)}
                  style={{
                    padding: '1.75rem',
                    borderRadius: '1rem',
                    border: `2px solid ${isSelected ? '#ffffff' : '#334155'}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: isSelected ? 'scale(1.02) translateY(-4px)' : 'scale(1)',
                    background: COLOR_MAP[node.color] || 'rgba(99, 102, 241, 0.2)',
                    boxShadow: isSelected ? '0 20px 40px rgba(168, 85, 247, 0.3)' : '0 4px 6px rgba(0,0,0,0.2)'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{NODE_ICONS[node.id]}</div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{node.title}</h2>
                  <p style={{ color: '#cbd5e1', fontSize: '0.875rem', margin: 0 }}>{node.description}</p>
                  {isSelected && details && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '0.75rem', color: '#a78bfa', marginBottom: '0.5rem', fontFamily: 'monospace' }}>
                        {details.tech}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                        {details.features.map((f, i) => (
                          <span key={i} style={{ fontSize: '0.7rem', color: '#94a3b8', background: 'rgba(139,92,246,0.1)', padding: '2px 6px', borderRadius: '4px' }}>✓ {f}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Texto */}
            <section style={{
              background: 'rgba(30, 41, 59, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid #334155'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>📄 Análise de Texto (LLM)</h3>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Digite um texto para análise..."
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid #475569',
                  borderRadius: '0.5rem',
                  color: 'white',
                  resize: 'vertical',
                  minHeight: '120px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
              <button
                onClick={handleTextAnalysis}
                disabled={textLoading || !textInput.trim()}
                style={{
                  marginTop: '0.75rem',
                  padding: '0.75rem 1.5rem',
                  background: textLoading ? '#475569' : 'linear-gradient(to right, #3b82f6, #2563eb)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: textLoading ? '#94a3b8' : 'white',
                  cursor: textLoading ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  width: '100%',
                  opacity: textLoading || !textInput.trim() ? 0.6 : 1
                }}
              >
                {textLoading ? '⏳ Analisando...' : '📊 Analisar Texto'}
              </button>
              {textResult && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: textResult.status === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  border: `1px solid ${textResult.status === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  borderRadius: '0.75rem'
                }}>
                  <p style={{ fontWeight: 600, color: textResult.status === 'success' ? '#86efac' : '#fca5a5' }}>
                    {textResult.message}
                  </p>
                  {textResult.data && Object.keys(textResult.data).length > 0 && (
                    <pre style={{
                      marginTop: '0.75rem',
                      padding: '0.75rem',
                      background: 'rgba(15, 23, 42, 0.8)',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      color: '#64748b',
                      overflow: 'auto',
                      maxHeight: '200px'
                    }}>
                      {JSON.stringify(textResult.data, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </section>

            {/* Imagem */}
            <section style={{
              background: 'rgba(30, 41, 59, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid #334155'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>👁️ Análise de Imagem (CNN)</h3>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])}
                style={{ display: 'none' }}
                id="image-input"
              />
              <label
                htmlFor="image-input"
                style={{
                  padding: '2rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: imagePreview ? '2px solid #8b5cf6' : '2px dashed #475569',
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                {imagePreview ? (
                  <div>
                    <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '0.5rem' }} />
                    {imageFile && (
                      <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                        {imageFile.name}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📷</div>
                    <p style={{ color: '#94a3b8' }}>Clique para selecionar</p>
                  </div>
                )}
              </label>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #1e293b',
        padding: '1.5rem',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.875rem'
      }}>
        <p style={{ margin: 0 }}>Advanced AI Pipeline Architecture © 2024</p>
      </footer>
    </div>
  );
}