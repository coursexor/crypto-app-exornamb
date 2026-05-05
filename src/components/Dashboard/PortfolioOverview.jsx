import { useState, useEffect } from 'react';
import PortfolioChart from './PortfolioChart';
import './Dashboard.css';

export default function PortfolioOverview({ portfolio }) {
  const [balanceHidden, setBalanceHidden] = useState(false);

  useEffect(() => {
    const hidden = localStorage.getItem('cb_balance_hidden') === 'true';
    if (hidden) setBalanceHidden(true);
  }, []);

  const toggleBalance = () => {
    const next = !balanceHidden;
    setBalanceHidden(next);
    localStorage.setItem('cb_balance_hidden', String(next));
  };

  if (!portfolio) return null;

  const { totalValueGhs, totalValueUsd, dayChangePct, dayChangeUsd } = portfolio;
  
  // Use preference currency (fallback to GHS if not set)
  // For demo purposes, we'll just format the totalValueGhs.
  // The spec says format totalValueGhs.
  
  const isPos = dayChangePct >= 0;
  const changeArrow = isPos ? '▲' : '▼';
  const changeColorClass = isPos ? 'po-change-pos' : 'po-change-neg';
  const changeSign = isPos ? '+' : '';

  return (
    <div className="po-card flex-col !p-6" style={{ display: 'flex', gap: 0 }}>
      <PortfolioChart 
        totalValueUsd={totalValueUsd} 
        headerLeft={
          <div className="po-left-header">
            <p className="po-balance-label flex items-center gap-2">
              Your balance 
              <button className="po-eye-btn !p-0" onClick={toggleBalance} title="Toggle balance visibility">
                {balanceHidden ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </p>
            <div className="po-balance-row !mb-2">
              <h2 className="po-balance-value text-[32px]">
                {balanceHidden ? '••••••' : `$${totalValueUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </h2>
            </div>
            
            <div className={`po-change-row ${changeColorClass} text-[13px] font-medium`}>
              {balanceHidden ? '•••%' : (
                <>
                  {changeArrow} ${dayChangeUsd.toFixed(2)} ({Math.abs(dayChangePct).toFixed(2)}%) <span className="text-[#6B7280] font-normal ml-1">All time</span>
                </>
              )}
            </div>
          </div>
        }
      />
    </div>
  );
}
