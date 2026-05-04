import { Link, useNavigate } from "react-router-dom";
import { useState, useMemo, useRef, useEffect } from "react";
import { FiSearch, FiGlobe, FiCheck, FiX, FiMenu, FiChevronLeft } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import AvatarButton from "./AvatarButton";
import NavDropdown from "./NavDropdown";

import logo from "../../assets/coinbase_logo.png";
import bitcoin  from "../../assets/bitcoin.png";
import ethereum from "../../assets/ethereum.png";
import tether   from "../../assets/tether.png";
import usdc     from "../../assets/usdc.png";
import bnb      from "../../assets/bnb.png";
import xrp      from "../../assets/xrp.png";

/* ── DATA ─────────────────────────────────────────────── */
const TABS = ["Top", "Crypto", "Stocks", "Predictions", "Perpetuals", "Futures"];

const RESULTS = {
  Top: {
    CRYPTO: [
      { name:"Bitcoin",  rank:1, symbol:"BTC",  vol:"GHS 30.4B vol", mcap:"GHS 1.5T mcap",  price:"GHS 77,352.38", change:"+1.71%", neg:false, img: bitcoin  },
      { name:"Ethereum", rank:2, symbol:"ETH",  vol:"GHS 10.9B vol", mcap:"GHS 275.8B mcap", price:"GHS 2,285.38",  change:"+1.09%", neg:false, img: ethereum },
      { name:"Tether",   rank:3, symbol:"USDT", vol:"GHS 111.2B vol",mcap:"GHS 189.5B mcap", price:"GHS 0.9996",   change:"+0.01%", neg:false, img: tether   },
    ],
    STOCKS: [
      { name:"NVIDIA", rank:null, symbol:"NVDA", vol:"GHS 796.7K vol", mcap:"GHS 4.9T mcap", price:"GHS 199.96", change:"+0.20%", neg:false, img: null },
    ],
  },
  Crypto: {
    CRYPTO: [
      { name:"Bitcoin",  rank:1, symbol:"BTC",  vol:"GHS 30.4B vol", mcap:"GHS 1.5T mcap",  price:"GHS 77,352.38", change:"+1.71%", neg:false, img: bitcoin  },
      { name:"Ethereum", rank:2, symbol:"ETH",  vol:"GHS 10.9B vol", mcap:"GHS 275.8B mcap", price:"GHS 2,285.38",  change:"+1.09%", neg:false, img: ethereum },
      { name:"BNB",      rank:4, symbol:"BNB",  vol:"GHS 5.2B vol",  mcap:"GHS 92.1B mcap",  price:"GHS 590.20",   change:"+0.48%", neg:false, img: bnb      },
      { name:"XRP",      rank:5, symbol:"XRP",  vol:"GHS 2.1B vol",  mcap:"GHS 45.3B mcap",  price:"GHS 0.52",     change:"-0.75%", neg:true,  img: xrp      },
      { name:"USDC",     rank:6, symbol:"USDC", vol:"GHS 8.0B vol",  mcap:"GHS 44.1B mcap",  price:"GHS 1.00",     change:"0.00%",  neg:false, img: usdc     },
    ],
  },
  Stocks:      { STOCKS: [{ name:"NVIDIA", rank:null, symbol:"NVDA", vol:"GHS 796.7K vol", mcap:"GHS 4.9T mcap", price:"GHS 199.96", change:"+0.20%", neg:false, img:null }] },
  Predictions: {},
  Perpetuals:  {},
  Futures:     {},
};

const LANGUAGES = [
  { name:"English",  region:"Global"         },
  { name:"Español",  region:"United States"   },
  { name:"English",  region:"United States"   },
  { name:"Deutsch",  region:"Germany"         },
  { name:"English",  region:"Germany"         },
  { name:"English",  region:"Australia"       },
  { name:"Français", region:"France"          },
];

