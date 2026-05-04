import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import { NEW_COINS } from "../../data/exploreData";
import prcl from "../../assets/prcl.png";
import fai from "../../assets/fai.png";
import nuxPopularAssets from "../../assets/nuxPopularAssets-5.svg";

// Displays the side panel with action cards, top movers, and new coin listings
export default function RightSidebar() {
    const navigate = useNavigate();
    const [newIndex, setNewIndex] = useState(0);

    return (
        <div className="hidden lg:block w-[280px] flex-shrink-0 space-y-4 pt-0">
            {/* Get started card */}
            <div className="relative overflow-hidden rounded-[20px] bg-[#0052FF] p-3 h-[120px] flex flex-col justify-between">
                <div className="relative z-10 space-y-1.5">
                    <h3 className="text-m font-bold text-white leading-tight">Get started</h3>
                    <p className="text-[10px] font-medium text-white">Create your account today</p>
                </div>
                
                <div className="relative z-10 mt-auto">
                    <button
                        onClick={() => navigate("/signup")}
                        className="rounded-full bg-[#e5e7eb] px-3 py-1.5 text-[10px] font-bold text-gray-900 hover:bg-white transition-colors"
                    >
                        Sign up
                    </button>
                </div>

                {/* Decorative graphic */}
                <div className="absolute top-20 -translate-y-30 -right-0 w-[80px] h-[80px] pointer-events-none">
                    <img 
                        src={nuxPopularAssets}
                        alt=""
                        className="h-50 w-50 object-contain"
                    />
                </div>
            </div>

            {/* Top movers */}
            <div className="rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-gray-900">Top movers</p>
                <div className="flex gap-1">
                <button className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
                </div>
            </div>
            <p className="text-xs text-gray-400 mb-3">24hr change</p>
            <div className="grid grid-cols-2 gap-2">
                {[
                { symbol: "PRCL", price: "GHS 0.21", change: "34.39%", pos: true,  icon: prcl },
                { symbol: "FAI",  price: "GHS 0.0653",change: "31.02%", pos: false, icon: fai },
                ].map((m) => (
                <div key={m.symbol} className="rounded-xl bg-gray-50 p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 text-sm mb-2">
                    <img
                    src={m.icon}
                    />
                    </div>
                    <p className="text-xs font-bold text-gray-900">{m.symbol}</p>
                    <p className={`text-sm font-bold mt-0.5 ${m.pos ? "text-emerald-500" : "text-red-500"}`}>
                        {(m.symbol === "PRCL")? <FiArrowUpRight size={14} /> : <FiArrowDownLeft size={14} />} {m.change}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{m.price}</p>
                </div>
                ))}
            </div>
            </div>

            {/* New on Coinbase */}
            <div className="rounded-2xl border border-gray-100 p-4">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <p className="font-bold text-gray-900 text-sm">New on Coinbase</p>

                <div className="flex gap-1">

                {/* LEFT */}
                <button
                    onClick={() =>
                    setNewIndex((prev) =>
                        prev === 0 ? NEW_COINS.length - 2 : prev - 1
                    )
                    }
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
                >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>

                {/* RIGHT */}
                <button
                    onClick={() =>
                    setNewIndex((prev) =>
                        (prev + 1) % (NEW_COINS.length - 1)
                    )
                    }
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
                >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>

                </div>
            </div>

            {/* Cards */}
            <div className="flex gap-3">

                {NEW_COINS.slice(newIndex, newIndex + 2).map((coin) => (

                <div
                    key={coin.label}
                    className="flex-1 rounded-2xl bg-gray-100 p-4 cursor-pointer hover:bg-gray-200 transition"
                >

                    <img
                    src={coin.icon}
                    alt={coin.name}
                    className="h-10 w-10 rounded-full mb-3"
                    />

                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {coin.label}
                    </p>

                    <p className="text-sm font-bold text-gray-900">
                    {coin.name}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                    {coin.date}
                    </p>

                </div>

                ))}

            </div>
            </div>
        </div>
    );
}
