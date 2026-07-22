import React, { useState } from 'react';
import { Activity, Send, Upload, Image, FileText, Loader, CheckCircle, AlertCircle, X, Eye, Brain } from 'lucide-react';

const API_URL = 'http://localhost:8000';

interface AnalysisResult {
  status: string;
  data: Record<string, unknown>;
  message: string;
}

interface Prediction {
  label: string;
  confidence: number;
}

export function AnalysisPanel() {
  const [textInput, setTextInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysisMode, setAnalysisMode] = useState<'text' | 'image' | 'multimodal' | null>(null);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleTextAnalysis = async () => {
    if (!textInput.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setAnalysisMode('text');

    try {
      const response = await fetch(`${API_URL}/analyze/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textInput }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Erro na análise');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handleImageAnalysis = async () => {
    if (!imageFile) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setAnalysisMode('image');

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${API_URL}/analyze/image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Erro na análise');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handleMultimodalAnalysis = async () => {
    if (!textInput.trim() && !imageFile) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setAnalysisMode('multimodal');

    try {
      const response = await fetch(`${API_URL}/analyze/multimodal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textInput,
          image_url: imageFile?.name || null,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Erro na análise');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
    setAnalysisMode(null);
  };

  const renderPredictionBars = (predictions: Prediction[]) => {
    if (!predictions) return null;

    return (
      <div className="space-y-3 mt-4">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Predições (Top 3)</h4>
        {predictions.map((pred, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300 capitalize">{pred.label}</span>
              <span className="text-gray-400">{(pred.confidence * 100).toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${pred.confidence * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTextAnalysis = (data: Record<string, unknown>) => {
    if (!data.sentiment) return null;

    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Sentimento</div>
          <div className={`text-lg font-bold ${
            data.sentiment === 'positivo' ? 'text-green-400' :
            data.sentiment === 'negativo' ? 'text-red-400' : 'text-gray-400'
          }`}>
            {String(data.sentiment)}
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Confiança</div>
          <div className="text-lg font-bold text-blue-400">
            {typeof data.confidence === 'number' ? `${(data.confidence * 100).toFixed(1)}%` : 'N/A'}
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Palavras</div>
          <div className="text-lg font-bold text-purple-400">{data.word_count || 0}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Frases</div>
          <div className="text-lg font-bold text-orange-400">{data.sentence_count || 0}</div>
        </div>
        {data.entities && Array.isArray(data.entities) && data.entities.length > 0 && (
          <div className="col-span-2 bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Entidades Detectadas</div>
            <div className="flex flex-wrap gap-2">
              {data.entities.map((entity: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">
                  {entity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-2xl p-8 border border-gray-700 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Brain className="w-7 h-7 text-purple-400" />
          Painel de Análise
        </h2>
        {result && (
          <button
            onClick={clearResult}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Limpar resultado"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Coluna da Esquerda - Inputs */}
        <div className="space-y-6">
          {/* Input de Texto */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Análise de Texto (LLM/PLN)
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Digite ou cole seu texto aqui para análise de sentimento, entidades e estatísticas..."
              className="w-full p-4 bg-gray-900/50 rounded-xl border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500 transition-all resize-none"
              rows={4}
            />
          </div>

          {/* Input de Imagem */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300 flex items-center gap-2">
              <Image className="w-4 h-4" />
              Análise de Imagem (CNN)
            </label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer group">
                <div className="p-6 bg-gray-900/50 rounded-xl border-2 border-dashed border-gray-600 group-hover:border-purple-500 transition-all text-center hover:bg-gray-900">
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="max-h-32 mx-auto rounded-lg" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-500 group-hover:text-purple-400 transition-colors" />
                      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        Clique ou arraste uma imagem
                      </span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleTextAnalysis}
              disabled={loading || !textInput.trim()}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl font-medium transition-all flex items-center justify-center gap-2 group"
            >
              {loading && analysisMode === 'text' ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
              )}
              Texto
            </button>
            <button
              onClick={handleImageAnalysis}
              disabled={loading || !imageFile}
              className="px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl font-medium transition-all flex items-center justify-center gap-2 group"
            >
              {loading && analysisMode === 'image' ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
              )}
              Imagem
            </button>
            <button
              onClick={handleMultimodalAnalysis}
              disabled={loading || (!textInput.trim() && !imageFile)}
              className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-medium transition-all flex items-center justify-center gap-2 group"
            >
              {loading && analysisMode === 'multimodal' ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              )}
              Multimodal
            </button>
          </div>
        </div>

        {/* Coluna da Direita - Resultados */}
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 min-h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-300 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Resultado da Análise
          </h3>

          {loading && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Loader className="w-12 h-12 animate-spin mb-4 text-purple-400" />
              <p>Processando...</p>
              <p className="text-sm mt-2">
                {analysisMode === 'text' && 'Executando modelo LLM...'}
                {analysisMode === 'image' && 'Executando CNN para extração de features...'}
                {analysisMode === 'multimodal' && 'Integrando análises...'}
              </p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-900/30 border border-red-500 rounded-xl">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
              <div>
                <div className="font-semibold text-red-300">Erro na Análise</div>
                <div className="text-sm text-red-400">{error}</div>
              </div>
            </div>
          )}

          {!loading && !error && !result && (
            <div className="flex flex-col items-center justify-center h-56 text-gray-500">
              <Activity className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-sm">Os resultados da análise aparecerão aqui</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className={`p-4 rounded-xl border ${
                result.status === 'success'
                  ? 'bg-green-900/20 border-green-500/50'
                  : 'bg-yellow-900/20 border-yellow-500/50'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  )}
                  <span className={`font-semibold ${
                    result.status === 'success' ? 'text-green-300' : 'text-yellow-300'
                  }`}>
                    {result.message}
                  </span>
                </div>
              </div>

              {result.data && (
                <>
                  {result.data.sentiment && renderTextAnalysis(result.data)}
                  {result.data.predictions && renderPredictionBars(result.data.predictions as Prediction[])}

                  {result.data.integrated && (
                    <div className="mt-4 p-4 bg-purple-900/20 border border-purple-500/50 rounded-xl">
                      <h4 className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Análise Integrada
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Confiança Combinada:</span>
                          <span className="text-purple-300 font-medium">
                            {typeof result.data.integrated.combined_confidence === 'number'
                              ? `${(result.data.integrated.combined_confidence * 100).toFixed(1)}%`
                              : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Peso Visual:</span>
                          <span className="text-purple-300">
                            {typeof result.data.integrated.visual_weight === 'number'
                              ? `${(result.data.integrated.visual_weight * 100).toFixed(0)}%`
                              : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Peso Textual:</span>
                          <span className="text-purple-300">
                            {typeof result.data.integrated.text_weight === 'number'
                              ? `${(result.data.integrated.text_weight * 100).toFixed(0)}%`
                              : 'N/A'}
                          </span>
                        </div>
                        {result.data.integrated.recommendation && (
                          <div className="mt-3 pt-3 border-t border-purple-700/50">
                            <span className="text-gray-400 block mb-1">Recomendação:</span>
                            <span className="text-purple-200 text-sm">
                              {result.data.integrated.recommendation}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {!result.data.sentiment && !result.data.predictions && !result.data.integrated && (
                    <pre className="text-xs text-gray-400 bg-gray-950 p-4 rounded-lg overflow-auto max-h-64">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}