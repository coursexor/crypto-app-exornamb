import React from 'react';

const COIN_COLORS = {
  BTC: '#F7931A',
  ETH: '#627EEA',
  USDT: '#26A17B',
  XRP: '#000000',
  BNB: '#F3BA2F',
  SOL: '#9945FF',
  ADA: '#0D1E2D',
  DOGE: '#C2A633',
  MATIC: '#8247E5',
  DOT: '#E6007A',
};

export default function CoinIcon({ symbol, size = 36 }) {
  const bgColor = COIN_COLORS[symbol.toUpperCase()] || '#1652F0';
  const initial = symbol.charAt(0).toUpperCase();

  return (
    <div 
      className="flex items-center justify-center rounded-full text-white font-bold"
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        backgroundColor: bgColor,
        fontSize: `${Math.max(12, size * 0.4)}px`
      }}
    >
      {initial}
    </div>
  );
}
