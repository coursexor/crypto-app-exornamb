import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPrices } from '../../api/profileApi';
import CoinImage from '../Trade/CoinImage';
import Sparkline from '../Trade/Sparkline';
import './Dashboard.css';

export default function Watchlist({ showToast }) {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load watchlist symbols from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cb_watchlist');
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored));
      } catch {
        setWatchlist([]);
      }
    }
  }, []);

  // Fetch prices
  useEffect(() => {
    const fetchMarketData = async () => {
      if (watchlist.length === 0) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const res = await getPrices();
        const data = Array.isArray(res) ? res : res.data;
        if (data) setMarketData(data);
      } catch (e) {
        console.error("Failed to load watchlist prices", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMarketData();
  }, [watchlist]);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your watchlist?")) {
      setWatchlist([]);
      localStorage.setItem('cb_watchlist', JSON.stringify([]));
    }
  };

  const handleBuy = (symbol) => {
    if (showToast) showToast('success', `Buy ${symbol} coming soon`);
  };

  const toggleStar = (symbol) => {
    const next = watchlist.filter(s => s !== symbol);
    setWatchlist(next);
    localStorage.setItem('cb_watchlist', JSON.stringify(next));
  };

  // Map watchlist symbols to their market data
  const watchlistAssets = watchlist.map(sym => {
    const asset = marketData.find(a => a.symbol === sym) || {};
    
    // Fallback sparkline if needed
    const change = asset.changePercent !== undefined ? asset.changePercent : asset.change24h || 0;
    let sparkline = asset.sparkline;
    if (!sparkline || sparkline.length === 0) {
      sparkline = [100];
      for (let i = 1; i < 12; i++) {
        sparkline.push(sparkline[i - 1] + (Math.random() * 2 - 0.5) * (change / 10));
      }
    }

    return {
      symbol: sym,
      name: asset.name || sym,
      imageUrl: asset.image_url || asset.imageUrl || asset.image,
      priceGhs: asset.priceGhs !== undefined ? asset.priceGhs : asset.price || 0,
      changePercent: change,
      sparkline,
    };
  });

  return (
    <div className="cb-card view-enter">
      <div className="dash-section-header">
        <h2 className="dash-section-title">Watchlist</h2>
        {watchlist.length > 0 && (
          <button className="wl-clear-btn" onClick={handleClearAll}>
            Clear all
          </button>
        )}
      </div>

      {watchlist.length === 0 ? (
        <div className="wl-empty">
          <div className="wl-empty-icon">☆</div>
          <h3 className="wl-empty-title">No assets on your watchlist</h3>
          <p className="wl-empty-sub">
            <span style={{ cursor: 'pointer', color: '#1652F0' }} onClick={() => navigate('/explore')}>
              Visit Markets to add assets
            </span>
          </p>
        </div>
      ) : isLoading ? (
        <div className="al-table">
          {Array.from({ length: Math.min(3, watchlist.length) }).map((_, i) => (
            <div key={i} style={{ height: 64, display: 'flex', alignItems: 'center', padding: 12, borderBottom: '1px solid #F3F4F6' }}>
              <div className="dash-skeleton" style={{ height: 24, width: '100%' }}></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-scroll-wrapper">
          <table className="al-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}></th>
                <th>Asset</th>
                <th className="al-right">Price</th>
                <th className="al-right">24h</th>
                <th style={{ width: 100 }}></th>
                <th className="al-right" style={{ width: 100 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {watchlistAssets.map(asset => {
                const isPos = asset.changePercent >= 0;
                return (
                  <tr key={asset.symbol}>
                    <td style={{ paddingRight: 0 }}>
                      <button 
                        className="star-btn active"
                        onClick={() => toggleStar(asset.symbol)}
                      >
                        ★
                      </button>
                    </td>
                    <td>
                      <div className="al-asset-cell">
                        <CoinImage symbol={asset.symbol} imageUrl={asset.imageUrl} size={36} />
                        <div className="al-asset-names">
                          <span className="al-asset-name">{asset.name}</span>
                          <span className="al-asset-sym">{asset.symbol}</span>
                        </div>
                      </div>
                    </td>
                    <td className="al-right">
                      <div className="al-amount-main">GHS {asset.priceGhs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </td>
                    <td className="al-right">
                      <div className={isPos ? 'al-change-pos' : 'al-change-neg'}>
                        {isPos ? '↗' : '↙'} {Math.abs(asset.changePercent).toFixed(2)}%
                      </div>
                    </td>
                    <td>
                      <Sparkline data={asset.sparkline} changePercent={asset.changePercent} width={80} height={32} />
                    </td>
                    <td className="al-right">
                      <button className="wl-buy-pill" onClick={() => handleBuy(asset.symbol)}>
                        Buy
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
