import { useState, useEffect, useMemo } from 'react';
import { getPrices, getGainers, getNewListings } from '../api/profileApi';
import CoinImage from '../components/Trade/CoinImage';
import Sparkline from '../components/Trade/Sparkline';
import '../components/Trade/TradeView.css'; // Reuse table/filter styles
import './ExplorePage.css';

export default function ExplorePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Watchlist
  const [watchlist, setWatchlist] = useState(new Set());
  
  // Filters
  const [filterType, setFilterType] = useState('all'); // all | gainers | new
  const [timePeriod, setTimePeriod] = useState('1D');
  const [currency, setCurrency] = useState('GHS');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  // Sorting
  const [sortField, setSortField] = useState('changePercent');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Toast
  const [toastMsg, setToastMsg] = useState('');

  const fetchAssets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let res;
      if (filterType === 'all')          res = await getPrices();
      else if (filterType === 'gainers') res = await getGainers();
      else if (filterType === 'new')     res = await getNewListings();
      
      if (res) {
        const dataArr = Array.isArray(res) ? res : res.data || [];
        const normalized = dataArr.map(item => {
          const change = item.changePercent !== undefined ? item.changePercent : item.change24h || 0;
          // Generate a smooth sparkline if missing (from DB)
          let sparkline = item.sparkline;
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
        setCoins(normalized);
      }
    } catch (err) {
      console.error(err);
      setError('Could not load market data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
    setCurrentPage(1);
  }, [filterType]);

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
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Sort and Paginate
  const sortedCoins = useMemo(() => {
    if (!sortField) return coins;
    return [...coins].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (sortField === 'name') {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      }
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [coins, sortField, sortDirection]);

  const paginatedCoins = sortedCoins.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(sortedCoins.length / pageSize) || 1;

  const formatPrice = (price) => {
    const p = currency === 'GHS' ? price : price * 0.083; // Dummy conversion
    if (p < 0.01) return p.toFixed(8);
    return p.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="explore-page view-enter">
      <div className="explore-container">
        <h1 className="explore-title">Crypto market prices</h1>

        {/* FILTER BAR (reused from TradeView structure) */}
        <div className="filter-bar">
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
        <div className="trade-table-container">
          <table className="trade-table">
            <thead>
              <tr>
                <th className="col-star"></th>
                <th className={`col-asset sortable ${sortField === 'name' ? 'sort-active' : ''}`} onClick={() => handleSort('name')}>
                  Asset {sortField === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
                </th>
                <th className="col-spacer"></th>
                <th className={`col-price sortable text-right ${sortField === 'priceGhs' ? 'sort-active' : ''}`} onClick={() => handleSort('priceGhs')}>
                  Market price {sortField === 'priceGhs' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
                </th>
                <th className="col-chart" style={{ textAlign: 'center' }}>Chart</th>
                <th className={`col-change sortable text-right ${sortField === 'changePercent' ? 'sort-active' : ''}`} onClick={() => handleSort('changePercent')}>
                  Change {sortField === 'changePercent' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
                </th>
                <th className="col-actions text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="explore-skeleton-row">
                    <td colSpan="7" style={{ padding: 0 }}>
                      <div className="explore-pulse" style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', padding: '0 16px' }}>
                        <div className="skel-circle" />
                        <div className="skel-lines" style={{ width: '160px', flex: 'none' }}>
                          <div className="skel-line" style={{ width: '100%' }} />
                          <div className="skel-line" style={{ width: '60%' }} />
                        </div>
                        <div style={{ flex: 1 }} />
                        <div className="skel-right">
                          <div className="skel-block" style={{ width: '80px' }} />
                          <div className="skel-block" style={{ width: '100px' }} />
                          <div className="skel-block" style={{ width: '60px' }} />
                          <div className="skel-block" style={{ width: '80px', height: '36px', borderRadius: '999px' }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan="7">
                    <div className="explore-state">
                      <div className="explore-state-icon text-amber-500">⚠</div>
                      <p className="explore-state-msg">{error}</p>
                      <button className="explore-retry-btn" onClick={fetchAssets}>Try again</button>
                    </div>
                  </td>
                </tr>
              ) : paginatedCoins.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="explore-state">
                      <p className="explore-state-msg">No assets found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedCoins.map((coin) => (
                  <tr key={coin.symbol}>
                    <td className="col-star">
                      <button 
                        className={`star-btn ${watchlist.has(coin.symbol) ? 'active' : ''}`}
                        onClick={() => toggleWatchlist(coin.symbol)}
                      >
                        {watchlist.has(coin.symbol) ? '★' : '☆'}
                      </button>
                    </td>
                    <td className="col-asset">
                      <div className="asset-info">
                        <CoinImage symbol={coin.symbol} imageUrl={coin.imageUrl} size={40} />
                        <div className="asset-names">
                          <span className="asset-name">{coin.name}</span>
                          <span className="asset-ticker">{coin.symbol}</span>
                        </div>
                      </div>
                    </td>
                    <td className="col-spacer"></td>
                    <td className="col-price text-right">
                      <span className="price-val">{currency} {formatPrice(coin.priceGhs)}</span>
                    </td>
                    <td className="col-chart" style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Sparkline data={coin.sparkline} changePercent={coin.changePercent} width={100} height={40} />
                      </div>
                    </td>
                    <td className="col-change text-right">
                      <span className={`change-val ${coin.changePercent >= 0 ? 'pos' : 'neg'}`}>
                        {coin.changePercent >= 0 ? '↗' : '↙'} {Math.abs(coin.changePercent).toFixed(2)}%
                      </span>
                    </td>
                    <td className="col-actions text-right">
                      <button className="trade-pill explore-trade-btn" onClick={() => showToast(`Trading ${coin.symbol} coming soon`)}>
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
        {!isLoading && !error && coins.length > 0 && (
          <div className="pagination-bar">
            <span className="pagination-info">
              Showing {Math.min(coins.length, (currentPage - 1) * pageSize + 1)}–{Math.min(coins.length, currentPage * pageSize)} of {coins.length} assets
            </span>
            <div className="pagination-btns">
              <button className="pag-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                ← Prev
              </button>
              <button className="pag-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {toastMsg && (
        <div className="explore-toast">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
