import { useState } from 'react';
import CoinIcon from './CoinIcon';
import './CoinImage.css';

/**
 * CoinImage — renders a real coin logo with CoinIcon letter-circle fallback.
 * Shows a loading shimmer until the image resolves.
 */
export default function CoinImage({ symbol, imageUrl, size = 40 }) {
  const [errored, setErrored] = useState(false);
  const [loaded,  setLoaded]  = useState(false);

  // No URL supplied or image errored → letter circle fallback
  if (errored || !imageUrl) {
    return <CoinIcon symbol={symbol} size={size} />;
  }

  return (
    <div
      className={`coin-img-wrap${loaded ? '' : ' coin-img-loading'}`}
      style={{ width: size, height: size }}
    >
      <img
        src={imageUrl}
        alt={symbol}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className="coin-img"
      />
      {/* Show letter circle under the image while it's loading */}
      {!loaded && <CoinIcon symbol={symbol} size={size} />}
    </div>
  );
}
