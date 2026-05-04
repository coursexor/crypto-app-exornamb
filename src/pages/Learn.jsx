import { ArrowRight } from "lucide-react";
import PageLayout from "../components/layout/PageLayout";
import featuredVideo from "../assets/blog_featured.png";
import headWithStar from "../assets/crypto1.png";
import halfWithHalf from "../assets/tips.png";
import hydraulics from "../assets/trading2.png";
import futuresIcon from "../assets/futures.png";
import cryptoBasics1 from "../assets/blog1.avif";
import cryptoBasics2 from "../assets/blog2.png";
import cryptoBasics3 from "../assets/blog3.avif";
import cryptoBasics4 from "../assets/blog_defi.png";
import cryptoBasics5 from "../assets/blog_stablecoin.png";
import cryptoBasics6 from "../assets/blog_fud.png";
import tips1 from "../assets/blog_donate.png";
import tips2 from "../assets/blog_wallet_setup.png";
import tips3 from "../assets/blog_featured.png";
import tips4 from "../assets/blog_retirement.png";

import advanced1 from "../assets/blog_techanalysis.png";
import advanced2 from "../assets/blog_futuresdata.png";
import advanced3 from "../assets/blog_tradingcharts.png";
import advanced4 from "../assets/blog_orderbook.png";

import futures1 from "../assets/blog_futures_intro.png";
import futures2 from "../assets/blog_futures_fund.png";
import futures3 from "../assets/blog_futures_open.png";
import futures4 from "../assets/blog_futures_strat.png";

import wallet1 from "../assets/blog_walletdiff.png";
import wallet2 from "../assets/blog_wallet_setup.png";
import wallet3 from "../assets/blog_walletadd.png";
import wallet4 from "../assets/blog_walletsend.webp";

