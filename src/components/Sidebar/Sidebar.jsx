import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const IconHouse = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const IconTrade = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconDollar = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <path d="M16 8h-4a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4h-4" />
  </svg>
);
const IconList = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconSettings = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const IconHelp = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconLogout = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function Sidebar({
  activeView,
  onNavigate,
  isCollapsed,
  onToggle,
  user,
  initials,
  logout,
  hasPendingTx,
  mobileOpen,
  onMobileClose
}) {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const NAV_ITEMS = [
    {
      section: 'MAIN', items: [
        { id: 'dashboard', label: 'Dashboard', icon: <IconHouse /> },
        { id: 'assets', label: 'Assets', icon: <IconBriefcase /> },
        { id: 'trade', label: 'Trade', icon: <IconTrade /> },
        { id: 'watchlist', label: 'Watchlist', icon: <IconStar /> },
        { id: 'earn', label: 'Earn', icon: <IconDollar />, badge: 'Soon' },
        { id: 'transactions', label: 'Transactions', icon: <IconList />, dot: hasPendingTx },
      ]
    },
    {
      section: 'ACCOUNT', items: [
        { id: 'profile', label: 'Profile', icon: <IconUser /> },
        { id: 'settings', label: 'Settings', icon: <IconSettings /> },
        { id: 'help', label: 'Help', icon: <IconHelp />, badge: 'Soon' },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && <div className="sidebar-mobile-backdrop" onClick={onMobileClose} />}

      <aside className={`profile-sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-top-row">
          <div className="sidebar-logo-group" onClick={() => navigate('/')}>
            <span className="sidebar-app-name">Coinbase</span>
          </div>
          <button className="sidebar-collapse-btn desktop-only" onClick={onToggle}>
            {isCollapsed ? <FiChevronRight size={14} /> : <FiChevronLeft size={14} />}
          </button>
          <button className="sidebar-close-btn mobile-only" onClick={onMobileClose}>
            ✕
          </button>
        </div>

        <div className="sidebar-nav-container">
          {NAV_ITEMS.map(section => (
            <div key={section.section}>
              <div className="nav-section-header">{section.section}</div>
              {section.items.map(item => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  view={item.id}
                  current={activeView}
                  onNavigate={onNavigate}
                  badge={item.badge}
                  dot={item.dot}
                  isCollapsed={isCollapsed}
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                />
              ))}
              {section.section === 'MAIN' && <div className="sidebar-divider" />}
            </div>
          ))}
        </div>

        <div className="sidebar-bottom-block">
          <div className="sidebar-user-row" onClick={() => onNavigate('profile')}>
            <div className="sidebar-user-avatar">
              {user?.avatarUrl ? <img src={user.avatarUrl} alt="Avatar" /> : initials}
            </div>
            <div className="sidebar-user-text">
              <p className="sidebar-user-name">{user?.fullName || 'Loading...'}</p>
              <p className="sidebar-user-email">{user?.email || 'Please wait...'}</p>
            </div>
          </div>

          <div
            className="sidebar-logout-row"
            onClick={logout}
            onMouseEnter={() => setHoveredItem('logout')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="sidebar-logout-icon"><IconLogout /></div>
            <span className="sidebar-logout-label">Log out</span>
            {isCollapsed && hoveredItem === 'logout' && (
              <div className="sidebar-tooltip">Log out</div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ icon, label, view, current, onNavigate, badge, dot, isCollapsed, hoveredItem, setHoveredItem }) {
  const active = current === view;
  const isHovered = hoveredItem === view;

  return (
    <div className="nav-item-wrapper">
      <div
        className={`nav-item-pill ${active ? 'active' : ''}`}
        onClick={() => onNavigate(view)}
        onMouseEnter={() => setHoveredItem(view)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="nav-icon-box">{icon}</div>
        <span className="nav-item-label">{label}</span>

        {badge && !isCollapsed && <span className="nav-item-badge">{badge}</span>}
        {dot && (
          <div className={`nav-item-dot ${isCollapsed ? 'collapsed' : ''}`} />
        )}
      </div>

      {isCollapsed && isHovered && (
        <div className="sidebar-tooltip">{label}</div>
      )}
    </div>
  );
}
