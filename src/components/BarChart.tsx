import { useMemo, useState } from 'react';

interface BarChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  height?: number;
  showValues?: boolean;
  showGrid?: boolean;
  animated?: boolean;
  horizontal?: boolean;
}

const DEFAULT_COLORS = [
  '#3b82f6', '#8b5cf6', '#22c55e', '#f97316', '#ef4444', '#6366f1'
];

export function BarChart({
  data,
  height = 200,
  showValues = true,
  showGrid = true,
  animated = true,
  horizontal = false
}: BarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAnimated, setIsAnimated] = useState(!animated);

  const maxValue = useMemo(() => Math.max(...data.map(d => d.value), 1), [data]);

  setTimeout(() => setIsAnimated(true), 100);

  if (horizontal) {
    return (
      <div className="w-full space-y-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="text-xs text-slate-400 w-20 truncate">{item.label}</span>
            <div className="flex-1 h-6 bg-slate-800/50 rounded-md overflow-hidden">
              <div
                className="h-full rounded-md transition-all duration-700 ease-out relative"
                style={{
                  width: isAnimated ? `${(item.value / maxValue) * 100}%` : '0%',
                  background: `linear-gradient(90deg, ${item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}, ${item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}ee)`,
                  boxShadow: hoveredIndex === index ? `0 0 20px ${item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}80` : 'none'
                }}
              >
                {showValues && hoveredIndex === index && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white drop-shadow-lg">
                    {item.value}
                  </span>
                )}
              </div>
            </div>
            {showValues && hoveredIndex !== index && (
              <span className="text-xs font-semibold text-slate-400 w-12 text-right">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        {/* Grid lines */}
        {showGrid && (
          <>
            {[0, 25, 50, 75, 100].map(y => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="rgba(51, 65, 85, 0.5)"
                strokeWidth="0.5"
              />
            ))}
          </>
        )}

        {/* Bars */}
        {data.map((item, index) => {
          const barWidth = 80 / data.length;
          const x = 10 + index * barWidth + 2;
          const barHeight = (item.value / maxValue) * 80;
          const y = 95 - barHeight;
          const color = item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];

          return (
            <g
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer"
            >
              {/* Bar */}
              <rect
                x={x}
                y={isAnimated ? y : 95}
                width={barWidth}
                height={isAnimated ? barHeight : 0}
                fill={color}
                rx="2"
                className="transition-all duration-700 ease-out"
                style={{
                  filter: hoveredIndex === index ? `drop-shadow(0 0 8px ${color})` : 'none',
                  opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.5 : 1
                }}
              >
                <title>{`${item.label}: ${item.value}`}</title>
              </rect>

              {/* Value label on hover */}
              {showValues && hoveredIndex === index && (
                <text
                  x={x + barWidth / 2}
                  y={y - 2}
                  textAnchor="middle"
                  className="fill-white text-xs font-bold"
                  style={{ fontSize: '4px' }}
                >
                  {item.value}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 px-1">
        {data.map((item, index) => (
          <span
            key={index}
            className="text-xs text-slate-400 truncate"
            style={{ width: `${80 / data.length}%`, textAlign: 'center' }}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default BarChart;