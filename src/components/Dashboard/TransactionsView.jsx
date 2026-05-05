import { useMemo, useState, useEffect } from 'react';
import { getTransactions } from '../../api/profileApi';

export default function TransactionsView({ token }) {
  const [txns, setTxns] = useState([]);
  const [txFilterType, setTxFilterType] = useState('all');
  const [txFilterAsset, setTxFilterAsset] = useState('all');
  const [txFilterStatus, setTxFilterStatus] = useState('all');
  const [txFilterDays, setTxFilterDays] = useState('all');

  useEffect(() => {
    getTransactions(token)
      .then(data => setTxns(Array.isArray(data) ? data : data.data || []))
      .catch(console.error);
  }, [token]);

  const filteredTxns = useMemo(() => {
    return txns.filter(t => {
      if (txFilterType !== 'all' && t.type !== txFilterType) return false;
      if (txFilterAsset !== 'all' && t.asset !== txFilterAsset) return false;
      if (txFilterStatus !== 'all' && t.status !== txFilterStatus) return false;
      if (txFilterDays !== 'all') {
        const days = parseInt(txFilterDays, 10);
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        if (new Date(t.timestamp) < cutoff) return false;
      }
      return true;
    });
  }, [txns, txFilterType, txFilterAsset, txFilterStatus, txFilterDays]);

  const uniqueAssets = useMemo(() => {
    const s = new Set(txns.map(t => t.asset));
    return Array.from(s);
  }, [txns]);

  return (
    <div className="max-w-[900px] mx-auto">
      <h1 className="dash-section-title" style={{ fontSize: 24, marginBottom: 24 }}>Transactions</h1>

      <div className="horizontal-scroll-container tv-filter-bar" style={{ marginBottom: 24 }}>
        <select className="filter-pill" value={txFilterType} onChange={e => setTxFilterType(e.target.value)}>
          <option value="all">All types</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>
        <select className="filter-pill" value={txFilterAsset} onChange={e => setTxFilterAsset(e.target.value)}>
          <option value="all">All assets</option>
          {uniqueAssets.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select className="filter-pill" value={txFilterStatus} onChange={e => setTxFilterStatus(e.target.value)}>
          <option value="all">All status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <select className="filter-pill" value={txFilterDays} onChange={e => setTxFilterDays(e.target.value)}>
          <option value="all">All time</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="cb-card">
        <div className="table-scroll-wrapper">
          {filteredTxns.length === 0 ? (
            <div className="tv-empty">No transactions found</div>
          ) : (
            <div style={{ minWidth: '600px' }}>
              {filteredTxns.map(t => {
                const isPos = t.type === 'buy' || t.type === 'deposit';
                const bg = isPos ? 'rgba(14,165,106,0.12)' : 'rgba(229,62,62,0.12)';
                const col = isPos ? '#0EA56A' : '#E53E3E';
                const d = new Date(t.timestamp);
                const isToday = new Date().toDateString() === d.toDateString();
                const dateStr = isToday ? `Today, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : d.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                return (
                  <div key={t.id} className="tv-row">
                    <div className="tv-icon-circle" style={{ background: bg, color: col }}>
                      {isPos ? '↓' : '↑'}
                    </div>
                    <div className="tv-desc">
                      <div className="tv-desc-primary">{t.type} {t.asset}</div>
                      <div className="tv-desc-secondary">{dateStr}</div>
                    </div>
                    <div className={`tv-status ${t.status}`}>{t.status}</div>
                    <div className={`tv-amount ${isPos ? 'pos' : 'neg'}`}>
                      {isPos ? '+' : '-'}{t.amount} {t.asset}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
