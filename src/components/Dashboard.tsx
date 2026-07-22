import { useState, useEffect } from 'react';
import { MetricsCard, StatCard, DonutChart, BarChart, ProgressBar } from '../components';
import type { DashboardMetrics, SystemStatus, AnalysisHistory } from '../types';

// Dados simulados para demonstração
const MOCK_METRICS: DashboardMetrics = {
  totalAnalyses: 12847,
  analysesToday: 342,
  averageProcessingTime: 1250,
  successRate: 98.7,
  textAnalyses: 5234,
  imageAnalyses: 4521,
  multimodalAnalyses: 3092,
  historicalData: [
    { date: '2024-01-01', count: 120, averageConfidence: 0.85 },
    { date: '2024-01-02', count: 145, averageConfidence: 0.87 },
    { date: '2024-01-03', count: 132, averageConfidence: 0.86 },
    { date: '2024-01-04', count: 167, averageConfidence: 0.89 },
    { date: '2024-01-05', count: 189, averageConfidence: 0.91 },
    { date: '2024-01-06', count: 156, averageConfidence: 0.88 },
    { date: '2024-01-07', count: 201, averageConfidence: 0.92 }
  ]
};

const MOCK_STATUS: SystemStatus = {
  backend: {
    status: 'online',
    latency: 45,
    version: '2.1.0'
  },
  models: [
    { name: 'CNN (EfficientNet)', status: 'available', memory: 234, gpu: 45 },
    { name: 'LLM (BERT)', status: 'available', memory: 512, gpu: 78 },
    { name: 'RNN (LSTM)', status: 'available', memory: 128, gpu: 23 },
    { name: 'Fusion Model', status: 'available', memory: 384, gpu: 67 }
  ],
  lastCheck: new Date().toISOString()
};

const MOCK_HISTORY: AnalysisHistory[] = [
  {
    id: '1',
    mode: 'text',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    input: { text: 'Análise de sentimento do produto...' },
    result: { status: 'success', confidence: 0.92, model: 'bert-base', processingTime: 234 } as any,
    duration: 234,
    exported: true
  },
  {
    id: '2',
    mode: 'image',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    input: { image: 'produto_001.jpg' },
    result: { status: 'success', confidence: 0.87, model: 'efficientnet', processingTime: 456 } as any,
    duration: 456,
    exported: false
  },
  {
    id: '3',
    mode: 'multimodal',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    input: { text: 'Produto excelente...', image: 'review_002.jpg' },
    result: { status: 'success', confidence: 0.94, model: 'fusion-v2', processingTime: 789 } as any,
    duration: 789,
    exported: true
  }
];

interface DashboardProps {
  refreshInterval?: number;
  onRefresh?: () => void;
}

