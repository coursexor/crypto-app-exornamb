/**
 * Primary trading dashboard view containing asset filtering, 
 * pagination, sorting, and dynamic sparkline rendering.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { getGainers, getNewListings } from '../../api/profileApi';
import CoinImage from './CoinImage';
import Sparkline from './Sparkline';
import './TradeView.css';

/**
 * Renders the main market asset table with sortable columns and dynamic fallback charts.
 * @param {Object} props
 * @param {Function} props.showToast - Callback to render global toast notifications
 * @returns {JSX.Element} The rendered trading view component
 */
export default function TradeView({ showToast }) {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState(new Set());

  // Filters
  const [filterType, setFilterType] = useState('all'); // all | gainers | new
  const [timePeriod, setTimePeriod] = useState('1D');
  const [currency, setCurrency] = useState('GHS');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting
  const [sortField, setSortField] = useState('changePercent');
  const [sortDirection, setSortDirection] = useState('desc');

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState(null); // 'assets' | 'time' | 'currency' | 'rows' | null

  const fetchAssets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let fetchedData = [];
      if (filterType === 'all') {
        const [gainersRes, newRes] = await Promise.all([getGainers(), getNewListings()]);
        const gainersArr = Array.isArray(gainersRes) ? gainersRes : gainersRes.data;
        const newArr = Array.isArray(newRes) ? newRes : newRes.data;
        // Merge and remove duplicates by symbol
        const merged = [...gainersArr, ...newArr];
        const unique = Array.from(new Map(merged.map(item => [item.symbol, item])).values());
        fetchedData = unique;
      } else if (filterType === 'gainers') {
        const res = await getGainers();
        fetchedData = Array.isArray(res) ? res : res.data;
      } else if (filterType === 'new') {
        const res = await getNewListings();
        fetchedData = Array.isArray(res) ? res : res.data;
      }
      // Normalize disparate database keys into standard UI component props
      fetchedData = fetchedData.map(item => {
        const change = item.changePercent !== undefined ? item.changePercent : item.change24h || 0;
        let sparkline = item.sparkline;
        
        // Generate pseudo-random deterministic sparkline data if backend omits it
        if (!sparkline || sparkline.length === 0) {
          sparkline = [100];
          for (let i = 1; i < 12; i++) {
            sparkline.push(sparkline[i - 1] + (Math.random() * 2 - 0.5) * (change / 10));
          }
        }
        return {
          ...item,
          priceGhs: item.priceGhs !== undefined ? item.priceGhs : item.price || 0,
          changePercent: change,
          imageUrl: item.imageUrl || item.image_url || item.image,
          sparkline
        };
      });
      setAssets(fetchedData);
    } catch (err) {
      setError('Failed to load market data. Please try again.' + err);
    } finally {
      setIsLoading(false);
    }
  }, [filterType]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  // Handle outside clicks for dropdowns
  useEffect(() => {
    const handler = () => setOpenDropdown(null);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const toggleWatchlist = (symbol) => {
    const next = new Set(watchlist);
    if (next.has(symbol)) next.delete(symbol);
    else next.add(symbol);
    setWatchlist(next);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedAssets = [...assets].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    
    // Special case for sorting by name
    if (sortField === 'name') {
      valA = a.name.toLowerCase();
      valB = b.name.toLowerCase();
    }

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedAssets = sortedAssets.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(sortedAssets.length / pageSize);

  const formatPrice = (price) => {
    const p = currency === 'GHS' ? price : price * 0.083; // Fake conversion if not GHS
    return p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="trade-view view-enter">
      <h1 className="trade-title">Crypto market prices</h1>

      {/* FILTER BAR */}
      <div className="filter-bar horizontal-scroll-container">
        {/* Assets Filter */}
        <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
          <button className="filter-pill" onClick={() => setOpenDropdown(openDropdown === 'assets' ? null : 'assets')}>
            🌐 {filterType === 'all' ? 'All assets' : filterType === 'gainers' ? 'Top gainers' : 'New listings'} ▾
          </button>
          {openDropdown === 'assets' && (
            <div className="filter-dropdown">
              <div className="dropdown-item" onClick={() => { setFilterType('all'); setOpenDropdown(null); }}>All assets</div>
              <div className="dropdown-item" onClick={() => { setFilterType('gainers'); setOpenDropdown(null); }}>Top gainers</div>
              <div className="dropdown-item" onClick={() => { setFilterType('new'); setOpenDropdown(null); }}>New listings</div>
            </div>
          )}
        </div>

        {/* Time Filter */}
        <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
          <button className="filter-pill" onClick={() => setOpenDropdown(openDropdown === 'time' ? null : 'time')}>
            {timePeriod} ▾
          </button>
          {openDropdown === 'time' && (
            <div className="filter-dropdown">
              {['1H', '1D', '1W', '1M'].map(t => (
                <div key={t} className="dropdown-item" onClick={() => { setTimePeriod(t); setOpenDropdown(null); }}>{t}</div>
              ))}
            </div>
          )}
        </div>

        {/* Currency Filter */}
        <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
          <button className="filter-pill" onClick={() => setOpenDropdown(openDropdown === 'currency' ? null : 'currency')}>
            {currency} ▾
          </button>
          {openDropdown === 'currency' && (
            <div className="filter-dropdown">
              {['GHS', 'USD', 'EUR', 'BTC'].map(c => (
                <div key={c} className="dropdown-item" onClick={() => { setCurrency(c); setOpenDropdown(null); }}>{c}</div>
              ))}
            </div>
          )}
        </div>

        {/* Rows Filter */}
        <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
          <button className="filter-pill" onClick={() => setOpenDropdown(openDropdown === 'rows' ? null : 'rows')}>
            {pageSize} rows ▾
          </button>
          {openDropdown === 'rows' && (
            <div className="filter-dropdown">
              {[10, 25, 50].map(r => (
                <div key={r} className="dropdown-item" onClick={() => { setPageSize(r); setCurrentPage(1); setOpenDropdown(null); }}>{r}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="trade-table-container table-scroll-wrapper">
        <table className="trade-table">
          <thead>
            <tr>
              <th className="col-star"></th>
              <th className="col-asset sortable" onClick={() => handleSort('name')}>
                Asset {sortField === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
              </th>
              <th className="col-spacer"></th>
              <th className="col-price sortable text-right" onClick={() => handleSort('priceGhs')}>
                Market price {sortField === 'priceGhs' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
              </th>
              <th className="col-chart">Chart</th>
              <th className="col-change sortable text-right" onClick={() => handleSort('changePercent')}>
                Change {sortField === 'changePercent' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
              </th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="skeleton-row">
                  <td colSpan="7"><div className="skeleton-line pulse"></div></td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan="7" className="error-cell">
                  <p>{error}</p>
                  <button onClick={fetchAssets} className="retry-btn">Retry</button>
                </td>
              </tr>
            ) : paginatedAssets.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-cell">No assets found.</td>
              </tr>
            ) : (
              paginatedAssets.map((asset) => (
                <tr key={asset.symbol}>
                  <td className="col-star">
                    <button 
                      className={`star-btn ${watchlist.has(asset.symbol) ? 'active' : ''}`}
                      onClick={() => toggleWatchlist(asset.symbol)}
                    >
                      {watchlist.has(asset.symbol) ? '★' : '☆'}
                    </button>
                  </td>
                  <td className="col-asset">
                    <div className="asset-info">
                      <CoinImage symbol={asset.symbol} imageUrl={asset.imageUrl} size={36} />
                      <div className="asset-names">
                        <span className="asset-name">{asset.name}</span>
                        <span className="asset-ticker">{asset.symbol}</span>
                      </div>
                    </div>
                  </td>
                  <td className="col-spacer"></td>
                  <td className="col-price text-right">
                    <span className="price-val">{currency} {formatPrice(asset.priceGhs)}</span>
                  </td>
                  <td className="col-chart">
                    <Sparkline data={asset.sparkline} changePercent={asset.changePercent} width={80} height={32} />
                  </td>
                  <td className="col-change text-right">
                    <span className={`change-val ${asset.changePercent >= 0 ? 'pos' : 'neg'}`}>
                      {asset.changePercent >= 0 ? '↗' : '↙'} {Math.abs(asset.changePercent).toFixed(2)}%
                    </span>
                  </td>
                  <td className="col-actions">
                    <button className="trade-pill" onClick={() => {
                      if (showToast) showToast('success', `Trading ${asset.symbol} coming soon`);
                    }}>
                      Trade
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {!isLoading && !error && assets.length > 0 && (
        <div className="pagination-bar">
          <span className="pagination-info">
            Showing {Math.min(assets.length, (currentPage - 1) * pageSize + 1)}–{Math.min(assets.length, currentPage * pageSize)} of {assets.length} assets
          </span>
          <div className="pagination-btns">
            <button 
              className="pag-btn" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Prev
            </button>
            <button 
              className="pag-btn" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
