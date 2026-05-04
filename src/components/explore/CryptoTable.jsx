import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiSearch, FiCheck, FiStar } from "react-icons/fi";
import Sparkline from "../Trade/Sparkline";

const DropdownMenu = ({ name, options, selected, onSelect, openDropdown, setOpenDropdown, currencySearch, setCurrencySearch }) => (
    <div className={`absolute top-full left-0 z-50 mt-2 w-64 rounded-2xl bg-white p-2 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 ${openDropdown === name ? 'block' : 'hidden'}`}>
        {name === 'currency' && (
            <div className="mb-2 px-2 pt-1">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                        value={currencySearch}
                        onChange={(e) => setCurrencySearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Search" 
                        className="w-full rounded-xl bg-gray-50 py-2.5 pl-9 pr-3 text-[14px] outline-none border border-transparent focus:border-gray-200 transition" 
                    />
                </div>
            </div>
        )}
        <div className={`max-h-64 overflow-y-auto ${name === 'currency' ? 'mt-2' : ''}`}>
            {options.map((opt) => (
                <button
                    key={opt.label || opt}
                    onClick={() => {
                        onSelect(opt.label || opt);
                        setOpenDropdown(null);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors hover:bg-gray-50
                        ${selected === (opt.label || opt) ? 'bg-gray-50 text-gray-900' : 'text-gray-700'}`}
                >
                    <div className="flex items-center gap-3">
                        {opt.icon && <span className="text-gray-500">{opt.icon}</span>}
                        <div className="flex flex-col">
                            <span className="text-[14px] font-bold">{opt.label || opt}</span>
                            {opt.name && <span className="text-[12px] text-gray-500 font-medium">{opt.name}</span>}
                        </div>
                    </div>
                    {selected === (opt.label || opt) && <FiCheck className="text-blue-600" />}
                </button>
            ))}
        </div>
    </div>
);

export default function CryptoTable({ filtered, starred, toggleStar }) {
    const navigate = useNavigate();
    
    // State for dropdowns
    const [openDropdown, setOpenDropdown] = useState(null); 
    
    // Values
    const [selectedAssetType, setSelectedAssetType] = useState("All assets");
    const [selectedTime, setSelectedTime] = useState("1D");
    const [selectedCurrency, setSelectedCurrency] = useState("GHS");
    const [selectedRows, setSelectedRows] = useState("5 rows"); // Changed to 5 rows default

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = parseInt(selectedRows);
    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filtered.slice(startIndex, startIndex + rowsPerPage);

    // React recommendation for deriving state based on props/state changes without useEffect
    const [prevFilteredLength, setPrevFilteredLength] = useState(filtered.length);
    const [prevSelectedRows, setPrevSelectedRows] = useState(selectedRows);

    if (filtered.length !== prevFilteredLength || selectedRows !== prevSelectedRows) {
        setPrevFilteredLength(filtered.length);
        setPrevSelectedRows(selectedRows);
        setCurrentPage(1);
    }

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClick = () => setOpenDropdown(null);
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    const toggleDropdown = (e, name) => {
        e.stopPropagation();
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const currencies = [
        { label: "AED", name: "United Arab Emirates Dirham" },
        { label: "AFN", name: "Afghan Afghani" },
        { label: "ALL", name: "Albanian Lek" },
        { label: "AMD", name: "Armenian Dram" },
        { label: "ANG", name: "Netherlands Antillean Gulden" },
        { label: "AOA", name: "Angolan Kwanza" },
        { label: "ARS", name: "Argentine Peso" },
        { label: "AUD", name: "Australian Dollar" },
        { label: "GHS", name: "Ghanaian Cedi" },
        { label: "USD", name: "United States Dollar" },
        { label: "EUR", name: "Euro" },
    ];
    const [currencySearch, setCurrencySearch] = useState("");
    const filteredCurrencies = currencies.filter(c => 
        c.label.toLowerCase().includes(currencySearch.toLowerCase()) || 
        c.name.toLowerCase().includes(currencySearch.toLowerCase())
    );

    return (
        <div className="mt-8">
            <h2 className="text-[17px] font-bold text-gray-900 mb-6">
                Crypto market prices
            </h2>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-8">
                {/* All Assets */}
                <div className="relative">
                    <button 
                        onClick={(e) => toggleDropdown(e, 'assets')}
                        className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#F4F6F8] px-3 sm:px-4 py-2 sm:py-2.5 text-[13px] sm:text-[14px] font-medium text-gray-900 hover:bg-gray-200/70 transition"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20z"/></svg>
                        {selectedAssetType}
                        <FiChevronDown size={14} className={`transition-transform ${openDropdown === 'assets' ? 'rotate-180' : ''}`} />
                    </button>
                    <DropdownMenu 
                        name="assets" 
                        selected={selectedAssetType} 
                        onSelect={setSelectedAssetType}
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                        currencySearch={currencySearch}
                        setCurrencySearch={setCurrencySearch}
                        options={[
                            { label: "All assets", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20z"/></svg> },
                            { label: "Tradeable", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20V10M18 20V4M6 20v-4"/></svg> },
                            { label: "New", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
                            { label: "Gainers", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg> },
                            { label: "Losers", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 7l9.2 9.2M17 7v10H7"/></svg> },
                        ]} 
                    />
                </div>

                {/* 1D */}
                <div className="relative">
                    <button 
                        onClick={(e) => toggleDropdown(e, 'time')}
                        className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#F4F6F8] px-3 sm:px-4 py-2 sm:py-2.5 text-[13px] sm:text-[14px] font-medium text-gray-900 hover:bg-gray-200/70 transition"
                    >
                        {selectedTime}
                        <FiChevronDown size={14} className={`transition-transform ${openDropdown === 'time' ? 'rotate-180' : ''}`} />
                    </button>
                    <DropdownMenu 
                        name="time" 
                        selected={selectedTime} 
                        onSelect={setSelectedTime}
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                        currencySearch={currencySearch}
                        setCurrencySearch={setCurrencySearch}
                        options={["1H", "1D", "1W", "1M", "1Y"]} 
                    />
                </div>

                {/* GHS */}
                <div className="relative">
                    <button 
                        onClick={(e) => toggleDropdown(e, 'currency')}
                        className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#F4F6F8] px-3 sm:px-4 py-2 sm:py-2.5 text-[13px] sm:text-[14px] font-medium text-gray-900 hover:bg-gray-200/70 transition"
                    >
                        {selectedCurrency}
                        <FiChevronDown size={14} className={`transition-transform ${openDropdown === 'currency' ? 'rotate-180' : ''}`} />
                    </button>
                    <DropdownMenu 
                        name="currency" 
                        selected={selectedCurrency} 
                        onSelect={setSelectedCurrency}
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                        currencySearch={currencySearch}
                        setCurrencySearch={setCurrencySearch}
                        options={filteredCurrencies} 
                    />
                </div>

                {/* Rows - hidden on mobile */}
                <div className="relative hidden sm:block">
                    <button 
                        onClick={(e) => toggleDropdown(e, 'rows')}
                        className="flex items-center gap-2 rounded-full bg-[#F4F6F8] px-4 py-2.5 text-[14px] font-medium text-gray-900 hover:bg-gray-200/70 transition"
                    >
                        {selectedRows}
                        <FiChevronDown size={14} className={`transition-transform ${openDropdown === 'rows' ? 'rotate-180' : ''}`} />
                    </button>
                    <DropdownMenu 
                        name="rows" 
                        selected={selectedRows} 
                        onSelect={setSelectedRows}
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                        currencySearch={currencySearch}
                        setCurrencySearch={setCurrencySearch}
                        options={["5 rows", "10 rows", "30 rows", "50 rows"]} 
                    />
                </div>
            </div>

            {/* Table */}
            <div className="w-full">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-[13px] font-medium text-gray-500 border-b border-gray-100">
                            <th className="w-10 pb-4 hidden sm:table-cell"></th>
                            <th className="pb-4 text-left font-medium">
                                <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900">
                                    Asset
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-400"><path d="M12 20V4M5 11l7-7 7 7"/></svg>
                                </div>
                            </th>
                            <th className="pb-4 text-center font-medium">Chart</th>
                            <th className="pb-4 text-right font-medium">
                                <div className="flex items-center justify-end gap-1.5 cursor-pointer hover:text-gray-900">
                                    Market price
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-400 hidden sm:inline"><path d="M12 20V4M5 11l7-7 7 7"/></svg>
                                </div>
                            </th>
                            <th className="pb-4 text-right font-medium hidden md:table-cell">
                                <div className="flex items-center justify-end gap-1.5 cursor-pointer hover:text-gray-900">
                                    Change
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-400"><path d="M12 20V4M5 11l7-7 7 7"/></svg>
                                </div>
                            </th>
                            <th className="pb-4 text-right font-medium pr-2 hidden md:table-cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((coin) => {
                            const isNegative = coin.change24h < 0;
                            // Format price with commas
                            const priceFormatted = `${selectedCurrency} ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                            
                            // Define color based on coin for sparkline
                            const getCoinColor = (symbol) => {
                                switch(symbol.toLowerCase()) {
                                    case 'btc': return 'text-orange-500';
                                    case 'eth': return 'text-blue-500';
                                    case 'usdt': return 'text-emerald-500';
                                    case 'xrp': return 'text-gray-900';
                                    default: return isNegative ? 'text-red-500' : 'text-emerald-500';
                                }
                            };

                            return (
                                <tr 
                                    key={coin.symbol} 
                                    onClick={() => navigate("/asset-details")}
                                    className="group hover:bg-gray-50/50 transition-colors cursor-pointer"
                                >
                                    <td className="py-4 sm:py-6 text-center hidden sm:table-cell" onClick={(e) => e.stopPropagation()}>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); toggleStar(coin.symbol); }} 
                                            className={`transition-colors ${starred.has(coin.symbol) ? "text-yellow-400" : "text-gray-300 hover:text-gray-600"}`}
                                        >
                                            <FiStar fill={starred.has(coin.symbol) ? "currentColor" : "none"} size={16} />
                                        </button>
                                    </td>
                                    <td className="py-4 sm:py-6">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <img src={coin.imageUrl} alt={coin.name} className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover" />
                                            <div>
                                                <p className="text-[14px] sm:text-[16px] font-bold text-gray-900 leading-tight">{coin.name}</p>
                                                <p className="text-[12px] sm:text-[13px] text-gray-500 font-medium">{coin.symbol.toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 sm:py-6 text-center">
                                        <div className="flex justify-center">
                                            <Sparkline 
                                                data={coin.sparkline} 
                                                changePercent={coin.change24h} 
                                                width={90} 
                                                height={30} 
                                            />
                                        </div>
                                    </td>
                                    <td className="py-4 sm:py-6 text-right">
                                        <span className="text-[13px] sm:text-[15px] font-medium text-gray-900">{priceFormatted}</span>
                                        {/* Show change below price on mobile */}
                                        <p className={`md:hidden text-[12px] font-medium mt-0.5 ${isNegative ? "text-red-500" : "text-emerald-500"}`}>
                                            {isNegative ? "↘" : "↗"} {Math.abs(coin.change24h).toFixed(2)}%
                                        </p>
                                    </td>
                                    <td className={`py-4 sm:py-6 text-right font-medium text-[15px] hidden md:table-cell ${isNegative ? "text-red-500" : "text-emerald-500"}`}>
                                        <div className="flex items-center justify-end gap-1">
                                            {isNegative ? "↘" : "↗"}
                                            <span>{Math.abs(coin.change24h).toFixed(2)}%</span>
                                        </div>
                                    </td>
                                    <td className="py-4 sm:py-6 text-right pr-2 hidden md:table-cell" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); navigate("/signup"); }}
                                            className="rounded-full bg-[#0052FF] px-6 py-2.5 text-[14px] font-bold text-white hover:bg-[#004BD6] transition shadow-sm"
                                        >
                                            Trade
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination / Footer info */}
            {totalPages > 1 && (
                <div className="mt-12 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            className={`flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent`}
                        >
                            <FiChevronDown className="rotate-90" size={18} />
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold transition
                                ${currentPage === i + 1 ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-50"}`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button 
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            className={`flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent`}
                        >
                            <FiChevronDown className="-rotate-90" size={18} />
                        </button>
                    </div>
                    <p className="text-[13px] text-gray-500">
                        {startIndex + 1}–{Math.min(startIndex + rowsPerPage, filtered.length)} of {filtered.length} assets
                    </p>
                </div>
            )}
        </div>
    );
}

