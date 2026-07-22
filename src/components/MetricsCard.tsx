import { useEffect, useState } from 'react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: string;
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'indigo';
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  sparkline?: number[];
}

const COLOR_MAP = {
  blue: { from: '#3b82f6', to: '#2563eb', bg: 'rgba(59, 130, 246, 0.1)' },
  purple: { from: '#8b5cf6', to: '#7c3aed', bg: 'rgba(139, 92, 246, 0.1)' },
  green: { from: '#22c55e', to: '#16a34a', bg: 'rgba(34, 197, 94, 0.1)' },
  orange: { from: '#f97316', to: '#ea580c', bg: 'rgba(249, 113, 22, 0.1)' },
  red: { from: '#ef4444', to: '#dc2626', bg: 'rgba(239, 68, 68, 0.1)' },
  indigo: { from: '#6366f1', to: '#4f46e5', bg: 'rgba(99, 102, 241, 0.1)' }
};

export function MetricsCard({
  title,
  value,
  change,
  icon = '📊',
  color = 'blue',
  subtitle,
  trend,
  sparkline
}: MetricsCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const numericValue = typeof value === 'number' ? value : 0;

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setAnimatedValue(numericValue);
        clearInterval(timer);
      } else {
        setAnimatedValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue]);

  const colors = COLOR_MAP[color];

  return (
    <div
      className="relative overflow-hidden rounded-xl p-5 transition-all duration-300 hover:scale-105 hover:shadow-xl"
      style={{
        background: `linear-gradient(135deg, ${colors.bg} 0%, rgba(15, 23, 42, 0.8) 100%)`,
        border: `1px solid ${colors.from}30`,
        boxShadow: `0 4px 20px ${colors.from}20`
      }}
    >
      {/* Background gradient effect */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${colors.from} 0%, transparent 70%)`
        }}
      />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-slate-400 font-medium mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold" style={{ color: colors.from }}>
              {typeof value === 'number'
                ? animatedValue >= 1000
                  ? `${(animatedValue / 1000).toFixed(1)}k`
                  : animatedValue >= 100
                  ? Math.round(animatedValue)
                  : animatedValue.toFixed(1)
                : value}
            </span>
            {change !== undefined && (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
                style={{ background: change >= 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)' }}
              >
                {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
              </span>
            )}
          </div>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>

      {/* Sparkline */}
      {sparkline && sparkline.length > 0 && (
        <div className="relative h-12 mb-3">
          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors.from} stopOpacity="0.3" />
                <stop offset="100%" stopColor={colors.from} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`M 0,40 L 0,${40 - sparkline[0] * 40} ${sparkline.map((v, i) =>
                `L ${(i / (sparkline.length - 1)) * 100},${40 - v * 40}`
              ).join(' ')} L 100,40 Z`}
              fill={`url(#gradient-${color})`}
            />
            <path
              d={`M 0,${40 - sparkline[0] * 40} ${sparkline.map((v, i) =>
                `L ${(i / (sparkline.length - 1)) * 100},${40 - v * 40}`
              ).join(' ')}`}
              fill="none"
              stroke={colors.from}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Footer */}
      <div className="relative flex items-center gap-2">
        {trend && (
          <div className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${
                trend === 'up' ? 'bg-green-500 animate-pulse' :
                trend === 'down' ? 'bg-red-500' : 'bg-slate-500'
              }`}
            />
            <span className="text-xs text-slate-400">
              {trend === 'up' ? 'Em上升趋势' : trend === 'down' ? 'Em descenso' : 'Estável'}
            </span>
          </div>
        )}
        {subtitle && (
          <span className="text-xs text-slate-500 ml-auto">{subtitle}</span>
        )}
      </div>
    </div>
  );
}

export default MetricsCard;