/* ── NAV SUB-MENUS ────────────────────────────────────── */
const NAV_SUBMENUS = {
  individuals: {
    sections: [{
      items: [
        { icon:"🔵", title:"Buy and sell",     desc:"Buy, sell, and use crypto" },
        { icon:"％", title:"Earn",             desc:"Stake your crypto and earn rewards" },
        { icon:"💎", title:"Private Client",   desc:"For trusts, family offices, UHNWIs" },
        { icon:"💳", title:"Debit Card",       desc:"Spend crypto, get crypto back" },
        { icon:"📊", title:"Advanced",         desc:"Professional-grade trading tools" },
        { icon:"⊘",  title:"Coinbase One",     desc:"Get zero trading fees and more" },
        { icon:"💳", title:"Credit Card",      desc:"Earn up to 4% bitcoin back" },
        { icon:"📖", title:"Learn",            desc:"Crypto tips and guides", link:"/learn" },
        { icon:"⬛", title:"Base App",         desc:"Post, earn, trade, and chat, all in one place" },
        { icon:"💎", title:"Coinbase Wealth",  desc:"Institutional-grade services for UHNW" },
        { icon:"🔗", title:"Onchain",          desc:"Dive into the world of onchain apps" },
      ]
    }]
  },
  businesses: {
    sections: [{
      items: [
        { icon:"🗂",  title:"Business",        desc:"Crypto trading and payments for startups and SMBs" },
        { icon:"🔄", title:"Token Manager",    desc:"The platform for token distributions, vesting, and lockups" },
        { icon:"💳", title:"Payments",         desc:"The stablecoin payments stack for commerce platforms" },
        { icon:"🔲", title:"Asset Listings",   desc:"List your asset on Coinbase", link:"/asset-details" },
      ]
    }]
  },
  institutions: {
    sections: [
      {
        title: "Prime", link: "#",
        items: [
          { icon:"🕐", title:"Trading and Financing", desc:"Professional prime brokerage services" },
          { icon:"🛡", title:"Custody",               desc:"Securely store all your digital assets" },
          { icon:"％", title:"Staking",               desc:"Explore staking across our products" },
          { icon:"⊞", title:"Onchain Wallet",        desc:"Institutional-grade wallet to get onchain" },
        ]
      },
      {
        title: "Markets",
        items: [
          { icon:"✕",  title:"Exchange",              desc:"Spot markets for high-frequency trading" },
          { icon:"🌐", title:"International Exchange", desc:"Access perpetual futures markets" },
          { icon:"↔", title:"Derivatives Exchange",   desc:"Trade an accessible futures market" },
        ]
      }
    ]
  },
  developers: {
    sections: [
      {
        title: "Coinbase Developer Platform", link: "#",
        items: [
          { icon:"⊙", title:"Payments",   desc:"Fast and global stablecoin payments with a single integration" },
          { icon:"📊", title:"Trading",   desc:"Launch crypto trading and custody for your users" },
          { icon:"🗂", title:"Wallets",   desc:"Deploy customizable and scalable wallets for your business" },
          { icon:"⊙", title:"Stablecoins",desc:"Access USDC and Coinbase Custom Stablecoins" },
        ]
      },
      {
        title: "Solutions for any company",
        items: [
          { icon:"🏛", title:"Banks & Brokerages", desc:"Secure, regulated offerings for retail, private banking, & institutional clients" },
          { icon:"💳", title:"Payment Firms",      desc:"Near-instant, low-cost, global payment rails for modern providers" },
          { icon:"⚡", title:"Startups",           desc:"Launch your business with the world's leader in crypto" },
        ]
      }
    ]
  },
  company: {
    sections: [{
      items: [
        { icon:"ℹ", title:"About",     desc:"Powering the crypto economy" },
        { icon:"💬", title:"Support",   desc:"Find answers to your questions" },
        { icon:"💼", title:"Careers",   desc:"Work with us" },
        { icon:"📰", title:"Blog",      desc:"Read the latest from Coinbase" },
        { icon:"👥", title:"Affiliates",desc:"Help introduce the world to crypto" },
        { icon:"🛡", title:"Security",  desc:"The most trusted & secure" },
      ]
    }]
  }
};


