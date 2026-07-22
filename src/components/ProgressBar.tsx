import { useState, useEffect } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'gradient';
  animated?: boolean;
  striped?: boolean;
}

const COLOR_MAP = {
  blue: { from: '#3b82f6', to: '#2563eb' },
  purple: { from: '#8b5cf6', to: '#7c3aed' },
  green: { from: '#22c55e', to: '#16a34a' },
  orange: { from: '#f97316', to: '#ea580c' },
  red: { from: '#ef4444', to: '#dc2626' },
  gradient: { from: '#3b82f6', to: '#8b5cf6' }
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  size = 'md',
  color = 'blue',
  animated = true,
  striped = false
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  useEffect(() => {
    if (!animated) {
      setDisplayValue(percentage);
      return;
    }

    const duration = 800;
    const steps = 40;
    const increment = (percentage - displayValue) / steps;
    let current = displayValue;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplayValue(percentage);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [percentage, animated]);

  const heights = { sm: 'h-2', md: 'h-3', lg: 'h-4' };
  const colors = COLOR_MAP[color];

  return (
    <div className="w-full">
      {/* Label e valor */}
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm text-slate-400 font-medium">{label}</span>}
          {showValue && (
            <span className="text-sm font-semibold" style={{ color: colors.from }}>
              {displayValue.toFixed(1)}%
            </span>
          )}
        </div>
      )}

      {/* Barra */}
      <div
        className={`w-full ${heights[size]} rounded-full overflow-hidden`}
        style={{
          background: 'rgba(51, 65, 85, 0.5)',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${striped ? 'striped' : ''}`}
          style={{
            width: `${displayValue}%`,
            background: color === 'gradient'
              ? `linear-gradient(90deg, ${colors.from}, ${colors.to})`
              : `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
            boxShadow: `0 0 10px ${colors.from}80, inset 0 1px 2px rgba(255, 255, 255, 0.2)`
          }}
        >
          {/* Brilho animado */}
          {animated && (
            <div
              className="absolute top-0 left-0 h-full w-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                animation: 'shine 2s infinite',
                transform: 'skewX(-20deg)'
              }}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(500%) skewX(-20deg); }
        }
        .striped {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
          );
        }
      `}</style>
    </div>
  );
}

export default ProgressBar;