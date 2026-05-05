import { useState } from 'react';
import CoinImage from '../Trade/CoinImage';
import Sparkline from '../Trade/Sparkline';
import './Dashboard.css';

export default function AssetList({ holdings, setActiveView, showAll = false }) {
  const safeHoldings = Array.isArray(holdings) ? holdings : [];
  const [sortOrder, setSortOrder] = useState('Value');
  const [filter, setFilter] = useState('Owned');

  // We could implement actual sorting logic here based on sortOrder
  // e.g. Value, Gainers, Losers, Name
  let sortedHoldings = [...safeHoldings];
  
  if (sortOrder === 'Gainers') {
    sortedHoldings.sort((a, b) => b.changePercent - a.changePercent);
  } else if (sortOrder === 'Losers') {
    sortedHoldings.sort((a, b) => a.changePercent - b.changePercent);
  } else if (sortOrder === 'Name') {
    sortedHoldings.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Value (default)
    sortedHoldings.sort((a, b) => b.valueUsd - a.valueUsd);
  }

  // Filter is technically 'Owned' by default here, and all holdings are owned.
  // If this was a merged list, we'd filter. We just render what we have.
  
  const displayHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, 5);

  return (
    <div className="al-wrap">
      <div className="dash-section-header">
        <h2 className="dash-section-title">My assets</h2>
        <div className="al-controls">
          <select 
            className="filter-pill" 
            style={{ padding: '6px 12px', fontSize: '13px' }}
            value={sortOrder} 
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value="Value">Value</option>
            <option value="Gainers">Gainers</option>
            <option value="Losers">Losers</option>
            <option value="Name">Name</option>
          </select>
          <select 
            className="filter-pill" 
            style={{ padding: '6px 12px', fontSize: '13px' }}
            value={filter} 
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Owned">Owned</option>
          </select>
        </div>
      </div>

      <div className="table-scroll-wrapper">
        <table className="al-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th className="al-right">Amount</th>
              <th className="al-right">Price</th>
              <th className="al-right">Value</th>
              <th className="al-right">24h</th>
              <th style={{ width: 100 }}></th>
            </tr>
          </thead>
          <tbody>
            {displayHoldings.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF' }}>
                  No assets found.
                </td>
              </tr>
            ) : (
              displayHoldings.map(h => {
                const isPos = h.changePercent >= 0;
                const pnlPos = h.profitLossUsd >= 0;
                return (
                  <tr key={h.symbol}>
                    <td>
                      <div className="al-asset-cell">
                        <CoinImage symbol={h.symbol} imageUrl={h.imageUrl} size={36} />
                        <div className="al-asset-names">
                          <span className="al-asset-name">{h.name}</span>
                          <span className="al-asset-sym">{h.symbol}</span>
                        </div>
                      </div>
                    </td>
                    <td className="al-right">
                      <div className="al-amount-main">{h.amountHeld} {h.symbol}</div>
                      <div className="al-amount-sub">Avg. {h.avgBuyPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </td>
                    <td className="al-right">
                      <div className="al-amount-main">GHS {h.currentPriceGhs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </td>
                    <td className="al-right">
                      <div className="al-amount-main font-semibold">GHS {h.valueGhs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      <div className={pnlPos ? 'al-pnl-pos' : 'al-pnl-neg'}>
                        P&L: {pnlPos ? '+' : ''}${h.profitLossUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </td>
                    <td className="al-right">
                      <div className={isPos ? 'al-change-pos' : 'al-change-neg'}>
                        {isPos ? '↗' : '↙'} {Math.abs(h.changePercent).toFixed(2)}%
                      </div>
                    </td>
                    <td>
                      <Sparkline data={h.sparkline} changePercent={h.changePercent} width={80} height={32} />
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {!showAll && displayHoldings.length > 0 && (
        <div className="al-view-all" onClick={() => setActiveView('assets')}>
          View all assets →
        </div>
      )}
    </div>
  );
}