/* ── SEARCH RESULT ROW ────────────────────────────────── */
function ResultRow({ item }) {
  return (
    <Link to="/asset-details" className="flex items-center gap-4 rounded-xl px-3 py-3 hover:bg-gray-50 transition" onClick={() => document.body.click()}>
      {/* icon */}
      <div className="shrink-0">
        {item.img
          ? <img src={item.img} alt={item.name} className="h-9 w-9 rounded-full object-cover" />
          : <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-[13px] font-bold text-blue-600">{item.symbol[0]}</div>
        }
      </div>

      {/* name + symbol */}
      <div className="w-[130px] shrink-0">
        <p className="text-[14px] font-semibold text-gray-900 flex items-center gap-1.5">
          {item.name}
          {item.rank && <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-500">#{item.rank}</span>}
        </p>
        <p className="text-[12px] text-gray-400">{item.symbol}</p>
      </div>

      {/* vol + mcap */}
      <div className="flex-1 text-[12px] text-gray-400">
        <p>{item.vol}</p>
        <p>{item.mcap}</p>
      </div>

      {/* price + change */}
      <div className="text-right shrink-0">
        <p className="text-[14px] font-semibold text-gray-900">{item.price}</p>
        <p className={`text-[12px] font-medium flex items-center justify-end gap-0.5 ${item.neg ? "text-red-500":"text-emerald-600"}`}>
          <span>{item.neg ? "↘":"↗"}</span>{item.change.replace(/^[+-]/,"")}
        </p>
      </div>
    </Link>
  );
}

/* ── SEARCH PANEL (card that drops below navbar) ─────── */
function SearchPanel({ tab, setTab, query }) {
  const sections = useMemo(() => {
    const data = RESULTS[tab] || {};
    if (!query.trim()) return data;
    const out = {};
    Object.entries(data).forEach(([sec, rows]) => {
      const filtered = rows.filter(r =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.symbol.toLowerCase().includes(query.toLowerCase())
      );
      if (filtered.length) out[sec] = filtered;
    });
    return out;
  }, [tab, query]);

  const isEmpty = Object.keys(sections).length === 0;

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+4px)] z-[200] w-[min(640px,96vw)] rounded-2xl border border-gray-200 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.14)] overflow-hidden">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-gray-100 px-4 py-3 scrollbar-none">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] font-semibold transition ${
              tab === t ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="max-h-[420px] overflow-y-auto px-3 py-2">
        {isEmpty ? (
          <p className="py-10 text-center text-sm text-gray-400">No results found</p>
        ) : (
          Object.entries(sections).map(([section, rows]) => (
            <div key={section} className="mb-4">
              <p className="mb-1 px-3 text-[10px] font-bold tracking-widest text-gray-400">{section}</p>
              {rows.map((item) => <ResultRow key={item.symbol} item={item} />)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ── LANGUAGE PANEL (full-width below navbar) ─────────── */
function LanguagePanel({ query, setQuery, selected, setSelected, close }) {
  const filtered = useMemo(() => {
    if (!query.trim()) return LANGUAGES;
    return LANGUAGES.filter(l =>
      `${l.name} ${l.region}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="absolute inset-x-0 top-full z-[200] border-b border-gray-200 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <div className="mx-auto max-w-2xl px-6 py-6">
        {/* Header */}
        <div className="mb-5 flex items-center gap-4">
          <button onClick={close} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 text-gray-700">
            <FiChevronLeft size={20} />
          </button>
          <p className="text-[17px] font-bold text-gray-900">Language and region</p>
        </div>

        {/* Search */}
        <div className="flex items-center rounded-xl bg-gray-100 px-4 py-3 mb-4">
          <FiSearch className="mr-3 shrink-0 text-gray-400" size={16} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Language list */}
        <div className="max-h-[340px] overflow-y-auto divide-y divide-gray-50">
          {filtered.map((l, i) => {
            const active = selected.name === l.name && selected.region === l.region;
            return (
              <button
                key={`${l.name}-${l.region}-${i}`}
                onClick={() => { setSelected(l); close(); }}
                className="flex w-full items-center justify-between px-1 py-4 text-left hover:bg-gray-50 transition rounded-xl"
              >
                <div>
                  <p className="text-[15px] font-bold text-gray-900">{l.name}</p>
                  <p className="text-[13px] text-gray-400">{l.region}</p>
                </div>
                {active && <FiCheck className="text-[#0052FF]" size={16} strokeWidth={3} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── NAVBAR ───────────────────────────────────────────── */
export default function Navbar() {
  const navigate = useNavigate();
  const [showSearch,    setShowSearch]    = useState(false);
  const [showLang,      setShowLang]      = useState(false);
  const [mobileMenu,    setMobileMenu]    = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [dropdownOpen,  setDropdownOpen]  = useState(false);

  const { isAuthenticated, isLoading } = useAuth();

  const [searchTab,    setSearchTab]    = useState("Top");
  const [searchQuery,  setSearchQuery]  = useState("");
  const [langQuery,    setLangQuery]    = useState("");
  const [selectedLang, setSelectedLang] = useState({ name:"English", region:"Global" });

  const navRef = useRef(null);

  const closeAll = () => {
    setShowSearch(false);
    setShowLang(false);
    setMobileMenu(false);
    setActiveSubMenu(null);
    setDropdownOpen(false);
  };

  /* close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) closeAll();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* close on Esc */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") closeAll(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  /* lock body scroll when menu is open */
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  const openSearch = () => { setShowSearch(true);  setShowLang(false); setMobileMenu(false); setActiveSubMenu(null); };
  const openLang   = () => { setShowLang(true);    setShowSearch(false); setMobileMenu(false); setActiveSubMenu(null); };

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">

      {/* ── TOP BAR ──────────────────────────────────────── */}
      <div className="relative flex h-[68px] items-center px-6">

        {/* Logo / Back arrow */}
        {mobileMenu && activeSubMenu ? (
          <button
            onClick={() => setActiveSubMenu(null)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            <FiChevronLeft size={20} />
          </button>
        ) : (
          <Link to="/" onClick={closeAll} className="flex shrink-0 items-center">
            <img src={logo} alt="Coinbase" className="h-9 w-auto" />
          </Link>
        )}

        {/* CENTER: search input (visible when search is open) */}
        {showSearch && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(500px,55vw)]">
            <div className="flex items-center h-11 rounded-full border-2 border-[#0052FF] bg-white px-4 shadow-sm">
              <FiSearch className="mr-2 shrink-0 text-[#0052FF]" size={17} />
              <input
                id="navbar-search-input"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-gray-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="ml-1 text-gray-400 hover:text-gray-600">
                  <FiX size={15} />
                </button>
              )}
            </div>

            {/* Results panel — positioned relative to this centered container */}
            <SearchPanel tab={searchTab} setTab={setSearchTab} query={searchQuery} />
          </div>
        )}

        {/* RIGHT CLUSTER */}
        <div className="ml-auto flex items-center gap-2">

          {/* Search icon (hidden when search is open) */}
          {!showSearch && (
            <button
              id="navbar-search-btn"
              onClick={openSearch}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
            >
              <FiSearch size={16} />
            </button>
          )}

          {/* Globe / X */}
          {showLang ? (
            <button
              onClick={closeAll}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
            >
              <FiX size={16} />
            </button>
          ) : (
            <button
              id="navbar-globe-btn"
              onClick={openLang}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
            >
              <FiGlobe size={16} />
            </button>
          )}

          {/* Auth State Conditional */}
          {isLoading ? (
            <div className="cb-nav-skeleton" />
          ) : isAuthenticated ? (
            <div className="relative flex items-center justify-center">
              <AvatarButton onClick={() => setDropdownOpen(p => !p)} />
              <NavDropdown isOpen={dropdownOpen} onClose={() => setDropdownOpen(false)} />
            </div>
          ) : (
            <>
              {/* Sign in */}
              <Link
                to="/signin"
                onClick={closeAll}
                className="hidden rounded-full bg-gray-100 px-5 py-2 text-[15px] font-semibold text-gray-900 transition hover:bg-gray-200 sm:block"
              >
                Sign in
              </Link>

              {/* Sign up */}
              <Link
                to="/signup"
                onClick={closeAll}
                className="flex items-center rounded-full bg-[#0052FF] px-5 py-2 text-[15px] font-semibold text-white transition hover:bg-[#0045D8]"
              >
                Sign up
              </Link>
            </>
          )}

          {/* Hamburger */}
          <button
            id="navbar-menu-btn"
            onClick={() => { setMobileMenu(v => !v); setShowSearch(false); setShowLang(false); }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
          >
            {mobileMenu ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* ── LANGUAGE FULL-WIDTH PANEL ─────────────────────── */}
      {showLang && (
        <LanguagePanel
          query={langQuery}
          setQuery={setLangQuery}
          selected={selectedLang}
          setSelected={setSelectedLang}
          close={closeAll}
        />
      )}

      {/* ── HAMBURGER MENU PANEL ─────────────────────────── */}
      {mobileMenu && (
        <div className="fixed inset-x-0 top-[68px] bottom-0 z-[150] flex flex-col bg-white border-t border-gray-200 shadow-md overflow-y-auto">

          <div className="flex-1">
          {/* ── MAIN LIST (no sub-menu selected) ── */}
          {!activeSubMenu && (
            <>
              <Link to="/explore" onClick={closeAll}
                className="flex items-center px-6 py-5 text-[20px] font-semibold text-gray-900 hover:bg-gray-50 transition">
                Cryptocurrencies
              </Link>
              {[
                { label:"Individuals",  key:"individuals"  },
                { label:"Businesses",   key:"businesses"   },
                { label:"Institutions", key:"institutions" },
                { label:"Developers",   key:"developers"   },
                { label:"Company",      key:"company"      },
              ].map(({ label, key }) => (
                <button key={key}
                  onClick={() => setActiveSubMenu(key)}
                  className="flex w-full items-center justify-between border-t border-gray-100 px-6 py-5 text-[20px] font-semibold text-gray-900 hover:bg-gray-50 transition">
                  {label}
                  <span className="text-gray-400 text-[22px] font-light">›</span>
                </button>
              ))}
            </>
          )}

          {/* ── SUB-PANEL ── */}
          {activeSubMenu && NAV_SUBMENUS[activeSubMenu] && (() => {
            const menu = NAV_SUBMENUS[activeSubMenu];
            return (
              <div className="px-6 py-6 overflow-y-auto max-h-[80vh]">
                {menu.sections.map((sec, si) => (
                  <div key={si} className={si > 0 ? "mt-8" : ""}>
                    {/* Section header */}
                    {sec.title && (
                      <button className="flex items-center gap-1 mb-5 text-[15px] font-semibold text-gray-900 hover:underline">
                        {sec.title} {sec.link && <span className="text-gray-400">›</span>}
                      </button>
                    )}
                    {/* Items grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
                      {sec.items.map((item, ii) => (
                        <button key={ii} onClick={() => { closeAll(); if (item.link) navigate(item.link); }}
                          className="flex items-start gap-3 rounded-xl px-3 py-4 text-left hover:bg-gray-50 transition">
                          {/* Icon box */}
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-[18px]">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold text-gray-900 leading-tight">{item.title}</p>
                            <p className="mt-0.5 text-[12px] text-gray-500 leading-snug">{item.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
          </div>

          {/* ── MOBILE MENU FOOTER ── */}
          <div className="p-6 mt-auto flex items-center gap-3 pb-8 sm:hidden">
            <button 
              onClick={openLang}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-900 transition hover:bg-gray-200"
            >
              <FiGlobe size={18} />
            </button>
            {!isAuthenticated && (
              <Link 
                to="/signin" 
                onClick={closeAll}
                className="flex h-10 px-6 items-center justify-center rounded-full bg-gray-100 text-[15px] font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}