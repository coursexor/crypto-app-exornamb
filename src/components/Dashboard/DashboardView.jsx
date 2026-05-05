import PortfolioOverview from "./PortfolioOverview";
import QuickActions from "./QuickActions";
import AssetList from "./AssetList";

export default function DashboardView({ portfolio, holdings, showToast, setActiveView }) {
  return (
    <div className="max-w-[900px] mx-auto space-y-6">
      <PortfolioOverview portfolio={portfolio} />
      <QuickActions showToast={showToast} />
      <AssetList holdings={holdings} setActiveView={setActiveView} />
    </div>
  );
}
