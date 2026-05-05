import { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useApp } from "../Context/useApp";
import { getProfile, patchProfile } from "../api/profileApi";
import { getInitials } from "../utils/format";
import Sidebar from "../components/Sidebar/Sidebar";
import ProfileContent from "../components/Dashboard/ProfileContent";
import "../pages/ProfilePage.css";

export default function ProfileLayout() {
  const { token, logout, setUser, isAuthenticated, isLoading: authLoading } = useAuth();
  const { setNavTitle } = useApp();

  // 1. Layout State
  const [activeView, setActiveView] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(() =>
    localStorage.getItem('cb_sidebar_collapsed') === 'true'
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 2. Profile & Data State
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Settings & Preferences
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('cb_theme') === 'dark'
  );
  const [currency, setCurrency] = useState(() =>
    localStorage.getItem('cb_currency') || 'GHS'
  );
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('cb_notifications');
    try { return saved ? JSON.parse(saved) : { priceAlerts: false, transactionUpdates: true, securityAlerts: true }; }
    catch { return { priceAlerts: false, transactionUpdates: true, securityAlerts: true }; }
  });

  // 4. Edit State
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // 5. Toast State
  const [toast, setToast] = useState(null);
  const showToast = (type, message) => setToast({ type, message });

  // ── Sync Nav Title ─────────────────────────────────────────────
  useEffect(() => {
    const titles = {
      dashboard: 'Dashboard',
      assets: 'Assets',
      trade: 'Trade',
      watchlist: 'Watchlist',
      transactions: 'Transactions',
      settings: 'Settings',
      profile: 'Profile',
      earn: 'Earn',
      help: 'Help'
    };
    setNavTitle(titles[activeView] || 'Dashboard');
    return () => setNavTitle("");
  }, [activeView, setNavTitle]);

  // ── Data Fetching ──────────────────────────────────────────────
  const fetchProfile = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProfile(token);
      setProfile(data);
      setUser(data.user);
    } catch (err) {
      if (err.status === 401) logout();
      else setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [token, logout, setUser]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  // ── Dark Mode Toggle ───────────────────────────────────────────
  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('cb_theme', next ? 'dark' : 'light');
    if (next) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  };

  // ── Sidebar Toggle ─────────────────────────────────────────────
  const handleToggleSidebar = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem('cb_sidebar_collapsed', String(next));
  };

  // ── Profile Edits ──────────────────────────────────────────────
  const handleEdit = (field, currentValue) => {
    setEditField(field); setEditValue(currentValue || ""); setSaveError(null);
  };
  const handleCancelEdit = () => {
    setEditField(null); setEditValue(""); setSaveError(null);
  };
  const handleSaveEdit = async () => {
    if (!editField) return;
    setIsSaving(true); setSaveError(null);
    try {
      await patchProfile(token, { [editField]: editValue });
      showToast('success', 'Profile updated');
      setEditField(null);
      await fetchProfile();
    } catch (err) {
      if (err.status === 422 && err.data?.errors?.length > 0) setSaveError(err.data.errors[0].message);
      else showToast('error', err.message || 'Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  // ── Auth Guard ─────────────────────────────────────────────────
  if (authLoading) return null;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  const displayUser = profile?.user || { fullName: 'User', email: '' };
  const initials = getInitials(displayUser.fullName, displayUser.email);
  const hasPendingTx = profile?.recentActivity?.some(t => t.status === 'pending');

  return (
    <div className="profile-shell">
      <Sidebar
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          setMobileMenuOpen(false);
        }}
        isCollapsed={isCollapsed}
        onToggle={handleToggleSidebar}
        user={displayUser}
        initials={initials}
        logout={logout}
        hasPendingTx={hasPendingTx}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <main className="profile-main">
        {isLoading ? (
          <div className="profile-layout-loading">
            {/* Loading state handled inside the main content area */}
          </div>
        ) : error || !profile ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
            <p className="text-[#E53E3E] mb-4 text-[15px]">{error || 'Session expired. Please log in again.'}</p>
            <button onClick={fetchProfile} className="rounded-full bg-[#1652F0] px-6 py-2 text-[14px] font-semibold text-white">Try again</button>
          </div>
        ) : (
          <ProfileContent
            activeView={activeView}
            profile={profile}
            token={token}
            showToast={showToast}
            setActiveView={setActiveView}
            initials={initials}
            editField={editField}
            editValue={editValue}
            setEditValue={setEditValue}
            handleEdit={handleEdit}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
            isSaving={isSaving}
            saveError={saveError}
            currency={currency}
            setCurrency={setCurrency}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}
      </main>

      {/* MOBILE FLOATING HEADER */}
      <div className="mobile-floating-header">
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="hamburger-lines">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="mobile-page-name">
            {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
          </span>
        </button>
      </div>

      {/* TOAST NOTIFICATION */}
      <div
        className={`fixed bottom-6 right-6 px-6 py-3 rounded-[8px] text-[14px] font-semibold text-white shadow-lg transition-all duration-220 ease-out z-[999] flex items-center gap-3 ${toast ? "translate-y-0 opacity-100" : "translate-y-[100px] opacity-0"}`}
        style={{
          backgroundColor: toast?.type === 'success' ? '#1652F0' : (toast?.type === 'info' ? '#12141F' : '#E53E3E'),
          pointerEvents: toast ? 'auto' : 'none'
        }}
      >
        <span>{toast?.message}</span>
        <button onClick={() => setToast(null)} className="text-white/80 hover:text-white">✕</button>
      </div>
    </div>
  );
}
