import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import { FiArrowUpRight, FiSearch } from "react-icons/fi";
import MarketStats from "../components/explore/MarketStats";
import CryptoTable from "../components/explore/CryptoTable";
import TradeBanner from "../components/explore/TradeBanner";
import TopMoversSection from "../components/explore/TopMoversSection";
import CookieBanner from "../components/common/CookieBanner";
import useLiveMarketData from "../hooks/useLiveMarketData";

export default function Explore() {
    const [search, setSearch]           = useState("");
    const [starred, setStarred]         = useState(new Set());
    const [category]                    = useState("all");
    const [showCoin50Modal, setShowCoin50Modal] = useState(false);

    const { cryptos, loading, error } = useLiveMarketData();

    const toggleStar = (symbol) =>
        setStarred((prev) => {
            const next = new Set(prev);
            next.has(symbol) ? next.delete(symbol) : next.add(symbol);
            return next;
        });

    // Search + category filter
    let filtered = cryptos.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.symbol.toLowerCase().includes(search.toLowerCase())
    );
    if (category === "gainers")   filtered = filtered.filter((c) => c.change24h > 0);
    if (category === "losers")    filtered = filtered.filter((c) => c.change24h < 0);
    if (category === "tradeable") filtered = filtered.filter((c) => c.symbol !== "TRX");
    if (category === "new")       filtered = filtered.slice(0, 3);

    return (
        <PageLayout>
        <div className="min-h-screen bg-white">

            {/* ── HERO HEADER ────────────────────────────────────────── */}
            <div className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-[1100px] px-4 sm:px-6 pt-6 sm:pt-10 pb-5 sm:pb-7">

                    {/* Row: title block + search bar */}
                    <div className="flex flex-col gap-4 sm:gap-5 sm:flex-row sm:items-end sm:justify-between">

                        {/* Left — heading + sub-line */}
                        <div>
                            <h1 className="text-[24px] sm:text-[34px] font-semibold tracking-tight text-gray-900 leading-tight">
                                Explore crypto
                            </h1>

                            {/* Sub-line: index + info badge */}
                            <p className="mt-1 sm:mt-1.5 text-[12px] sm:text-[13.5px] text-gray-500 whitespace-nowrap flex items-center gap-1">
                                <span>Coinbase 50 Index is up</span>
                                <span className="inline-flex items-center gap-0.5 font-medium">
                                    <FiArrowUpRight size={13} strokeWidth={2.5} className="text-emerald-500" />
                                    <span>0.95% (24hrs)</span>
                                </span>
                                <button
                                    onClick={() => setShowCoin50Modal(true)}
                                    className="inline-flex h-[11px] w-[11px] items-center justify-center
                                               rounded-full bg-gray-200 text-[6.5px] font-bold text-gray-500
                                               hover:bg-gray-400 hover:text-white transition flex-shrink-0 relative -top-[4px]"
                                    title="About Coinbase 50 Index"
                                >
                                    i
                                </button>
                            </p>
                        </div>

                        {/* Right — search bar */}
                        <div className="w-full sm:w-auto sm:min-w-[360px]">
                            <div className="relative">
                                <FiSearch
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={15}
                                />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search for an asset"
                                    className="w-full rounded-full bg-[#F2F4F7] py-2.5 pl-10 pr-5
                                               text-[14px] text-gray-700 placeholder-gray-400
                                               outline-none transition
                                               focus:bg-white focus:ring-2 focus:ring-[#0052FF]/25"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── BODY ───────────────────────────────────────────────── */}
            <div className="mx-auto max-w-[1100px] px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-20">

                {/* Market stats (with expandable text + modal) */}
                <MarketStats showModal={showCoin50Modal} setShowModal={setShowCoin50Modal} />

                {/* Crypto table */}
                {loading ? (
                    <div className="py-20 text-center text-[14px] text-gray-400">
                        Loading market data…
                    </div>
                ) : error ? (
                    <div className="py-20 text-center text-[14px] text-red-400">
                        Error loading market data.
                    </div>
                ) : (
                    <CryptoTable filtered={filtered} starred={starred} toggleStar={toggleStar} />
                )}
            </div>

            <TradeBanner />

            <div className="mx-auto max-w-[1100px] px-6 pt-12 pb-10">
                <TopMoversSection />
                <CookieBanner />
            </div>
        </div>
        </PageLayout>
    );
}
