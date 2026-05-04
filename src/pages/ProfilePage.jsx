import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getProfile, patchProfile } from "../api/profileApi";
import { getInitials } from "../utils/format";
import TradeView from "../components/Trade/TradeView";
import { FiUser, FiTrendingUp, FiLogOut } from "react-icons/fi";
import "./ProfilePage.css";

const COUNTRIES = [
  { code: 'GH', name: 'Ghana' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'KE', name: 'Kenya' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IN', name: 'India' },
  { code: 'AU', name: 'Australia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'CN', name: 'China' },
  { code: 'EG', name: 'Egypt' },
  { code: 'ES', name: 'Spain' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'MX', name: 'Mexico' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RU', name: 'Russia' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SG', name: 'Singapore' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TR', name: 'Turkey' },
  { code: 'VN', name: 'Vietnam' },
];

export default function ProfilePage() {
  const { token, logout, setUser } = useAuth();
  
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeView, setActiveView] = useState('profile'); // 'profile' | 'trade'
  const [editField, setEditField] = useState(null); // 'fullName' | 'phone' | 'country' | 'dateOfBirth' | null
  const [editValue, setEditValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProfile(token);
      setProfile(data);
      setUser(data.user);
    } catch (err) {
      if (err.status === 401) {
        logout();
      } else {
        setError(err.message || "An error occurred while fetching your profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const handleEdit = (field, currentValue) => {
    setEditField(field);
    setEditValue(currentValue || "");
    setSaveError(null);
  };

  const handleCancelEdit = () => {
    setEditField(null);
    setEditValue("");
    setSaveError(null);
  };

  const handleSaveEdit = async () => {
    if (!editField) return;
    
    setIsSaving(true);
    setSaveError(null);
    try {
      await patchProfile(token, { [editField]: editValue });
      showToast('success', 'Profile updated');
      setEditField(null);
      await fetchProfile(); // refetch to get updated data
    } catch (err) {
      if (err.status === 422 && err.data?.errors?.length > 0) {
        setSaveError(err.data.errors[0].message);
      } else {
        showToast('error', err.message || 'Failed to update profile');
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="profile-layout-loading">
        <div className="cb-nav-skeleton sidebar-skeleton" />
        <div className="main-content-skeleton space-y-6">
          <div className="cb-nav-skeleton w-full h-[120px] rounded-[16px]" />
          <div className="grid grid-cols-3 gap-3">
            <div className="cb-nav-skeleton h-[100px] rounded-[12px]" />
            <div className="cb-nav-skeleton h-[100px] rounded-[12px]" />
            <div className="cb-nav-skeleton h-[100px] rounded-[12px]" />
          </div>
          <div className="cb-nav-skeleton w-full h-[200px] rounded-[16px]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-[#E53E3E] mb-4 text-[15px]">{error}</p>
          <button 
            onClick={fetchProfile}
            className="rounded-full bg-[#1652F0] px-6 py-2 text-[14px] font-semibold text-white transition hover:bg-[#0F3FBB]"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const { user, account, limits, portfolio, recentActivity } = profile;
  const hasAvatar = !!user.avatarUrl;
  const initials = getInitials(user.fullName, user.email);

  // Derive Trader Level
  let traderLevel = "Level 1 Trader";
  if (portfolio.totalTrades > 50 && portfolio.totalTrades <= 200) traderLevel = "Level 2 Trader";
  if (portfolio.totalTrades > 200) traderLevel = "Level 3 Trader";

  // Formatted date (e.g. "March 2022")
  const memberSinceDate = user.memberSince ? new Date(user.memberSince) : new Date();
  const formattedMemberSince = memberSinceDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="profile-layout">
      {/* SIDEBAR */}
      <aside className="profile-sidebar">
        {/* User Identity block */}
        <div className="sidebar-identity">
          <div className="sidebar-avatar">
            {hasAvatar ? (
              <img src={user.avatarUrl} alt="Avatar" />
            ) : (
              initials
            )}
          </div>
          <p className="sidebar-name">{user.fullName}</p>
          <p className="sidebar-email">{user.email}</p>
        </div>

        {/* Navigation items */}
        <nav className="sidebar-nav">
          <div 
            className={`nav-item ${activeView === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveView('profile')}
          >
            <span className="nav-icon"><FiUser size={18} /></span> Profile
          </div>
          <div 
            className={`nav-item ${activeView === 'trade' ? 'active' : ''}`}
            onClick={() => setActiveView('trade')}
          >
            <span className="nav-icon"><FiTrendingUp size={18} /></span> Trade
          </div>
        </nav>

        {/* Logout button */}
        <button className="sidebar-signout" onClick={logout}>
          <span className="signout-icon"><FiLogOut size={18} /></span> Sign out
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="profile-main-content">
        {activeView === 'profile' ? (
          <div className="profile-sections view-enter">
            
            {/* 1. PROFILE HERO CARD */}
            <div className="bg-[#FFFFFF] border border-[#E8E8E8] rounded-[16px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-5">
                <div className="h-[64px] w-[64px] shrink-0 rounded-full border-2 border-[#E8E8E8] overflow-hidden bg-[#1652F0] flex items-center justify-center text-white text-[24px] font-semibold">
                  {hasAvatar ? (
                    <img src={user.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <div>
                  <h1 className="text-[18px] font-semibold text-[#0A0B0D] mb-1">{user.fullName}</h1>
                  <p className="text-[13px] text-[#6B7280] mb-3">{user.email}</p>
                  <div className="flex flex-wrap gap-2">
                    {account.kycLevel >= 1 && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0EA56A]/10 text-[#0EA56A] text-[11px] font-bold">KYC Verified</span>
                    )}
                    {account.twoFaEnabled && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1652F0]/10 text-[#1652F0] text-[11px] font-bold">2FA Enabled</span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F7931A]/10 text-[#F7931A] text-[11px] font-bold">{traderLevel}</span>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="mb-2">
                  <p className="text-[11px] text-[#9CA3AF] uppercase font-semibold">Member since</p>
                  <p className="text-[14px] text-[#0A0B0D] font-medium">{formattedMemberSince}</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#9CA3AF] uppercase font-semibold">User ID</p>
                  <p className="text-[14px] text-[#0A0B0D] font-medium">{user.id.substring(0, 12)}...</p>
                </div>
              </div>
            </div>

            {/* 2. STATS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-[#FFFFFF] border border-[#E8E8E8] rounded-[16px] p-5">
                <p className="text-[12px] text-[#6B7280] mb-1 font-medium">Portfolio Value</p>
                <p className="text-[20px] font-semibold text-[#0A0B0D]">${portfolio.totalValueUsd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <div className="bg-[#FFFFFF] border border-[#E8E8E8] rounded-[16px] p-5">
                <p className="text-[12px] text-[#6B7280] mb-1 font-medium">Total Trades</p>
                <p className="text-[20px] font-semibold text-[#0A0B0D]">{portfolio.totalTrades}</p>
              </div>
              <div className="bg-[#FFFFFF] border border-[#E8E8E8] rounded-[16px] p-5 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[12px] text-[#6B7280] font-medium">Daily Limit</p>
                  <p className="text-[12px] text-[#0A0B0D] font-medium">${limits.dailyBuyUsed.toLocaleString()} / ${limits.dailyBuyLimit.toLocaleString()}</p>
                </div>
                <div className="w-full h-[4px] bg-[#F0F0F0] rounded-[2px] overflow-hidden">
                  <div 
                    className="h-full bg-[#1652F0] rounded-[2px]" 
                    style={{ width: `${Math.min(100, (limits.dailyBuyUsed / limits.dailyBuyLimit) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 3. PERSONAL INFO CARD */}
            <div className="bg-[#FFFFFF] border border-[#E8E8E8] rounded-[16px] p-6 mb-6">
              <h2 className="text-[11px] font-bold text-[#9CA3AF] uppercase mb-4 tracking-wider">Personal Info</h2>
              <div className="space-y-4">
                
                {/* Full Name Row */}
                <div className="group flex justify-between items-center py-2">
                  <p className="text-[14px] text-[#6B7280] w-[120px] shrink-0">Full Name</p>
                  <div className="flex-1 flex justify-end">
                    {editField === 'fullName' ? (
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            value={editValue} 
                            onChange={(e) => setEditValue(e.target.value)}
                            className="border border-[#1652F0] rounded-[8px] px-2 py-1 text-[14px] w-[200px] outline-none"
                            autoFocus
                          />
                          <button onClick={handleSaveEdit} disabled={isSaving} className="text-[#0EA56A] font-bold hover:opacity-80 disabled:opacity-50 text-[14px] px-1">
                            {isSaving ? "..." : "✓"}
                          </button>
                          <button onClick={handleCancelEdit} disabled={isSaving} className="text-[#E53E3E] font-bold hover:opacity-80 disabled:opacity-50 text-[14px] px-1">✕</button>
                        </div>
                        {saveError && <p className="text-[#E53E3E] text-[12px]">{saveError}</p>}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <p className="text-[14px] text-[#0A0B0D] font-medium">{user.fullName}</p>
                        <button onClick={() => handleEdit('fullName', user.fullName)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#9CA3AF] hover:text-[#1652F0]">✏</button>
                      </div>
                    )}
                  </div>
                </div>
                
                <hr className="border-none border-t border-[#E8E8E8] my-2" />

                {/* Phone Row */}
                <div className="group flex justify-between items-center py-2">
                  <p className="text-[14px] text-[#6B7280] w-[120px] shrink-0">Phone</p>
                  <div className="flex-1 flex justify-end">
                    {editField === 'phone' ? (
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            value={editValue} 
                            onChange={(e) => setEditValue(e.target.value)}
                            placeholder="+233550000000"
                            className="border border-[#1652F0] rounded-[8px] px-2 py-1 text-[14px] w-[200px] outline-none"
                            autoFocus
                          />
                          <button onClick={handleSaveEdit} disabled={isSaving} className="text-[#0EA56A] font-bold hover:opacity-80 disabled:opacity-50 text-[14px] px-1">
                            {isSaving ? "..." : "✓"}
                          </button>
                          <button onClick={handleCancelEdit} disabled={isSaving} className="text-[#E53E3E] font-bold hover:opacity-80 disabled:opacity-50 text-[14px] px-1">✕</button>
                        </div>
                        {saveError && <p className="text-[#E53E3E] text-[12px]">{saveError}</p>}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <p className="text-[14px] text-[#0A0B0D] font-medium">{user.phone || 'Not set'}</p>
                        <button onClick={() => handleEdit('phone', user.phone)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#9CA3AF] hover:text-[#1652F0]">✏</button>
                      </div>
                    )}
                  </div>
                </div>

                <hr className="border-none border-t border-[#E8E8E8] my-2" />

                {/* Country Row */}
                <div className="group flex justify-between items-center py-2">
                  <p className="text-[14px] text-[#6B7280] w-[120px] shrink-0">Country</p>
                  <div className="flex-1 flex justify-end">
                    {editField === 'country' ? (
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                          <select 
                            value={editValue} 
                            onChange={(e) => setEditValue(e.target.value)}
                            className="border border-[#1652F0] rounded-[8px] px-2 py-1 text-[14px] w-[200px] outline-none bg-white"
                            autoFocus
                          >
                            <option value="">Select Country</option>
                            {COUNTRIES.map(c => (
                              <option key={c.code} value={c.code}>{c.name}</option>
                            ))}
                          </select>
                          <button onClick={handleSaveEdit} disabled={isSaving} className="text-[#0EA56A] font-bold hover:opacity-80 disabled:opacity-50 text-[14px] px-1">
                            {isSaving ? "..." : "✓"}
                          </button>
                          <button onClick={handleCancelEdit} disabled={isSaving} className="text-[#E53E3E] font-bold hover:opacity-80 disabled:opacity-50 text-[14px] px-1">✕</button>
                        </div>
                        {saveError && <p className="text-[#E53E3E] text-[12px]">{saveError}</p>}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <p className="text-[14px] text-[#0A0B0D] font-medium">
                          {COUNTRIES.find(c => c.code === user.country)?.name || user.country || 'Not set'}
                        </p>
                        <button onClick={() => handleEdit('country', user.country)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#9CA3AF] hover:text-[#1652F0]">✏</button>
                      </div>
                    )}
                  </div>
                </div>

                <hr className="border-none border-t border-[#E8E8E8] my-2" />

                {/* Date of Birth Row */}
                <div className="group flex justify-between items-center py-2">
                  <p className="text-[14px] text-[#6B7280] w-[120px] shrink-0">Date of birth</p>
                  <div className="flex-1 flex justify-end">
                    {editField === 'dateOfBirth' ? (
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                          <input 
                            type="date" 
                            value={editValue} 
                            onChange={(e) => setEditValue(e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                            min="1900-01-01"
                            className="border border-[#1652F0] rounded-[8px] px-2 py-1 text-[14px] w-[200px] outline-none"
                            autoFocus
                          />
                          <button onClick={handleSaveEdit} disabled={isSaving} className="text-[#0EA56A] font-bold hover:opacity-80 disabled:opacity-50 text-[14px] px-1">
                            {isSaving ? "..." : "✓"}
                          </button>
                          <button onClick={handleCancelEdit} disabled={isSaving} className="text-[#E53E3E] font-bold hover:opacity-80 disabled:opacity-50 text-[14px] px-1">✕</button>
                        </div>
                        {saveError && <p className="text-[#E53E3E] text-[12px]">{saveError}</p>}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <p className="text-[14px] text-[#0A0B0D] font-medium">{user.dateOfBirth}</p>
                        <button onClick={() => handleEdit('dateOfBirth', user.dateOfBirthRaw)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#9CA3AF] hover:text-[#1652F0]">✏</button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* 4. ACCOUNT STATUS CARD */}
            <div className="bg-[#FFFFFF] border border-[#E8E8E8] rounded-[16px] p-6 mb-6">
              <h2 className="text-[11px] font-bold text-[#9CA3AF] uppercase mb-4 tracking-wider">Account Status</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <p className="text-[14px] text-[#6B7280]">KYC Level</p>
                  <p className={`text-[14px] font-semibold ${account.kycLevel >= 1 ? 'text-[#0EA56A]' : 'text-[#F7931A]'}`}>Level {account.kycLevel}</p>
                </div>
                <hr className="border-none border-t border-[#E8E8E8] my-2" />
                <div className="flex justify-between items-center py-2">
                  <p className="text-[14px] text-[#6B7280]">2FA</p>
                  <p className={`text-[14px] font-semibold ${account.twoFaEnabled ? 'text-[#0EA56A]' : 'text-[#E53E3E]'}`}>
                    {account.twoFaEnabled ? `Enabled (${account.twoFaMethod})` : 'Disabled'}
                  </p>
                </div>
                <hr className="border-none border-t border-[#E8E8E8] my-2" />
                <div className="flex justify-between items-center py-2">
                  <p className="text-[14px] text-[#6B7280]">Account Tier</p>
                  <p className="text-[14px] font-semibold text-[#1652F0] capitalize">{account.tier}</p>
                </div>
              </div>
            </div>

            {/* 5. RECENT ACTIVITY LIST */}
            <div className="bg-[#FFFFFF] border border-[#E8E8E8] rounded-[16px] p-6">
              <h2 className="text-[11px] font-bold text-[#9CA3AF] uppercase mb-4 tracking-wider">Recent Activity</h2>
              {recentActivity && recentActivity.length > 0 ? (
                <div className="space-y-1">
                  {recentActivity.map((txn) => {
                    let iconBg = '#F5F5F5';
                    let iconColor = '#6B7280';
                    if (txn.asset === 'BTC') { iconBg = 'rgba(247,147,26,0.12)'; iconColor = '#F7931A'; }
                    else if (txn.asset === 'ETH') { iconBg = 'rgba(98,126,234,0.12)'; iconColor = '#627EEA'; }
                    else if (txn.asset === 'USD') { iconBg = 'rgba(22,82,240,0.10)'; iconColor = '#1652F0'; }

                    const isPositive = txn.type === 'buy' || txn.type === 'deposit';
                    const d = new Date(txn.timestamp);
                    const isToday = new Date().toDateString() === d.toDateString();
                    const dateStr = isToday ? `Today, ${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` : d.toLocaleDateString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'});

                    return (
                      <div key={txn.id} className="flex justify-between items-center py-3 border-b border-[#E8E8E8] last:border-0">
                        <div className="flex items-center gap-4">
                          <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center font-bold text-[14px]" style={{ backgroundColor: iconBg, color: iconColor }}>
                            {txn.asset.substring(0, 3)}
                          </div>
                          <div>
                            <p className="text-[15px] font-medium text-[#0A0B0D] capitalize">{txn.type} {txn.asset}</p>
                            <p className="text-[13px] text-[#6B7280]">{dateStr}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-[15px] font-semibold ${isPositive ? 'text-[#0EA56A]' : 'text-[#E53E3E]'}`}>
                            {isPositive ? '+' : '-'}{txn.amount} {txn.asset}
                          </p>
                          <p className="text-[13px] text-[#6B7280]">${txn.usdValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[14px] text-[#6B7280]">No recent activity.</p>
              )}
            </div>

          </div>
        ) : (
          <TradeView showToast={showToast} />
        )}
      </main>

      {/* TOAST NOTIFICATION */}
      <div 
        className={`fixed bottom-6 right-6 px-6 py-3 rounded-[8px] text-[14px] font-semibold text-white shadow-lg transition-all duration-220 ease-out z-[999] flex items-center gap-3 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-[80px] opacity-0"
        }`}
        style={{
          backgroundColor: toast?.type === 'success' ? '#1652F0' : '#E53E3E',
          pointerEvents: toast ? 'auto' : 'none'
        }}
      >
        <span>{toast?.message}</span>
        <button onClick={() => setToast(null)} className="text-white/80 hover:text-white">✕</button>
      </div>
    </div>
  );
}
