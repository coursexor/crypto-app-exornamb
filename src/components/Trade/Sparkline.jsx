/**
 * Sparkline — smooth SVG sparkline using cubic bezier curves.
 * No chart library — pure SVG path with C commands.
 *
 * Props:
 *   data          number[]  price points (≥ 2 values)
 *   changePercent number    drives stroke colour
 *   width         number    (default 100)
 *   height        number    (default 40)
 */
export default function Sparkline({ data, changePercent, width = 100, height = 40 }) {
  if (!data || data.length < 2) {
    return <svg width={width} height={height} />;
  }

  // Colour by direction
  let stroke = '#F59E0B'; // amber — neutral
  if (changePercent > 0) stroke = '#0EA56A'; // green
  else if (changePercent < 0) stroke = '#E53E3E'; // red

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);

  // Flat line for stable coins (e.g. USDT, USDC)
  if (minVal === maxVal) {
    return (
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} style={{ overflow: 'visible' }}>
        <path
          d={`M 0 ${height / 2} L ${width} ${height / 2}`}
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  // Map data points into SVG coordinate space
  // 4px top/bottom padding so the line never clips the viewport
  const xScale = width / (data.length - 1);
  const yScale = (height - 8) / (maxVal - minVal);
  const points = data.map((v, i) => ({
    x: i * xScale,
    y: height - 4 - (v - minVal) * yScale,
  }));

  // Build path using cubic bezier curves (smooth, organic look)
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

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ overflow: 'visible' }}
    >
      <path
        d={d}
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
