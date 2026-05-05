import DashboardView from "./DashboardView";
import AssetsView from "./AssetsView";
import TradeView from "../Trade/TradeView";
import Watchlist from "./Watchlist";
import TransactionsView from "./TransactionsView";
import ProfileInfoView from "../Profile/ProfileInfoView";
import SettingsView from "./SettingsView";
import EarnPlaceholder from "./EarnPlaceholder";
import HelpPlaceholder from "./HelpPlaceholder";

export default function ProfileContent({ 
  activeView, 
  profile, 
  token, 
  showToast, 
  setActiveView,
  initials,
  editField,
  editValue,
  setEditValue,
  handleEdit,
  handleSaveEdit,
  handleCancelEdit,
  isSaving,
  saveError,
  currency,
  setCurrency,
  darkMode,
  toggleDarkMode,
  notifications,
  setNotifications
}) {
  const { user, account, portfolio, holdings } = profile || {};
  const safeHoldings = Array.isArray(holdings) ? holdings : [];
  const safePortfolio = portfolio || { totalValueUsd: 0 };

  const views = {
    dashboard: (
      <DashboardView 
        portfolio={safePortfolio} 
        holdings={safeHoldings} 
        showToast={showToast} 
        setActiveView={setActiveView} 
      />
    ),
    assets: (
      <AssetsView 
        holdings={safeHoldings} 
        portfolio={safePortfolio} 
      />
    ),
    trade: (
      <TradeView 
        showToast={showToast} 
      />
    ),
    watchlist: (
      <Watchlist 
        showToast={showToast} 
      />
    ),
    transactions: (
      <TransactionsView 
        token={token} 
      />
    ),
    profile: (
      <ProfileInfoView 
        user={user} 
        account={account} 
        initials={initials}
        editField={editField}
        editValue={editValue}
        setEditValue={setEditValue}
        handleEdit={handleEdit}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
        isSaving={isSaving}
        saveError={saveError}
      />
    ),
    settings: (
      <SettingsView 
        account={account}
        currency={currency}
        setCurrency={setCurrency}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        notifications={notifications}
        setNotifications={setNotifications}
        showToast={showToast}
      />
    ),
    earn: (
      <EarnPlaceholder 
        activeView={activeView} 
        handleViewChange={setActiveView} 
      />
    ),
    help: (
      <HelpPlaceholder 
        activeView={activeView} 
        handleViewChange={setActiveView} 
      />
    ),
  };

  return (
    <div className="profile-content-wrapper">
      {views[activeView] ?? views['dashboard']}
    </div>
  );
}
