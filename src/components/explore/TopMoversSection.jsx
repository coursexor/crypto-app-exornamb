import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TOP_MOVERS, NEW_COINS } from "../../data/exploreData";


function TopMoverCard({ coin }) {
    const navigate = useNavigate();
    const change = coin.change24h || parseFloat(coin.change?.replace('%', '')) || 0;
    const isNeg = change < 0;
    const price = coin.price?.toString().startsWith('GHS') ? coin.price : `GHS ${coin.price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const image = coin.image || coin.icon;

    return (
        <div 
            onClick={() => navigate("/asset-details")}
            className="min-w-[155px] flex-shrink-0 rounded-2xl border border-gray-100 bg-white p-4 hover:shadow-md transition-shadow cursor-pointer"
        >
            <img src={image} alt={coin.symbol} className="h-9 w-9 rounded-full object-cover mb-3" />
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{coin.symbol}</p>
            <p className={`mt-1 flex items-center gap-0.5 text-[14px] font-bold ${isNeg ? "text-red-500" : "text-emerald-600"}`}>
                {isNeg ? "↘" : "↗"} {Math.abs(change).toFixed(2)}%
            </p>
            <p className="text-[12px] text-gray-400 mt-0.5">{price}</p>
        </div>
    );
}

function NewListingCard({ coin }) {
    const navigate = useNavigate();
    const image = coin.image || coin.icon;
    const dateStr = coin.date || (coin.createdAt ? new Date(coin.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "");
    const symbol = coin.symbol || coin.label;

    return (
        <div 
            onClick={() => navigate("/asset-details")}
            className="min-w-[155px] flex-shrink-0 rounded-2xl border border-gray-100 bg-white p-4 hover:shadow-md transition-shadow cursor-pointer"
        >
            <img src={image} alt={coin.name} className="h-9 w-9 rounded-full object-cover mb-3" />
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{symbol}</p>
            <p className="text-[14px] font-bold text-gray-900 leading-tight truncate">{coin.name}</p>
            <p className="text-[12px] text-gray-400 mt-1">{dateStr.startsWith('Added') ? dateStr : `Added ${dateStr}`}</p>
        </div>
    );
}

function ScrollableRow({ title, subtitle, children }) {
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
    }, [children]);

    const scroll = (dir) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * 320, behavior: "smooth" });
    };

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-[18px] font-bold text-gray-900">{title}</h2>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => scroll(-1)}
                        disabled={!canScrollLeft}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 transition disabled:opacity-25"
                    >
                        <span className="text-[18px]">←</span>
                    </button>
                    <button
                        onClick={() => scroll(1)}
                        disabled={!canScrollRight}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 transition disabled:opacity-25"
                    >
                        <span className="text-[18px]">→</span>
                    </button>
                </div>
            </div>
            {subtitle && <p className="text-[13px] text-gray-400 mb-4">{subtitle}</p>}
            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto scrollbar-none pb-2"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {children}
            </div>
        </div>
    );
}

export default function TopMoversSection() {
    const [gainers, setGainers] = useState([]);
    const [newListings, setNewListings] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/crypto/gainers`, { withCredentials: true })
            .then(res => {
                if (res.data && res.data.length > 0) setGainers(res.data);
                else setGainers(TOP_MOVERS);
            })
            .catch(err => {
                console.error("Failed to fetch gainers:", err);
                setGainers(TOP_MOVERS);
            });

        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/crypto/new`, { withCredentials: true })
            .then(res => {
                if (res.data && res.data.length > 0) setNewListings(res.data);
                else setNewListings(NEW_COINS);
            })
            .catch(err => {
                console.error("Failed to fetch new listings:", err);
                setNewListings(NEW_COINS);
            });
    }, []);

    return (
        <div>
            {gainers.length > 0 && (
                <ScrollableRow title="Top movers" subtitle="24hr change">
                    {gainers.map(coin => (
                        <TopMoverCard key={coin._id || coin.symbol} coin={coin} />
                    ))}
                </ScrollableRow>
            )}

            {newListings.length > 0 && (
                <ScrollableRow title="New on Coinbase">
                    {newListings.map(coin => (
                        <NewListingCard key={coin._id || coin.symbol} coin={coin} />
                    ))}
                </ScrollableRow>
            )}
        </div>
    );
}
