import { useState, useRef, useEffect } from "react";
import { FiArrowDownLeft, FiArrowUpRight, FiX } from "react-icons/fi";
import { MARKET_STATS } from "../../data/exploreData";

const FULL_TEXT = `The overall crypto market is growing this week. As of today, the total crypto market capitalization is 28.77 trillion, representing a 1.89% increase from last week.

The 24-hour crypto market trading volume has also seen a 77.09% increase over the past day. The top performing cryptocurrencies by price are Superform, BENQI and Drift Protocol. Bitcoin remains the largest cryptocurrency by market capitalization of GHS 17,328,030,818,645.18. Its 24-hour trading volume has seen a 22.51% decrease over the past day. Ethereum, the second largest cryptocurrency by market cap of GHS 3,085,392,944,591.75, has seen its 24-hour trading volume decrease 48.00% in the last day.`;

const SHORT_TEXT = `The overall crypto market is growing this week. As of today, the total crypto market capitalization is 28.77 trillion, representing a 1.89% increase from last week.`;

// Sparkline SVG with area fill
function Sparkline({ d, neg }) {
    const color = neg ? "#DC2626" : "#16A34A";
    const fillColor = neg ? "rgba(220,38,38,0.10)" : "rgba(22,163,74,0.10)";
    // Build a closed path for the fill area
    const closedD = `${d} L84 30 L4 30 Z`;
    return (
        <svg viewBox="0 0 90 32" className="mt-3 h-10 w-full" preserveAspectRatio="none">
            <path d={closedD} fill={fillColor} stroke="none" />
            <path d={d} fill="none" stroke={color} strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// Coin50 Info Modal
function Coin50Modal({ onClose }) {
    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40 px-4"
            onClick={onClose}>
            <div className="relative w-full max-w-[400px] rounded-2xl bg-white p-8 shadow-2xl text-center"
                onClick={(e) => e.stopPropagation()}>
                {/* Close */}
                <button onClick={onClose}
                    className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100 transition">
                    <FiX size={16} />
                </button>

                <p className="text-[15px] font-semibold text-gray-900 mb-5">Coinbase 50 Index</p>

                {/* COIN50 icon */}
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full
                    bg-gradient-to-br from-[#1652F0] to-[#3B82F6] shadow-lg ring-4 ring-[#93C5FD]/40">
                    <span className="text-[13px] font-bold text-white tracking-tight">COIN50</span>
                </div>

                <h2 className="text-[22px] font-bold text-gray-900 mb-3">Coinbase 50 Index</h2>
                <p className="text-[14px] leading-6 text-gray-500 mb-8">
                    The Coinbase 50 Index (COIN50) is a market cap-weighted index of the top 50 assets
                    that meet the index's criteria. Traders can use the index to track the performance
                    of the crypto market and benchmark their returns.
                </p>

                <div className="flex gap-3 justify-center">
                    <button onClick={onClose}
                        className="rounded-full border border-gray-200 px-7 py-2.5 text-[14px] font-semibold text-gray-700 hover:bg-gray-50 transition">
                        Learn more
                    </button>
                    <button onClick={onClose}
                        className="rounded-full bg-[#0052FF] px-7 py-2.5 text-[14px] font-semibold text-white hover:bg-[#0046DA] transition">
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function MarketStats({ showModal, setShowModal }) {
    const [expanded, setExpanded] = useState(false);
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    };

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        if (el) el.addEventListener("scroll", checkScroll);
        return () => el?.removeEventListener("scroll", checkScroll);
    }, []);

    const scroll = (dir) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * 260, behavior: "smooth" });
    };

    return (
        <>
        {showModal && <Coin50Modal onClose={() => setShowModal(false)} />}

        <div className="mt-2 mb-8">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-[17px] font-bold text-gray-900">Market stats</h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => scroll(-1)}
                        disabled={!canScrollLeft}
                        className="text-gray-400 hover:text-gray-700 transition disabled:opacity-25"
                    >
                        <span className="text-[18px]">←</span>
                    </button>
                    <button
                        onClick={() => scroll(1)}
                        disabled={!canScrollRight}
                        className="text-gray-400 hover:text-gray-700 transition disabled:opacity-25"
                    >
                        <span className="text-[18px]">→</span>
                    </button>
                </div>
            </div>

            {/* Expandable text */}
            <div className="text-[13px] leading-6 text-gray-600 mb-1">
                <p className="whitespace-pre-line">{expanded ? FULL_TEXT : SHORT_TEXT}</p>
                <button onClick={() => setExpanded((v) => !v)}
                    className="mt-1 text-[#0052FF] font-medium hover:underline">
                    {expanded ? "Read less" : "Read more"}
                </button>
            </div>

            {/* Stat cards — scrollable on mobile, grid on large */}
            <div
                ref={scrollRef}
                className="mt-5 flex gap-3 overflow-x-auto lg:grid lg:grid-cols-4 pb-2"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {MARKET_STATS.map((stat) => (
                    <div key={stat.label} className="min-w-[200px] lg:min-w-0 flex-shrink-0 lg:flex-shrink rounded-2xl border border-gray-100 bg-[#F8F9FA] p-4">
                        <p className="text-[11px] text-gray-500 mb-1">{stat.label}</p>
                        <p className="text-[15px] font-bold text-gray-900">{stat.value}</p>
                        <p className={`mt-0.5 flex items-center gap-1 text-[12px] font-medium ${stat.neg ? "text-red-500" : "text-emerald-500"}`}>
                            {stat.neg ? <FiArrowDownLeft size={12} /> : <FiArrowUpRight size={12} />}
                            <span>{stat.change.replace(/[↘↗]/g, "").trim()}</span>
                        </p>
                        <Sparkline d={stat.spark} neg={stat.neg} />
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
