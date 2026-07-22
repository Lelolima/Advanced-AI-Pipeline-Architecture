import { useEffect, useState } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'red';
  trend?: number;
  delay?: number;
}

const COLOR_MAP = {
  blue: { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.4)', text: '#60a5fa', glow: 'rgba(59, 130, 246, 0.2)' },
  purple: { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.4)', text: '#a78bfa', glow: 'rgba(139, 92, 246, 0.2)' },
  green: { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.4)', text: '#86efac', glow: 'rgba(34, 197, 94, 0.2)' },
  orange: { bg: 'rgba(249, 115, 22, 0.15)', border: 'rgba(249, 115, 22, 0.4)', text: '#fdba74', glow: 'rgba(249, 115, 22, 0.2)' },
  red: { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', text: '#fca5a5', glow: 'rgba(239, 68, 68, 0.2)' }
};

export function StatCard({
  label,
  value,
  icon = '📈',
  color = 'blue',
  trend,
  delay = 0
}: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = typeof value === 'number' ? value : parseFloat(value as string) || 0;
    if (numericValue === 0) {
      setDisplayValue(0);
      return;
    }

    const duration = 1200;
    const steps = 50;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  const colors = COLOR_MAP[color];

  return (
    <div
      className={`
        relative p-4 rounded-xl border transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{
        background: colors.bg,
        borderColor: colors.border,
        boxShadow: `0 8px 32px ${colors.glow}`
      }}
    >
      {/* Efeito de brilho no hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${colors.glow} 0%, transparent 70%)`
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl">{icon}</span>
          {trend !== undefined && (
            <div
              className={`
                flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
                ${trend >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
              `}
            >
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </div>
          )}
        </div>

        {/* Valor */}
        <div className="mb-2">
          <span
            className="text-3xl font-bold"
            style={{ color: colors.text }}
          >
            {typeof value === 'number' && value >= 1000
              ? `${(displayValue / 1000).toFixed(1)}k`
              : typeof value === 'number'
              ? Math.round(displayValue * 10) / 10
              : value}
          </span>
        </div>

        {/* Label */}
        <div className="text-sm text-slate-400 font-medium">{label}</div>

        {/* Indicador de atividade */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.text }}
            />
            <div
              className="absolute inset-0 w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: colors.text, opacity: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;