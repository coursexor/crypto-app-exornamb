import PageLayout from "../components/layout/PageLayout";
import Button from "../components/common/Button";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLivePrices from "../hooks/useLivePrices";
import CoinIcon from "../components/Trade/CoinIcon";
import "../components/PriceTicker/PriceTicker.css";
import oneImg from "../assets/zero_en-gb_2 (1).avif";
import baseAppImg from "../assets/base_app.png"; 
import coinClusterImg from "../assets/coin_cluster.avif";
import blog1Img from "../assets/blog1.avif"; 
import blog2Img from "../assets/blog2.png"; 
import blog3Img from "../assets/blog3.avif"; 
import advancedImg from "../assets/Advanced (8).png";
import Hero from "../assets/Hero.png";

export default function Home() {
    const navigate = useNavigate();
    // Live price ticker ref — attached to the dark card so the
    // IntersectionObserver only ticks while it is visible
    const tickerRef = useRef(null);
    const { coins: cryptos, isLoading: loading, error, changedFields } = useLivePrices(tickerRef);

    // HERO input functionality (email -> signup)
    const [email, setEmail] = useState("");
    const goSignup = () => navigate("/signup", { state: { email } });

    // Explore tabs
    const [activeTab, setActiveTab] = useState("Tradable");

    const getTabCoins = () => {
        if (!cryptos.length) return [];
        if (activeTab === "Top gainers") {
            return [...cryptos].sort((a, b) => b.changePercent - a.changePercent).slice(0, 6);
        }
        if (activeTab === "New on Coinbase") {
            return [...cryptos].slice(-6).reverse();
        }
        // Tradable — default order
        return cryptos.slice(0, 6);
    };

    // Flash class helpers
    const priceFlashClass = (symbol) => {
        const e = changedFields.get(symbol);
        if (!e?.price) return '';
        return e.price === 'up' ? 'flash-up' : 'flash-down';
    };
    const changeFlashClass = (symbol) => {
        const e = changedFields.get(symbol);
        if (!e?.change) return '';
        return e.change === 'up' ? 'flash-up' : 'flash-down';
    };


    return (
        <PageLayout>

        {/* HERO */}
        <section className="bg-white px-6 pt-14 pb-0">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-[52px] sm:text-[68px] lg:text-[80px] font-extrabold leading-[1.06] tracking-tight text-gray-900">
                    The future of finance is here.
                </h1>
                <p className="mt-5 text-[18px] text-gray-600">
                    Trade crypto and more on a platform you can trust.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="satoshi@nakamoto.com"
                        className="h-[52px] w-full sm:w-[290px] rounded-xl border border-gray-300 bg-white px-5 text-[15px] outline-none transition focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF]"
                    />
                    <button
                        onClick={goSignup}
                        className="h-[52px] whitespace-nowrap rounded-full bg-[#0052FF] px-8 text-[15px] font-semibold text-white transition hover:bg-[#0045D8]"
                    >
                        Sign up
                    </button>
                </div>

                <p className="mt-4 text-[13px] text-gray-400">
                    Stocks and prediction markets not available in your jurisdiction.
                </p>
            </div>

            {/* Full-width blue hero card */}
            <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-t-[32px] bg-[#1652F0]">
                <img
                    src={Hero}
                    alt="Coinbase App Preview"
                    className="w-full h-auto object-cover object-top"
                />
            </div>
        </section>



        {/* EXPLORE + COIN LIST */}
        <section className="bg-[#F2F4F7] pt-16 pb-0">
            <div className="mx-auto max-w-5xl px-6">
                {/* text + button above card */}
                <h2 className="text-[36px] sm:text-[44px] font-semibold tracking-tight text-gray-900">
                    Explore crypto like Bitcoin, Ethereum, and Dogecoin.
                </h2>
                <p className="mt-3 text-[15px] text-gray-500">
                    Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
                </p>
                <div className="mt-6 mb-10">
                    <Link to="/explore"
                        className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-[14px] font-semibold text-white hover:bg-neutral-800 transition">
                        See more assets
                    </Link>
                </div>
            </div>

            {/* Full-width dark card */}
            <div className="mx-auto max-w-5xl px-6 pb-16">
                <div className="rounded-[24px] bg-[#0A0B0D] overflow-hidden" ref={tickerRef}>
                    {/* Tabs */}
                    <div className="flex items-center gap-2 px-6 pt-6 pb-4">
                        {["Tradable", "Top gainers", "New on Coinbase"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition ${
                                    activeTab === tab
                                        ? "bg-white/15 text-white"
                                        : "text-white/50 hover:text-white"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Coin rows */}
                    <div>
                        {loading ? (
                            <div className="py-12 text-center text-[14px] text-white/40">Loading...</div>
                        ) : error ? (
                            <div className="py-12 text-center text-[14px] text-red-400">Error: {error}</div>
                        ) : (
                            getTabCoins().map((coin) => {
                                const isNeg = coin.changePercent < 0;
                                const changePct = `${Math.abs(coin.changePercent).toFixed(2)}%`;
                                return (
                                    <div
                                        key={coin.symbol}
                                        className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition cursor-pointer border-t border-white/5"
                                    >
                                        {/* Left: icon + name */}
                                        <div className="flex items-center gap-4">
                                            <CoinIcon symbol={coin.symbol} size={40} />
                                            <span className="text-[22px] font-semibold text-white">
                                                {coin.name}
                                            </span>
                                        </div>

                                        {/* Right: price on top, change below — flash classes per-field */}
                                        <div className="flex flex-col items-end gap-0.5">
                                            <p className={`text-[18px] font-semibold text-white inline-block rounded px-1 ${priceFlashClass(coin.symbol)}`}>
                                                GHS {coin.priceGhs.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </p>
                                            <p className={`text-[13px] font-medium inline-flex items-center gap-0.5 rounded px-1 ${isNeg ? "text-red-400" : "text-emerald-400"} ${changeFlashClass(coin.symbol)}`}>
                                                <span className="text-[17px] leading-none">{isNeg ? "↙" : "↗"}</span>
                                                {changePct}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </section>







        {/* ADVANCED TRADER */}
        <section className="bg-white py-16">
            <div className="mx-auto max-w-5xl px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2">
                {/* image */}
                <div className="overflow-hidden rounded-[28px] bg-black">
                    <img src={advancedImg} alt="Advanced Trade" className="w-full h-auto object-cover" />
                </div>

                {/* copy */}
                <div>
                <h3 className="text-[36px] sm:text-[42px] font-semibold tracking-tight text-gray-900 leading-[1.1]">
                    Powerful tools, designed for the advanced trader.
                </h3>

                <p className="mt-5 text-[15px] leading-7 text-gray-500">
                    Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading
                    experience. Tap into sophisticated charting capabilities, real-time order books, and deep liquidity
                    across hundreds of markets.
                </p>

                <div className="mt-8">
                    <Link to="/trade"
                    className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-neutral-800 transition">
                    Start trading
                    </Link>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* COINBASE ONE */}
        <section className="bg-white py-16">
            <div className="mx-auto max-w-5xl px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2">
                {/* text LEFT */}
                <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-[11px] font-semibold text-gray-700">
                    <span className="h-2.5 w-2.5 rounded-full bg-black" />
                    COINBASE ONE
                </span>

                <h3 className="mt-5 text-[36px] sm:text-[42px] font-semibold tracking-tight text-gray-900 leading-[1.1]">
                    Zero trading fees,
                    <br />
                    more rewards.
                </h3>

                <p className="mt-4 text-[15px] leading-7 text-gray-500">
                    Get more out of crypto with one membership: zero trading fees, boosted rewards,
                    priority support, and more.
                </p>

                <div className="mt-8">
                    <Link to="/signup"
                    className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-neutral-800 transition">
                    Claim free trial
                    </Link>
                </div>
                </div>

                {/* image RIGHT */}
                <div className="overflow-hidden rounded-[28px] bg-[#EEEEF0]">
                    <img src={oneImg} alt="Coinbase One" className="w-full h-auto object-cover" />
                </div>
            </div>
            </div>
        </section>

        {/* BASE APP */}
        <section className="bg-white py-16">
            <div className="mx-auto max-w-5xl px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2">
                {/* image LEFT */}
                <div className="overflow-hidden rounded-[28px] bg-[#EEEEF0]">
                    <img src={baseAppImg} alt="Base App" className="w-full h-auto object-cover" />
                </div>

                {/* text RIGHT */}
                <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-[11px] font-semibold text-gray-700">
                    <span className="h-2.5 w-2.5 rounded-full bg-black" />
                    BASE APP
                </span>

                <h3 className="mt-5 text-[36px] sm:text-[42px] font-semibold tracking-tight text-gray-900 leading-[1.1]">
                    Countless ways to earn crypto with the Base App.
                </h3>

                <p className="mt-4 text-[15px] leading-7 text-gray-500">
                    An everything app to trade, create, discover, and chat, all in one place.
                </p>

                <div className="mt-8">
                    <Link to="/learn"
                    className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-neutral-800 transition">
                    Learn more
                    </Link>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* NEW TO CRYPTO */}
        <section className="bg-[#F2F4F7] py-14">
            <div className="mx-auto max-w-5xl px-6">

            {/* Header row: left heading / right text+button */}
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
                <h3 className="text-[36px] sm:text-[42px] font-semibold leading-[1.1] tracking-tight text-gray-900">
                    New to crypto? Learn some crypto basics
                </h3>

                <div>
                <p className="text-[15px] leading-7 text-gray-500">
                    Beginner guides, practical tips, and market updates for first-timers,
                    experienced investors, and everyone in between
                </p>
                <div className="mt-6">
                    <Link to="/learn"
                    className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-neutral-800 transition">
                    Read More
                    </Link>
                </div>
                </div>
            </div>

            {/* 3 article cards */}
            <div className="mt-10 grid gap-6 md:grid-cols-3">
                {[
                { image: blog1Img, title: "USDC: The digital dollar for the global crypto economy",
                  excerpt: "Coinbase believes crypto will be part of the solution for creating an open financial system that is both more efficient and more equitable..." },
                { image: blog2Img, title: "Can crypto really replace your bank account?",
                  excerpt: "If you're a big enough fan of crypto, you've probably heard the phrase \"be your own bank\" or the term \"bankless\" — the idea being that..." },
                { image: blog3Img, title: "When is the best time to invest in crypto?",
                  excerpt: "Cryptocurrencies like Bitcoin can experience daily (or even hourly) price volatility. As with any kind of investment, volatility may cause..." },
                ].map((card, i) => (
                <Link key={i} to="/learn" className="group block overflow-hidden rounded-[20px] bg-transparent">
                    <div className="overflow-hidden rounded-[16px] aspect-[4/3]">
                    <img src={card.image} alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                    </div>
                    <div className="pt-4">
                    <p className="text-[16px] font-semibold text-gray-900 underline underline-offset-2 leading-snug group-hover:text-[#0052FF] transition">
                        {card.title}
                    </p>
                    <p className="mt-2 text-[13px] leading-6 text-gray-500">{card.excerpt}</p>
                    </div>
                </Link>
                ))}
            </div>

            </div>
        </section>

        {/* ✅ NEW: TAKE CONTROL section */}
        <section className="bg-white py-24">
            <div className="mx-auto max-w-6xl px-4">
            <div className="grid items-center gap-14 lg:grid-cols-2">
                {/* left */}
                <div className="mx-auto max-w-md text-center lg:text-left">
                <h3 className="text-5xl font-semibold leading-tight tracking-tight text-gray-900">
                    Take control
                    <br />
                    of your money
                </h3>

                <p className="mt-4 text-sm text-gray-600">
                    Start your portfolio today and discover crypto
                </p>

                <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                    defaultValue="satoshi@nakamoto.com"
                    className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-[#0052FF]"
                    />
                    <button
                    onClick={() => navigate("/signup")}
                    className="h-11 shrink-0 rounded-full bg-[#0052FF] px-6 text-sm font-semibold text-white hover:bg-[#0146d6]"
                    >
                    Sign up
                    </button>
                </div>
                </div>

                {/* right image */}
                <div className="flex justify-center lg:justify-end">
                <img
                    src={coinClusterImg}
                    alt="Crypto icons"
                    className="w-full max-w-md object-contain"
                />
                </div>
            </div>

            {/* ✅ disclaimer ABOVE footer */}
            <div className="mt-24 text-center text-[11px] leading-5 text-gray-500">
                <p>DEX trading is offered by Coinbase Bermuda Technologies Ltd.</p>
                <p className="mt-2">
                Products and features may not be available in all regions. Information is for informational purposes only,
                and is not (i) an offer, or solicitation of an offer, to invest in, or to buy or sell, any interests or shares,
                or to participate in any investment or trading strategy or (ii) intended to provide accounting, legal, or tax advice,
                or investment recommendations. Trading cryptocurrency comes with risk.
                </p>
            </div>
            </div>
        </section>
        </PageLayout>
    );
}

/* ---------- small components ---------- */

function CoinRow({ name, symbol, price, change, image, negative, priceColorClass = "text-white" }) {
    return (
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <img src={image} alt={name} className="h-8 w-8 rounded-full" />
            <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-[11px] text-white/60">{symbol}</p>
            </div>
        </div>

        <div className="text-right">
            <p className={`text-sm font-semibold transition-colors duration-300 ${priceColorClass}`}>{price}</p>
            <p className={`text-[11px] ${negative ? "text-red-400" : "text-emerald-400"}`}>
            {change}
            </p>
        </div>
        </div>
    );
}

function BlogCard({ image, title, excerpt, to }) {
    return (
        <Link to={to} className="group block">
        <div className="overflow-hidden rounded-2xl bg-white/0">
            <img
            src={image}
            alt={title}
            className="h-[140px] w-full rounded-2xl object-cover"
            />
        </div>

        <h4 className="mt-4 text-sm font-semibold text-gray-900 group-hover:underline">
            {title}
        </h4>
        <p className="mt-2 text-xs leading-5 text-gray-600">{excerpt}</p>
        </Link>
    );
}