export function Dashboard({ refreshInterval = 30000, onRefresh }: DashboardProps) {
  const [metrics, setMetrics] = useState<DashboardMetrics>(MOCK_METRICS);
  const [status, setStatus] = useState<SystemStatus>(MOCK_STATUS);
  const [history, setHistory] = useState<AnalysisHistory[]>(MOCK_HISTORY);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'models' | 'history'>('overview');

  // Atualizar dados periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const refreshData = async () => {
    setIsLoading(true);
    // Simular fetch de dados
    await new Promise(resolve => setTimeout(resolve, 500));

    // Atualizar com dados ligeiramente diferentes para mostrar atualização
    setMetrics(prev => ({
      ...prev,
      totalAnalyses: prev.totalAnalyses + Math.floor(Math.random() * 10),
      averageProcessingTime: prev.averageProcessingTime + (Math.random() * 20 - 10)
    }));

    setStatus(prev => ({
      ...prev,
      backend: {
        ...prev.backend,
        latency: prev.backend.latency + (Math.random() * 10 - 5)
      },
      lastCheck: new Date().toISOString()
    }));

    setIsLoading(false);
    onRefresh?.();
  };

  const sentimentDistribution = [
    { label: 'Positivo', value: 45, color: '#22c55e' },
    { label: 'Negativo', value: 25, color: '#ef4444' },
    { label: 'Neutro', value: 30, color: '#64748b' }
  ];

  const analysisTypes = [
    { label: 'Texto', value: metrics.textAnalyses, color: '#3b82f6' },
    { label: 'Imagem', value: metrics.imageAnalyses, color: '#8b5cf6' },
    { label: 'Multimodal', value: metrics.multimodalAnalyses, color: '#f97316' }
  ];

  const hourlyData = [
    { label: '00h', value: 45 },
    { label: '04h', value: 23 },
    { label: '08h', value: 156 },
    { label: '12h', value: 234 },
    { label: '16h', value: 189 },
    { label: '20h', value: 98 }
  ];

  return (
    <div className="space-y-6">
      {/* Header do Dashboard */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Analytics</h2>
          <p className="text-slate-400 text-sm mt-1">Métricas em tempo real do pipeline AI</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {isLoading ? '↻ Atualizando...' : '↻ Atualizar'}
          </button>
          <div className="text-xs text-slate-500">
            Última: {new Date(status.lastCheck).toLocaleTimeString('pt-BR')}
          </div>
        </div>
      </div>

      {/* Tabs de Navegação */}
      <div className="flex gap-2 border-b border-slate-700">
        {[
          { id: 'overview', label: 'Visão Geral', icon: '📊' },
          { id: 'models', label: 'Modelos', icon: '🧠' },
          { id: 'history', label: 'Histórico', icon: '📜' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`
              px-4 py-2 text-sm font-medium transition-colors border-b-2
              ${activeTab === tab.id
                ? 'text-blue-400 border-blue-400'
                : 'text-slate-400 border-transparent hover:text-slate-300'}
            `}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo do Dashboard */}
      {activeTab === 'overview' && (
        <>
          {/* Cards de Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Total de Análises"
              value={metrics.totalAnalyses}
              change={12.5}
              icon="📈"
              color="blue"
              subtitle="Acumulado geral"
              trend="up"
              sparkline={[0.6, 0.7, 0.65, 0.8, 0.85, 0.9, 0.95]}
            />
            <MetricsCard
              title="Análises Hoje"
              value={metrics.analysesToday}
              change={8.2}
              icon="📅"
              color="green"
              subtitle="Últimas 24h"
              trend="up"
            />
            <MetricsCard
              title="Tempo Médio"
              value={`${Math.round(metrics.averageProcessingTime)}ms`}
              change={-5.3}
              icon="⚡"
              color="purple"
              subtitle="Latência média"
              trend="down"
            />
            <MetricsCard
              title="Taxa de Sucesso"
              value={`${metrics.successRate}%`}
              change={0.8}
              icon="✓"
              color="orange"
              subtitle="Precisão"
              trend="up"
            />
          </div>

          {/* Gráficos e Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distribuição de Sentimento */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Distribuição de Sentimento</h3>
              <DonutChart
                data={sentimentDistribution}
                size={180}
                thickness={24}
                centerLabel="Sentimento"
                centerValue={`${sentimentDistribution[0].value}%`}
              />
            </div>

            {/* Tipos de Análise */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Análises por Tipo</h3>
              <BarChart
                data={analysisTypes}
                height={180}
                showValues
                animated
              />
            </div>
          </div>

          {/* Activity por Hora */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Atividade por Horário</h3>
            <BarChart
              data={hourlyData}
              height={150}
              showGrid
              showValues={false}
            />
          </div>

          {/* Stats Secundários */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard label="Processadas" value={metrics.totalAnalyses} icon="🔄" color="blue" delay={0} />
            <StatCard label="Texto" value={metrics.textAnalyses} icon="📄" color="purple" delay={100} />
            <StatCard label="Imagem" value={metrics.imageAnalyses} icon="🖼️" color="green" delay={200} />
            <StatCard label="Multimodal" value={metrics.multimodalAnalyses} icon="🔗" color="orange" delay={300} />
            <StatCard label="Sucesso" value={`${metrics.successRate}%`} icon="✓" color="blue" delay={400} />
            <StatCard label="Latência" value={`${Math.round(metrics.averageProcessingTime)}ms`} icon="⚡" color="red" delay={500} />
          </div>
        </>
      )}

      {/* Tab de Modelos */}
      {activeTab === 'models' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Status dos Modelos</h3>
          {status.models.map((model, index) => (
            <div
              key={index}
              className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-3 h-3 rounded-full
                  ${model.status === 'available' ? 'bg-green-500 animate-pulse' :
                    model.status === 'loading' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}
                `} />
                <div>
                  <div className="text-white font-medium">{model.name}</div>
                  <div className="text-xs text-slate-400">
                    Mem: {model.memory}MB | GPU: {model.gpu}%
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ProgressBar
                  value={model.gpu}
                  size="sm"
                  color={model.gpu > 80 ? 'red' : model.gpu > 50 ? 'orange' : 'green'}
                  showValue={false}
                  animated={false}
                />
                <span className="text-sm text-slate-400 w-12 text-right">{model.gpu}%</span>
              </div>
            </div>
          ))}

          {/* Status do Backend */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Backend API</h4>
              <div className={`
                px-3 py-1 rounded-full text-xs font-semibold
                ${status.backend.status === 'online' ? 'bg-green-500/20 text-green-400' :
                  status.backend.status === 'degraded' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'}
              `}>
                {status.backend.status.toUpperCase()}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">
                <span className="text-slate-400">Latência:</span>
                <span className={`ml-2 font-medium ${
                  status.backend.latency < 50 ? 'text-green-400' :
                  status.backend.latency < 100 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {Math.round(status.backend.latency)}ms
                </span>
              </div>
              <div className="text-sm">
                <span className="text-slate-400">Versão:</span>
                <span className="ml-2 font-medium text-blue-400">{status.backend.version}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab de Histórico */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Histórico Recente</h3>
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${item.mode === 'text' ? 'bg-blue-500/20' :
                    item.mode === 'image' ? 'bg-purple-500/20' : 'bg-orange-500/20'}
                `}>
                  {item.mode === 'text' ? '📄' : item.mode === 'image' ? '🖼️' : '🔗'}
                </div>
                <div>
                  <div className="text-white font-medium capitalize">{item.mode} Analysis</div>
                  <div className="text-xs text-slate-400">
                    {new Date(item.timestamp).toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-slate-400">Duração</div>
                  <div className="text-sm font-medium text-white">{item.duration}ms</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Confiança</div>
                  <div className="text-sm font-medium text-green-400">
                    {((item.result as any)?.confidence * 100 || 0).toFixed(0)}%
                  </div>
                </div>
                {item.exported && (
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                    Exportado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;