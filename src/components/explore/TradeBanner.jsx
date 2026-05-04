import { useNavigate } from "react-router-dom";
import tradeChart from "../../assets/trade-banner-chart.svg";
import mobileTradeChart from "../../assets/mobile-trade-chart.svg";

// Renders a promotional banner encouraging users to sign up and start trading
export default function TradeBanner() {
    const navigate = useNavigate();

    return (
        <>
            {/* Desktop: full-width blue banner */}
            <div className="hidden sm:block w-full bg-[#0052FF] py-10">
                <div className="mx-auto max-w-[1100px] px-6 flex flex-row items-center justify-between gap-8">
                    <div className="text-left flex-1">
                        <h3 className="text-[22px] sm:text-[26px] font-semibold text-white leading-snug">
                            Create a Coinbase account to trade crypto.<br />
                            It&rsquo;s quick, easy, and secure.
                        </h3>
                        <button
                            onClick={() => navigate("/signup")}
                            className="mt-6 inline-flex items-center justify-between rounded-full bg-white px-8 py-4 text-[16px] font-semibold text-gray-900 hover:bg-gray-50 transition-all min-w-[320px]"
                        >
                            Start Trading
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                    </div>

                    <div className="flex-shrink-0 mr-4 sm:mr-8 lg:mr-16">
                        <img src={tradeChart} alt="Trading chart" className="h-[140px] w-auto object-contain" />
                    </div>
                </div>
            </div>

            {/* Mobile: card style */}
            <div className="sm:hidden mx-4 my-6">
                <div className="rounded-2xl bg-[#0052FF] p-6 relative overflow-hidden">
                    {/* Image — center-right */}
                    <div className="absolute right-[-10px] top-1/2 -translate-y-1/2">
                        <img src={mobileTradeChart} alt="Mobile trading chart" className="h-[120px] w-auto object-contain" />
                    </div>

                    <p className="text-[13px] font-bold text-white/80 uppercase tracking-wide mb-1 relative z-10">Get started</p>
                    <p className="text-[15px] font-semibold text-white leading-snug mb-5">
                        Create your account today
                    </p>
                    <button
                        onClick={() => navigate("/signup")}
                        className="rounded-full bg-white px-6 py-2.5 text-[14px] font-bold text-gray-900 hover:bg-gray-50 transition"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </>
    );
}
