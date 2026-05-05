import AssetList from "./AssetList";

export default function AssetsView({ holdings, portfolio }) {
  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="dash-section-title" style={{ fontSize: 24, marginBottom: 24 }}>Assets</h1>

      <div className="av-summary-row">
        <div className="av-summary-card">
          <div className="av-summary-label">Total invested</div>
          <div className="av-summary-value">
            ${holdings.reduce((s, h) => s + (h.avgBuyPrice * h.amountHeld), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="av-summary-card" style={{ borderLeft: `3px solid ${holdings.reduce((s, h) => s + h.profitLossUsd, 0) >= 0 ? '#0EA56A' : '#E53E3E'}` }}>
          <div className="av-summary-label">Total P&L</div>
          <div className="av-summary-value">
            ${holdings.reduce((s, h) => s + h.profitLossUsd, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div className="av-alloc-bar">
        {holdings.map((h) => {
          const pct = (h.valueUsd / portfolio.totalValueUsd) * 100;
          if (pct < 0.1) return null;
          // Generate a consistent hex color from symbol
          let hash = 0;
          for (let i = 0; i < h.symbol.length; i++) hash = h.symbol.charCodeAt(i) + ((hash << 5) - hash);
          const color = `hsl(${hash % 360}, 70%, 50%)`;
          return (
            <div key={h.symbol} className="av-alloc-seg" style={{ width: `${pct}%`, background: color }}>
              <div className="av-seg-tooltip">{h.name} {pct.toFixed(1)}%</div>
            </div>
          );
        })}
      </div>

      <AssetList holdings={holdings} showAll={true} />
    </div>
  );
}
