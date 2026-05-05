import './Dashboard.css';

const ACTIONS = [
  {
    id: 'buy',
    label: 'Buy',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    )
  },
  {
    id: 'sell',
    label: 'Sell',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    )
  },
  {
    id: 'send',
    label: 'Send',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
      </svg>
    )
  },
  {
    id: 'receive',
    label: 'Receive',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="17" y1="7" x2="7" y2="17"></line>
        <polyline points="17 17 7 17 7 7"></polyline>
      </svg>
    )
  },
  {
    id: 'convert',
    label: 'Convert',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8"></polyline>
        <line x1="4" y1="14" x2="21" y2="3"></line>
        <polyline points="8 21 3 21 3 16"></polyline>
        <line x1="20" y1="10" x2="3" y2="21"></line>
      </svg>
    )
  }
];

export default function QuickActions({ showToast }) {
  return (
    <div className="qa-row horizontal-scroll-container">
      {ACTIONS.map(action => (
        <button 
          key={action.id} 
          className="qa-btn" 
          onClick={() => {
            if (showToast) showToast('success', `${action.label} coming soon`);
          }}
        >
          <div className="qa-icon-circle">
            {action.icon}
          </div>
          <span className="qa-label">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
