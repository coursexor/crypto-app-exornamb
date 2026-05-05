import { useState, useMemo } from 'react';
import './Dashboard.css';

/**
 * Builds a smooth cubic-bezier SVG path string from an array of {x,y} points.
 * Same algorithm as Sparkline.jsx — imported here to avoid duplication.
 */
export function buildSvgPath(points) {
  if (!points || points.length < 2) return '';
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cp1x = (prev.x + (curr.x - prev.x) * 0.4).toFixed(2);
    const cp1y = prev.y.toFixed(2);
    const cp2x = (curr.x - (curr.x - prev.x) * 0.4).toFixed(2);
    const cp2y = curr.y.toFixed(2);
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`;
  }
  return d;
}

const RANGES = [
  { label: '1H',  points: 12 },
  { label: '24H', points: 24 },
  { label: '7D',  points: 28 },
  { label: '1M',  points: 30 },
  { label: '1Y',  points: 52 },
  { label: 'ALL', points: 60 },
];

/**
 * Generates a synthetic upward-biased random walk.
 * Starts near totalValue * 0.72, ends exactly at totalValue.
 */
function generateData(totalValue, n) {
  if (n < 2) return [];
  // If value is 0, return a flat line at 0
  if (!totalValue) return new Array(n).fill(0);
  const start = totalValue * 0.72;
  const target = totalValue;
  const data = [start];
  // We generate n-1 intermediate points, then force the last to target
  for (let i = 1; i < n - 1; i++) {
    const progress = i / (n - 1);
    const trend = start + (target - start) * progress;
    const noise = (Math.random() - 0.44) * totalValue * 0.018;
    data.push(trend + noise);
  }
  data.push(target);
  return data;
}

const W = 300; // internal SVG viewBox width
const H = 120; // internal SVG viewBox height

export default function PortfolioChart({ totalValueUsd, headerLeft }) {
  const [activeRange, setActiveRange] = useState('24H');
  const [hoverIdx, setHoverIdx] = useState(null);

  const rangeConfig = RANGES.find(r => r.label === activeRange) || RANGES[1];

  // Re-generate data when range or totalValue changes
  const data = useMemo(
    () => generateData(totalValueUsd || 0, rangeConfig.points),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeRange, totalValueUsd]
  );

  // Map data to SVG coordinate space (4px vertical padding)
  const points = useMemo(() => {
    if (!data.length) return [];
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const range  = maxVal - minVal || 1;
    const xScale = W / (data.length - 1);
    const yScale = (H - 8) / range;
    return data.map((v, i) => ({
      x: i * xScale,
      y: H - 4 - (v - minVal) * yScale,
      value: v,
    }));
  }, [data]);

  const linePath = buildSvgPath(points);

  // Area path: close down at bottom-right then bottom-left
  const areaPath = points.length > 1
    ? `${linePath} L ${points[points.length - 1].x.toFixed(2)} ${H} L ${points[0].x.toFixed(2)} ${H} Z`
    : '';

  const hoverPoint = hoverIdx !== null ? points[hoverIdx] : null;

  const handleMouseMove = (e) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    if (!points.length) return;
    let closest = 0;
    let minDist = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - x);
      if (d < minDist) { minDist = d; closest = i; }
    });
    setHoverIdx(closest);
  };

  return (
    <div className="pc-wrapper w-full">
      {/* Top Header Row */}
      <div className="flex justify-between items-center mb-6">
        <div>
          {headerLeft}
        </div>
        {/* Range bar */}
        <div className="pc-range-bar">
          {RANGES.map(r => (
            <button
              key={r.label}
              className={`pc-range-btn${activeRange === r.label ? ' active' : ''}`}
              onClick={() => setActiveRange(r.label)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG chart */}
      <div className="pc-svg-wrap">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          style={{ height: 120, opacity: 1, transition: 'opacity 0.2s ease' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIdx(null)}
        >
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#1652F0" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#1652F0" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          {areaPath && (
            <path d={areaPath} fill="url(#portfolioGradient)" stroke="none" />
          )}

          {/* Line */}
          {linePath && (
            <path
              d={linePath}
              stroke="#1652F0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          )}

          {/* Hover hairline + dot */}
          {hoverPoint && (
            <>
              <line
                x1={hoverPoint.x.toFixed(2)}
                y1="0"
                x2={hoverPoint.x.toFixed(2)}
                y2={H}
                stroke="#1652F0"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.5"
              />
              <circle
                cx={hoverPoint.x.toFixed(2)}
                cy={hoverPoint.y.toFixed(2)}
                r="4"
                fill="#1652F0"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </>
          )}
        </svg>

        {/* Hover tooltip */}
        {hoverPoint && (
          <div
            style={{
              position: 'absolute',
              top: Math.max(0, hoverPoint.y / H * 120 - 32),
              left: `${(hoverPoint.x / W) * 100}%`,
              transform: 'translateX(-50%)',
              background: '#0A0B0D',
              color: '#FFFFFF',
              fontSize: 12,
              padding: '4px 10px',
              borderRadius: 6,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              zIndex: 10,
            }}
          >
            ${hoverPoint.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        )}
      </div>
    </div>
  );
}
