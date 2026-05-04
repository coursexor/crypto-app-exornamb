import { Link } from "react-router-dom";

// Renders the top navigation bar for the Asset Detail page
export default function AssetDetailTopBar() {
    return (
        <div className="border-b border-gray-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm">
            <div className="font-medium text-gray-900">Listings</div>
            <div className="flex items-center gap-6 text-xs font-medium">
            <Link to="/asset-details" className="text-gray-900 hover:text-[#0052FF]">
                Get Listed
            </Link>
            <Link to="/asset-details" className="text-gray-900 hover:text-[#0052FF]">
                Listings Standards
            </Link>
            </div>
        </div>
        </div>
    );
}