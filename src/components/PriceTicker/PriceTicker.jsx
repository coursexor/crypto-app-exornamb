import { useRef } from 'react';
import CoinIcon from '../Trade/CoinIcon';
import useLivePrices from '../../hooks/useLivePrices';
import './PriceTicker.css';

/**
 * Continuous scrolling price ticker component displaying real-time cryptocurrency data.
 * Internally hooks into the useLivePrices polling hook when intersecting the viewport.
 */
export default function PriceTicker() {
  const containerRef = useRef(null);
  const { coins, isLoading, error, changedFields, retry } = useLivePrices(containerRef);

  /**
   * Derives the visual CSS flash class indicating the direction of recent price movement.
   * @param {string} symbol - The unique ticker symbol of the asset.
   * @returns {string} 'flash-up', 'flash-down', or an empty string for no change.
   */
  function getPriceClass(symbol) {
    const entry = changedFields.get(symbol);
    if (!entry || !entry.price) return '';
    return entry.price === 'up' ? 'flash-up' : 'flash-down';
  }

  /**
   * Derives the visual CSS flash class indicating the direction of recent 24h change movement.
   * @param {string} symbol - The unique ticker symbol of the asset.
   * @returns {string} 'flash-up', 'flash-down', or an empty string for no change.
   */
  function getChangeClass(symbol) {
    const entry = changedFields.get(symbol);
    if (!entry || !entry.change) return '';
    return entry.change === 'up' ? 'flash-up' : 'flash-down';
  }

  return (
    <div className="price-ticker" ref={containerRef}>

      {isLoading && Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="ticker-skeleton-row">
          <div className="skeleton-block skeleton-left" />
          <div className="skeleton-block skeleton-right" />
        </div>
      ))}

      {!isLoading && error && (
        <div className="ticker-error">
          <p>Could not load prices</p>
          <button className="ticker-retry-btn" onClick={retry}>Retry</button>
        </div>
      )}

      {!isLoading && !error && coins.map((coin) => (
        <div className="ticker-row" key={coin.symbol}>

          {/* Left: icon + name */}
          <div className="ticker-left">
            <CoinIcon symbol={coin.symbol} size={36} />
            <span className="ticker-name">{coin.name}</span>
          </div>

          {/* Right: price + change */}
          <div className="ticker-right">
            <span className={`ticker-price ${getPriceClass(coin.symbol)}`}>
              GHS{' '}
              {coin.priceGhs.toLocaleString('en-GH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span
              className={`ticker-change ${coin.changePercent >= 0 ? 'up' : 'down'} ${getChangeClass(coin.symbol)}`}
            >
              {coin.changePercent >= 0 ? '↗' : '↙'}{' '}
              {Math.abs(coin.changePercent).toFixed(2)}%
            </span>
          </div>

        </div>
      ))}

    </div>
  );
}
