import { useState, useEffect } from 'react';
import { PIPELINE_NODES } from '../constants/pipeline';

interface AnimatedPipelineProps {
  activeNode?: string;
  isProcessing?: boolean;
  onNodeClick?: (nodeId: string) => void;
}

const NODE_ICONS: Record<string, string> = {
  input: '📄',
  cnn: '👁️',
  llm: '💬',
  rnn: '🕸️',
  integration: '🔗',
  output: '⚡'
};

const COLOR_MAP: Record<string, { bg: string; border: string; glow: string }> = {
  'bg-blue-500': { bg: 'rgba(59, 130, 246, 0.2)', border: 'rgba(59, 130, 246, 0.5)', glow: 'rgba(59, 130, 246, 0.3)' },
  'bg-purple-500': { bg: 'rgba(168, 85, 247, 0.2)', border: 'rgba(168, 85, 247, 0.5)', glow: 'rgba(168, 85, 247, 0.3)' },
  'bg-green-500': { bg: 'rgba(34, 197, 94, 0.2)', border: 'rgba(34, 197, 94, 0.5)', glow: 'rgba(34, 197, 94, 0.3)' },
  'bg-orange-500': { bg: 'rgba(249, 115, 22, 0.2)', border: 'rgba(249, 115, 22, 0.5)', glow: 'rgba(249, 115, 22, 0.3)' },
  'bg-red-500': { bg: 'rgba(239, 68, 68, 0.2)', border: 'rgba(239, 68, 68, 0.5)', glow: 'rgba(239, 68, 68, 0.3)' },
  'bg-indigo-500': { bg: 'rgba(99, 102, 241, 0.2)', border: 'rgba(99, 102, 241, 0.5)', glow: 'rgba(99, 102, 241, 0.3)' }
};

export function AnimatedPipeline({ activeNode, isProcessing, onNodeClick }: AnimatedPipelineProps) {
  const [flowProgress, setFlowProgress] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Animação do fluxo de dados
  useEffect(() => {
    if (!isProcessing) {
      setFlowProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setFlowProgress(prev => (prev >= 5 ? prev : prev + 0.5));
    }, 100);

    return () => clearInterval(interval);
  }, [isProcessing]);

  const getNodeStatus = (nodeId: string, index: number) => {
    if (!isProcessing) return 'idle';
    if (activeNode === nodeId) return 'active';
    if (flowProgress > index) return 'completed';
    if (flowProgress > index - 0.5) return 'processing';
    return 'pending';
  };

  return (
    <div className="relative">
      {/* Linha de fluxo */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700/50 rounded-full" />
      <div
        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 via-orange-500 via-red-500 to-indigo-500 rounded-full transition-all duration-300"
        style={{ width: `${(flowProgress / 5) * 100}%` }}
      />

      {/* Nodes */}
      <div className="relative grid grid-cols-6 gap-2 md:gap-4">
        {PIPELINE_NODES.map((node, index) => {
          const status = getNodeStatus(node.id, index);
          const colors = COLOR_MAP[node.color];
          const isHovered = hoveredNode === node.id;
          const isActive = activeNode === node.id;

          return (
            <div
              key={node.id}
              className="flex flex-col items-center gap-2"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onNodeClick?.(node.id)}
            >
              {/* Nodo */}
              <div
                className={`
                  relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
                  transition-all duration-300 cursor-pointer
                  ${status === 'active' ? 'scale-110' : status === 'processing' ? 'scale-105' : 'scale-100'}
                `}
                style={{
                  background: isActive || isHovered
                    ? `linear-gradient(135deg, ${colors.bg} 0%, rgba(15, 23, 42, 0.8) 100%)`
                    : `rgba(15, 23, 42, 0.8)`,
                  border: `2px solid ${isActive ? '#fff' : isHovered ? colors.border : colors.border}`,
                  boxShadow: isActive || isHovered
                    ? `0 0 30px ${colors.glow}, inset 0 0 20px ${colors.bg}`
                    : status === 'completed'
                    ? `0 0 15px ${colors.glow}`
                    : 'none'
                }}
              >
                {/* Anel de processamento */}
                {status === 'processing' && (
                  <div
                    className="absolute inset-0 rounded-full border-2 border-transparent"
                    style={{
                      borderTopColor: colors.border,
                      borderRightColor: colors.border,
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                )}

                {/* Ícone */}
                <span className="text-2xl md:text-3xl z-10">{NODE_ICONS[node.id]}</span>

                {/* Indicador de status */}
                <div
                  className={`
                    absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center
                    text-xs font-bold border-2 border-slate-900
                    ${status === 'completed' ? 'bg-green-500' : status === 'processing' ? 'bg-yellow-500 animate-pulse' :
                       status === 'active' ? 'bg-blue-500' : 'bg-slate-600'}
                  `}
                >
                  {status === 'completed' ? '✓' : index + 1}
                </div>
              </div>

              {/* Label */}
              <div className="text-center">
                <div
                  className={`
                    text-xs md:text-sm font-semibold transition-colors duration-200
                    ${isActive ? 'text-white' : isHovered ? 'text-blue-400' : 'text-slate-400'}
                  `}
                >
                  {node.title}
                </div>
                {isHovered && (
                  <div className="hidden md:block text-xs text-slate-500 mt-1 max-w-[150px]">
                    {node.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Partículas de fluxo */}
      {isProcessing && (
        <div className="absolute top-1/2 left-0 right-0 h-4 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-60"
              style={{
                left: `${(flowProgress * 16 + i * 20) % 100}%`,
                animation: `particleFlow 2s ease-in-out infinite ${i * 0.3}s`,
                filter: 'blur(1px)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes particleFlow {
          0%, 100% { opacity: 0; transform: translateY(-10px); }
          50% { opacity: 0.6; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default AnimatedPipeline;