function Learn() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-[1260px]">
          {/* HERO */}
          <section className="px-10 pb-[53px] pt-[106px] text-center">
            <h1 className="mx-auto max-w-[1100px] text-3xl md:text-5xl lg:text-[53px] font-semibold leading-tight tracking-[-0.03em] text-black px-4">
              Crypto questions, answered
            </h1>

            <p className="mx-auto mt-[18px] text-[20px] text-[#5b616e]">
              Beginner guides, practical tips, and market updates for first-timers,
              experienced investors, and everyone in between
            </p>
          </section>

          {/* FEATURED + POPULAR */}
          <section className="px-6 md:px-10 pb-[88px] pt-0">
            <div className="grid grid-cols-1 gap-10 lg:gap-[88px] lg:grid-cols-[1.5fr_0.5fr]">
              {/* LEFT SIDE */}
              <div>
                <h2 className="mb-[35px] text-[22px] font-semibold text-black">
                  Featured
                </h2>

                {/* Featured image */}
                <div className="relative overflow-hidden">
                  <img
                    src={featuredVideo}
                    alt="Tutorial featured image"
                    className="h-[440px] w-full object-cover"
                  />
                </div>

                <p className="mt-[35px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                  VIDEO TUTORIAL
                </p>

                <h3 className="mt-[18px] text-[24px] md:text-[31px] font-semibold leading-[1.2] text-black">
                  When is the best time to invest in crypto?
                </h3>

                <p className="mt-[22px] max-w-[650px] text-[18px] leading-[1.5] text-[#5b616e]">
                  When prices are fluctuating, how do you know when to buy? Learn
                  more about using dollar-cost averaging to weather price
                  volatility.
                </p>
              </div>

              {/* RIGHT SIDE */}
              <div>
                <h2 className="mb-[35px] text-[22px] font-semibold text-black">
                  Popular
                </h2>

                <div className="space-y-[44px]">
                  <div>
                    <p className="text-[12px] font-semibold tracking-wider text-[#6b7280]">
                      BEGINNER'S GUIDE
                    </p>
                    <h3 className="mt-[13px] text-[20px] font-semibold leading-tight text-black">
                      What is cryptocurrency?
                    </h3>
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold tracking-wider text-[#6b7280]">
                      GETTING STARTED
                    </p>
                    <h3 className="mt-[13px] text-[20px] font-semibold leading-tight text-black">
                      How to earn crypto rewards
                    </h3>
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold tracking-wider text-[#6b7280]">
                      GETTING STARTED
                    </p>
                    <h3 className="mt-[13px] text-[20px] font-semibold leading-tight text-black">
                      How to add crypto to your Coinbase Wallet
                    </h3>
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold tracking-wider text-[#6b7280]">
                      YOUR CRYPTO
                    </p>
                    <h3 className="mt-[13px] text-[20px] font-semibold leading-tight text-black">
                      Tax forms, explained: A guide to U.S. tax forms and crypto
                      reports
                    </h3>
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold tracking-wider text-[#6b7280]">
                      GETTING STARTED
                    </p>
                    <h3 className="mt-[13px] text-[20px] font-semibold leading-tight text-black">
                      Beginner’s guide to dapps
                    </h3>
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold tracking-wider text-[#6b7280]">
                      MARKET UPDATE
                    </p>
                    <h3 className="mt-[13px] text-[20px] font-semibold leading-tight text-black">
                      Everything you need to know about the first-ever U.S. Bitcoin
                      ETF
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CATEGORY ROW */}
          <section className="px-6 md:px-10 pb-[88px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[44px]">
              <div className="flex items-center gap-[22px]">
                <div className="flex h-[88px] w-[88px] items-center justify-center">
                  <img src={headWithStar} alt="" className="h-auto w-full" />
                </div>
                <div>
                  <p className="text-[26px] font-semibold">Crypto basics</p>
                  <p className="flex items-center gap-1 text-[22px] text-[#6b7280]">
                    See more <ArrowRight size={22} />
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-[22px]">
                <div className="flex h-[88px] w-[88px] items-center justify-center">
                  <img src={halfWithHalf} alt="" className="h-auto w-full" />
                </div>
                <div>
                  <p className="text-[26px] font-semibold">Tips and tutorials</p>
                  <p className="flex items-center gap-1 text-[22px] text-[#6b7280]">
                    See more <ArrowRight size={22} />
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-[22px]">
                <div className="flex h-[88px] w-[88px] items-center justify-center">
                  <img src={hydraulics} alt="" className="h-auto w-full" />
                </div>
                <div>
                  <p className="text-[26px] font-semibold">Advanced trading</p>
                  <p className="flex items-center gap-1 text-[22px] text-[#6b7280]">
                    See more <ArrowRight size={22} />
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-[22px]">
                <div className="flex h-[88px] w-[88px] items-center justify-center">
                  <img src={futuresIcon} alt="" className="h-auto w-full" />
                </div>
                <div>
                  <p className="text-[26px] font-semibold">Futures</p>
                  <p className="flex items-center gap-1 text-[22px] text-[#6b7280]">
                    See more <ArrowRight size={22} />
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CRYPTO BASICS SECTION */}
          <section className="border-t border-[#e5e7eb] px-6 md:px-10 py-[70px] md:py-[106px]">
            <div className="mx-auto max-w-[1430px]">
              {/* Section header */}
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl lg:text-[53px] font-semibold tracking-[-0.02em] text-black">
                  Crypto basics
                </h2>

                <p className="mx-auto mt-[13px] max-w-[800px] text-[20px] text-[#5b616e]">
                  New to crypto? Not for long — start with these guides and explainers
                </p>
              </div>

              {/* FEATURED ARTICLES */}
              <div className="mt-[70px] grid grid-cols-1 gap-[53px] lg:grid-cols-2">
                {/* Card 1 */}
                <div>
                  <div className="overflow-hidden">
                    <img
                      src={cryptoBasics1}
                      alt="Bitcoin guide"
                      className="h-[330px] w-full object-cover"
                    />
                  </div>

                  <p className="mt-[22px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                    BEGINNER'S GUIDE
                  </p>

                  <h3 className="mt-[9px] text-[33px] font-semibold leading-[1.2] text-black">
                    What is Bitcoin?
                  </h3>

                  <p className="mt-[13px] max-w-[530px] text-[19px] leading-[1.5] text-[#5b616e]">
                    Bitcoin is the world's first widely adopted cryptocurrency — it allows
                    for secure and seamless peer-to-peer transactions on the internet.
                  </p>
                </div>

                {/* Card 2 */}
                <div>
                  <div className="overflow-hidden">
                    <img
                      src={cryptoBasics2}
                      alt="DeFi guide"
                      className="h-[330px] w-full object-cover"
                    />
                  </div>

                  <p className="mt-[22px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                    BEGINNER'S GUIDE
                  </p>

                  <h3 className="mt-[9px] text-[33px] font-semibold leading-[1.2] text-black">
                    Guide to DeFi tokens and altcoins
                  </h3>

                  <p className="mt-[13px] max-w-[530px] text-[19px] leading-[1.5] text-[#5b616e]">
                    From Aave to Zcash, decide what to trade with our beginner's guide.
                  </p>
                </div>
              </div>

              {/* SMALL ARTICLE GRID */}
              <div className="mt-[62px] grid grid-cols-1 gap-[35px] md:grid-cols-2 lg:grid-cols-4">
                {/* Item 1 */}
                <div>
                  <img
                    src={cryptoBasics3}
                    alt="Ethereum guide"
                    className="h-[300px] w-full object-cover"
                  />

                  <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                    BEGINNER'S GUIDE
                  </p>

                  <h4 className="mt-[9px] text-[24px] font-semibold leading-[1.3] text-black">
                    What is Ethereum?
                  </h4>
                </div>

                {/* Item 2 */}
                <div>
                  <img
                    src={cryptoBasics4}
                    alt="DeFi definition"
                    className="h-[300px] w-full object-cover"
                  />

                  <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                    KEY TERM
                  </p>

                  <h4 className="mt-[9px] text-[24px] font-semibold leading-[1.3] text-black">
                    What is DeFi?
                  </h4>
                </div>

                {/* Item 3 */}
                <div>
                  <img
                    src={cryptoBasics5}
                    alt="Stablecoin"
                    className="h-[300px] w-full object-cover"
                  />

                  <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                    BEGINNER'S GUIDE
                  </p>

                  <h4 className="mt-[9px] text-[24px] font-semibold leading-[1.3] text-black">
                    What is a stablecoin?
                  </h4>
                </div>

                {/* Item 4 */}
                <div>
                  <img
                    src={cryptoBasics6}
                    alt="Crypto slang"
                    className="h-[300px] w-full object-cover"
                  />

                  <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                    GLOSSARY
                  </p>

                  <h4 className="mt-[9px] text-[24px] font-semibold leading-[1.3] text-black max-w-[260px]">
                    Don’t let FUD give you FOMO or you’ll end up REKT — crypto slang, explained
                  </h4>
                </div>
              </div>

              {/* BUTTON */}
              <div className="mt-[70px] flex justify-center">
                <button className="flex items-center gap-2 rounded-[10px] bg-[#1652f0] px-[24px] py-[10px] text-[15px] font-semibold text-white">
                  See more crypto basics
                  <span className="text-[18px]">›</span>
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* WHAT IS SECTION */}
        <section className="bg-[#f4f6f8] px-10 py-[106px]">
          <div className="mx-auto max-w-[1430px] text-center">
            {/* Title */}
            <h2 className="text-3xl md:text-5xl lg:text-[53px] font-semibold tracking-[-0.02em] text-black">
              What is...
            </h2>

            {/* Terms centered container - 2 rows (8+8) */}
            <div className="mx-auto mt-[62px] grid max-w-[1430px] grid-cols-2 gap-[16px] md:grid-cols-4 lg:grid-cols-8">
              {[
                "Bitcoin",
                "Blockchain",
                "Cardano",
                "Crypto wallet",
                "DeFi",
                "Ethereum",
                "Fork",
                "Inflation",
                "Market cap",
                "NFT",
                "Private key",
                "Protocol",
                "Smart contract",
                "Token",
                "Volatility memecoin",
                "Web3",
              ].map((term) => (
                <button
                  key={term}
                  className="flex h-[76px] w-full items-center justify-center rounded-[12px] bg-white px-2 text-center text-[17px] font-medium text-black shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all hover:bg-[#fcfcfc] hover:shadow-[0_6px_28px_rgba(0,0,0,0.08)]"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Button */}
            <div className="mt-[70px]">
              <button className="rounded-[10px] bg-[#1652f0] px-[24px] py-[10px] text-[15px] font-semibold text-white transition-colors hover:bg-[#0a46e1]">
                See more
              </button>
            </div>
          </div>
        </section>

        {/* TIPS AND TUTORIALS */}
        <section className="border-t border-[#e5e7eb] px-10 py-[106px]">
          <div className="mx-auto max-w-[1100px]">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl lg:text-[53px] font-semibold tracking-[-0.02em] text-black">
                Tips and tutorials
              </h2>
              <p className="mx-auto mt-[13px] max-w-[620px] text-[20px] text-[#5b616e]">
                Get practical, step-by-step answers to all things crypto
              </p>
            </div>

            <div className="mt-[70px] grid grid-cols-1 gap-[44px] md:grid-cols-2">
              <div>
                <img
                  src={tips1}
                  alt="How to donate crypto"
                  className="h-[283px] w-full object-cover"
                />
                <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                  GETTING STARTED
                </p>
                <h3 className="mt-2 text-[26px] font-semibold leading-[1.3] text-black">
                  How to donate crypto
                </h3>
              </div>

              <div>
                <div className="relative">
                  <img
                    src={tips2}
                    alt="How to set up a crypto wallet"
                    className="h-[283px] w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/35 text-[28px] text-white">
                      ▶
                    </div>
                  </div>
                </div>
                <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                  VIDEO TUTORIAL
                </p>
                <h3 className="mt-2 text-[26px] font-semibold leading-[1.3] text-black">
                  How to set up a crypto wallet
                </h3>
              </div>

              <div>
                <div className="relative">
                  <img
                    src={tips3}
                    alt="When is the best time to invest in crypto?"
                    className="h-[283px] w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/35 text-[28px] text-white">
                      ▶
                    </div>
                  </div>
                </div>
                <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                  VIDEO TUTORIAL
                </p>
                <h3 className="mt-2 text-[26px] font-semibold leading-[1.3] text-black">
                  When is the best time to invest in crypto?
                </h3>
              </div>

              <div>
                <img
                  src={tips4}
                  alt="How to invest in crypto via your retirement account"
                  className="h-[283px] w-full object-cover"
                />
                <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                  YOUR CRYPTO
                </p>
                <h3 className="mt-2 text-[26px] font-semibold leading-[1.3] text-black">
                  How to invest in crypto via your retirement account
                </h3>
              </div>
            </div>

            <div className="mt-[70px] flex justify-center">
              <button className="flex items-center gap-2 rounded-[10px] bg-[#1652f0] px-[24px] py-[10px] text-[15px] font-semibold text-white">
                See more tips and tutorials
                <span className="text-[18px]">›</span>
              </button>
            </div>
          </div>
        </section>
        {/* ADVANCED TRADING */}
        <section className="border-t border-[#e5e7eb] px-6 md:px-10 py-[70px] md:py-[106px]">
          <div className="mx-auto max-w-[1100px]">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl lg:text-[53px] font-semibold tracking-[-0.02em] text-black">
                Advanced trading
              </h2>

              <p className="mx-auto mt-[13px] max-w-[620px] text-[20px] text-[#5b616e]">
                Ready to advance? Learn the tools and terminology you need to take
                control of your trades.
              </p>
            </div>

            {/* Grid */}
            <div className="mt-[70px] grid grid-cols-1 gap-[44px] md:grid-cols-2">
              {/* Card 1 */}
              <div>
                <img
                  src={advanced1}
                  alt="Technical analysis"
                  className="h-[283px] w-full object-cover"
                />

                <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                  KEY TERM
                </p>

                <h3 className="mt-2 text-[26px] font-semibold leading-[1.3] text-black">
                  What is technical analysis?
                </h3>
              </div>

              {/* Card 2 */}
              <div>
                <img
                  src={advanced2}
                  alt="Futures market data"
                  className="h-[283px] w-full object-cover"
                />

                <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                  ADVANCED GUIDE
                </p>

                <h3 className="mt-2 text-[26px] font-semibold leading-[1.3] text-black">
                  How can I use crypto futures market data for spot trading?
                </h3>
              </div>

              {/* Card 3 */}
              <div>
                <div className="relative">
                  <img
                    src={advanced3}
                    alt="Advanced trading charts"
                    className="h-[283px] w-full object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/35 text-[28px] text-white">
                      ▶
                    </div>
                  </div>
                </div>

                <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                  ADVANCED GUIDE
                </p>

                <h3 className="mt-2 text-[26px] font-semibold leading-[1.3] text-black">
                  How to read advanced trading charts
                </h3>
              </div>

              {/* Card 4 */}
              <div>
                <img
                  src={advanced4}
                  alt="Order book"
                  className="h-[283px] w-full object-cover"
                />

                <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                  KEY TERM
                </p>

                <h3 className="mt-2 text-[26px] font-semibold leading-[1.3] text-black">
                  What is an order book?
                </h3>
              </div>
            </div>

            {/* Button */}
            <div className="mt-[70px] flex justify-center">
              <button className="flex items-center gap-2 rounded-[10px] bg-[#1652f0] px-[24px] py-[10px] text-[15px] font-semibold text-white">
                See more advanced trading
                <span className="text-[18px]">›</span>
              </button>
            </div>
          </div>
        </section>

        {/* FUTURES */}
        <section className="border-t border-[#e5e7eb] px-6 md:px-10 py-[70px] md:py-[106px]">
          <div className="mx-auto max-w-[1100px]">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl lg:text-[53px] font-semibold tracking-[-0.02em] text-black">
                Futures
              </h2>
              <p className="mx-auto mt-[13px] max-w-[620px] text-[20px] text-[#5b616e]">
                New to futures trading? Get up to speed on the basics.
              </p>
            </div>

            <div className="mt-[70px] grid grid-cols-1 gap-[44px] md:grid-cols-2">
              <div>
                <img
                  src={futures1}
                  alt="Futures introductions and origins"
                  className="h-[283px] w-full object-cover"
                />
                <h3 className="mt-[18px] text-[26px] font-semibold leading-[1.3] text-black">
                  Futures: Introductions and origins
                </h3>
              </div>

              <div>
                <img
                  src={futures2}
                  alt="Futures fundamentals"
                  className="h-[283px] w-full object-cover"
                />
                <h3 className="mt-[18px] text-[26px] font-semibold leading-[1.3] text-black">
                  Futures fundamentals: Understanding the basics
                </h3>
              </div>

              <div>
                <img
                  src={futures3}
                  alt="Opening, holding, and closing a position"
                  className="h-[283px] w-full object-cover"
                />
                <h3 className="mt-[18px] text-[26px] font-semibold leading-[1.3] text-black">
                  Opening, holding, and closing a position in the futures market
                </h3>
              </div>

              <div>
                <img
                  src={futures4}
                  alt="Trading strategies"
                  className="h-[283px] w-full object-cover"
                />
                <h3 className="mt-[18px] text-[26px] font-semibold leading-[1.3] text-black">
                  Trading strategies: Speculating, hedging, and spreading in the
                  futures market
                </h3>
              </div>
            </div>

            <div className="mt-[70px] flex justify-center">
              <button className="flex items-center gap-2 rounded-[10px] bg-[#1652f0] px-[24px] py-[10px] text-[15px] font-semibold text-white">
                See more about futures
                <span className="text-[18px]">›</span>
              </button>
            </div>
          </div>
        </section>

        {/* ALL THINGS WALLET */}
        <section className="border-t border-[#e5e7eb] px-6 md:px-10 py-[70px] md:py-[106px]">
          <div className="mx-auto max-w-[1100px]">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl lg:text-[53px] font-semibold tracking-[-0.02em] text-black">
                All Things Wallet
              </h2>
              <p className="mx-auto mt-[13px] max-w-[620px] text-[20px] text-[#5b616e]">
                Earn yield, dive into crypto apps, control your holdings, and much
                more
              </p>
            </div>

            <div className="mt-[70px] grid grid-cols-1 gap-[44px] md:grid-cols-2">
              <div>
                <img
                  src={wallet1}
                  alt="Coinbase and Coinbase Wallet"
                  className="h-[283px] w-full object-cover"
                />
                <h3 className="mt-[18px] text-[26px] font-semibold leading-[1.3] text-black">
                  What’s the difference between Coinbase and Coinbase Wallet?
                </h3>
                <p className="mt-3 text-[18px] leading-[1.45] text-[#5b616e]">
                  And how can a wallet help me access NFTs or DeFi? Your
                  self-custody wallet questions, answered
                </p>
              </div>

              <div>
                <div className="relative">
                  <img
                    src={wallet2}
                    alt="How to set up a crypto wallet"
                    className="h-[283px] w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/35 text-[28px] text-white">
                      ▶
                    </div>
                  </div>
                </div>
                <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                  VIDEO TUTORIAL
                </p>
                <h3 className="mt-2 text-[26px] font-semibold leading-[1.3] text-black">
                  How to set up a crypto wallet
                </h3>
                <p className="mt-3 text-[18px] leading-[1.45] text-[#5b616e]">
                  Learn how to setup and get started with a crypto wallet.
                </p>
              </div>

              <div>
                <img
                  src={wallet3}
                  alt="How to add crypto to your Coinbase Wallet"
                  className="h-[283px] w-full object-cover"
                />
                <p className="mt-[18px] text-[12px] font-semibold tracking-wider text-[#6b7280]">
                  GETTING STARTED
                </p>
                <h3 className="mt-2 text-[26px] font-semibold leading-[1.3] text-black">
                  How to add crypto to your Coinbase Wallet
                </h3>
                <p className="mt-3 text-[18px] leading-[1.45] text-[#5b616e]">
                  A quick guide on how to add crypto to your Coinbase
                  self-custody wallet.
                </p>
              </div>

              <div>
                <img
                  src={wallet4}
                  alt="How to send or receive crypto using Coinbase Wallet"
                  className="h-[283px] w-full object-cover"
                />
                <h3 className="mt-[18px] text-[26px] font-semibold leading-[1.3] text-black">
                  How to send or receive crypto using Coinbase Wallet
                </h3>
                <p className="mt-3 text-[18px] leading-[1.45] text-[#5b616e]">
                  Coinbase Wallet helps you unlock one of the most significant
                  features of crypto: the ability to send or receive peer-to-peer
                  transfers without any financial intermediaries.
                </p>
              </div>
            </div>

            <div className="mt-[70px] flex justify-center">
              <button className="flex items-center gap-2 rounded-[10px] bg-[#1652f0] px-[24px] py-[10px] text-[15px] font-semibold text-white">
                See more Wallet articles
                <span className="text-[18px]">›</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}

export default Learn;