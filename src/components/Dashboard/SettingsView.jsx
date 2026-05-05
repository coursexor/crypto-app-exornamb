export default function SettingsView({ 
  account, 
  currency, 
  setCurrency, 
  darkMode, 
  toggleDarkMode, 
  notifications, 
  setNotifications, 
  showToast 
}) {
  return (
    <div className="max-w-[700px] mx-auto">
      <h1 className="dash-section-title" style={{ fontSize: 24, marginBottom: 24 }}>Settings</h1>

      <div className="sv-card">
        <h2 className="sv-card-title">Security</h2>
        <div className="sv-row">
          <div className="sv-row-left">
            <div className="sv-row-label">Two-factor authentication</div>
            <div className="sv-row-desc">Adds a second layer of login protection</div>
          </div>
          <div className="sv-row-right">
            <div className={`sv-status-pill ${account?.twoFaEnabled ? 'enabled' : 'disabled'}`}>
              {account?.twoFaEnabled ? 'Enabled' : 'Disabled'}
            </div>
            <button className="sv-ghost-btn" onClick={() => showToast('info', '2FA management coming soon')}>Manage</button>
          </div>
        </div>
        <div className="sv-row">
          <div className="sv-row-left">
            <div className="sv-row-label">Password</div>
            <div className="sv-row-desc">Last changed — unknown</div>
          </div>
          <div className="sv-row-right">
            <button className="sv-ghost-btn" onClick={() => showToast('info', 'Password change coming soon')}>Change</button>
          </div>
        </div>
        <div className="sv-row">
          <div className="sv-row-left">
            <div className="sv-row-label">Active sessions</div>
            <div className="sv-row-desc">1 device(s) logged in</div>
          </div>
          <div className="sv-row-right">
            <button className="sv-ghost-btn" onClick={() => showToast('info', 'Sessions view coming soon')}>View</button>
          </div>
        </div>
      </div>

      <div className="sv-card">
        <h2 className="sv-card-title">Preferences</h2>
        <div className="sv-row">
          <div className="sv-row-left">
            <div className="sv-row-label">Currency display</div>
            <div className="sv-row-desc">Select your local currency</div>
          </div>
          <div className="sv-row-right">
            <select className="sv-select" value={currency} onChange={e => {
              setCurrency(e.target.value);
              localStorage.setItem('cb_currency', e.target.value);
            }}>
              <option value="GHS">GHS</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>
        <div className="sv-row">
          <div className="sv-row-left">
            <div className="sv-row-label">Theme</div>
            <div className="sv-row-desc">{darkMode ? 'Dark mode' : 'Light mode'}</div>
          </div>
          <div className="sv-row-right">
            <button className={`sv-toggle ${darkMode ? 'on' : 'off'}`} onClick={toggleDarkMode}>
              <div className="sv-toggle-thumb" />
            </button>
          </div>
        </div>
      </div>

      <div className="sv-card">
        <h2 className="sv-card-title">Notifications</h2>
        <div className="sv-row">
          <div className="sv-row-left">
            <div className="sv-row-label">Price alerts</div>
          </div>
          <div className="sv-row-right">
            <button className={`sv-toggle ${notifications.priceAlerts ? 'on' : 'off'}`} onClick={() => {
              const n = { ...notifications, priceAlerts: !notifications.priceAlerts };
              setNotifications(n); localStorage.setItem('cb_notifications', JSON.stringify(n));
            }}><div className="sv-toggle-thumb" /></button>
          </div>
        </div>
        <div className="sv-row">
          <div className="sv-row-left">
            <div className="sv-row-label">Transaction updates</div>
          </div>
          <div className="sv-row-right">
            <button className={`sv-toggle ${notifications.transactionUpdates ? 'on' : 'off'}`} onClick={() => {
              const n = { ...notifications, transactionUpdates: !notifications.transactionUpdates };
              setNotifications(n); localStorage.setItem('cb_notifications', JSON.stringify(n));
            }}><div className="sv-toggle-thumb" /></button>
          </div>
        </div>
        <div className="sv-row">
          <div className="sv-row-left">
            <div className="sv-row-label">Security alerts</div>
          </div>
          <div className="sv-row-right">
            <button className={`sv-toggle ${notifications.securityAlerts ? 'on' : 'off'}`} onClick={() => {
              const n = { ...notifications, securityAlerts: !notifications.securityAlerts };
              setNotifications(n); localStorage.setItem('cb_notifications', JSON.stringify(n));
            }}><div className="sv-toggle-thumb" /></button>
          </div>
        </div>
      </div>

      <div className="sv-card">
        <h2 className="sv-card-title" style={{ color: '#0A0B0D' }}>Account</h2>
        <div className="sv-row">
          <div className="sv-row-left">
            <div className="sv-row-label">Delete account</div>
            <div className="sv-row-desc">Permanently removes your account and all data</div>
          </div>
          <div className="sv-row-right">
            <button className="sv-danger-btn" onClick={() => {
              if (window.confirm("This action cannot be undone. Continue?")) {
                showToast('error', 'Account deletion is not available in this demo.');
              }
            }}>Delete account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
