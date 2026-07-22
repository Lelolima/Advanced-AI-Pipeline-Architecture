import { useMemo } from 'react';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface DonutChartProps {
  data: ChartData[];
  size?: number;
  thickness?: number;
  showLabels?: boolean;
  showValues?: boolean;
  centerLabel?: string;
  centerValue?: string | number;
}

const DEFAULT_COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#22c55e', // green
  '#f97316', // orange
  '#ef4444', // red
  '#6366f1'  // indigo
];

export function DonutChart({
  data,
  size = 200,
  thickness = 20,
  showLabels = true,
  showValues = true,
  centerLabel,
  centerValue
}: DonutChartProps) {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const segments = useMemo(() => {
    let currentAngle = 0;
    return data.map((item, index) => {
      const percentage = item.value / total;
      const angle = percentage * 360;
      const segment = {
        ...item,
        startAngle: currentAngle,
        angle,
        percentage,
        color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]
      };
      currentAngle += angle;
      return segment;
    });
  }, [data, total]);

  const radius = size / 2;
  const center = radius;
  const innerRadius = radius - thickness;

  const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      `M ${start.x} ${start.y}`,
      `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      `L ${polarToCartesian(cx, cy, r - thickness, endAngle).x} ${polarToCartesian(cx, cy, r - thickness, endAngle).y}`,
      `A ${r - thickness} ${r - thickness} 0 ${largeArcFlag} 1 ${polarToCartesian(cx, cy, r - thickness, startAngle).x} ${polarToCartesian(cx, cy, r - thickness, startAngle).y}`,
      'Z'
    ].join(' ');
  };

  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = (angle - 90) * Math.PI / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius - 2}
          fill="none"
          stroke="rgba(51, 65, 85, 0.5)"
          strokeWidth={thickness}
        />

        {/* Segments */}
        {segments.map((segment, index) => (
          <path
            key={index}
            d={describeArc(center, center, radius - 1, segment.startAngle, segment.startAngle + segment.angle)}
            fill={segment.color}
            className="transition-opacity duration-300 hover:opacity-80"
            style={{
              filter: `drop-shadow(0 0 8px ${segment.color}60)`
            }}
          >
            <title>{`${segment.label}: ${segment.percentage.toFixed(1)}%`}</title>
          </path>
        ))}

        {/* Centro do gráfico */}
        {(centerLabel || centerValue) && (
          <g>
            <circle
              cx={center}
              cy={center}
              r={innerRadius - 8}
              fill="rgba(15, 23, 42, 0.9)"
            />
            {centerLabel && (
              <text
                x={center}
                y={center - 8}
                textAnchor="middle"
                className="fill-slate-400"
                style={{ fontSize: '12px', fontWeight: '500' }}
              >
                {centerLabel}
              </text>
            )}
            {centerValue && (
              <text
                x={center}
                y={center + 12}
                textAnchor="middle"
                className="fill-white"
                style={{ fontSize: '20px', fontWeight: 'bold' }}
              >
                {centerValue}
              </text>
            )}
          </g>
        )}
      </svg>

      {/* Legenda */}
      {showLabels && (
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: `${segment.color}20` }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300">{segment.label}</span>
                {showValues && (
                  <span className="text-xs font-semibold" style={{ color: segment.color }}>
                    {segment.percentage.toFixed(1)}%
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

export default DonutChart;