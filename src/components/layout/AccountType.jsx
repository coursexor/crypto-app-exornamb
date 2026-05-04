import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CoinbaseLogo from "../../assets/coinbase_logo_white.png";

const accountTypes = [
  {
    id: "personal",
    label: "Personal",
    description: "Trade crypto as an individual.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        {/* Person body */}
        <circle cx="24" cy="16" r="8" fill="#4A90D9" />
        <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="#4A90D9" opacity="0.5" />
        {/* Badge */}
        <circle cx="20" cy="34" r="8" fill="#1a1f2e" />
        <circle cx="20" cy="34" r="7" fill="#3B6FD4" />
        <path d="M16.5 34l2.5 2.5 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "business",
    label: "Business",
    description: "Manage teams and portfolios, accept crypto payments, access APIs, and more",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        {/* Two people */}
        <circle cx="18" cy="16" r="7" fill="#6B7280" />
        <path d="M4 38c0-7.732 6.268-14 14-14" stroke="#6B7280" strokeWidth="3" strokeLinecap="round" />
        <circle cx="30" cy="16" r="7" fill="#6B7280" opacity="0.6" />
        {/* Coin badge */}
        <circle cx="34" cy="34" r="10" fill="#1a1f2e" />
        <circle cx="34" cy="34" r="9" fill="#D4A017" />
        <circle cx="34" cy="34" r="6" fill="#1a1f2e" />
        <circle cx="34" cy="34" r="5" fill="#D4A017" opacity="0.4" />
        <text x="34" y="38" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">$</text>
      </svg>
    ),
  },
  {
    id: "developer",
    label: "Developer",
    description: "Build onchain using developer tooling.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        {/* Diamond / layers shape */}
        <polygon points="24,8 40,20 24,32 8,20" fill="#5B8DEF" />
        <polygon points="24,16 36,24 24,32 12,24" fill="#3B6FD4" />
        <polygon points="24,24 36,32 24,40 12,32" fill="#7EC8E3" opacity="0.8" />
      </svg>
    ),
  },
];

// Page that allows users to select their account type during the signup process
export default function AccountType() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (id) => {
    setSelected(id);
    setTimeout(() => navigate("/signup"), 300);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top bar */}
      <div className="flex items-center px-5 pt-4 pb-2">
        <button onClick={() => navigate("/signin")} className="focus:outline-none">
          <img src={CoinbaseLogo} alt="Coinbase" className="w-12 h-9" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div
          className="w-full max-w-md transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <h1 className="text-white text-3xl font-bold mb-8 leading-tight">
            What kind of account are you creating?
          </h1>

          <div className="flex flex-col gap-4">
            {accountTypes.map((type, i) => (
              <button
                key={type.id}
                onClick={() => handleSelect(type.id)}
                className="flex items-center gap-5 bg-transparent border border-gray-700 hover:border-gray-500 rounded-2xl px-5 py-4 text-left transition-all duration-200 group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${120 + i * 80}ms`,
                  background: selected === type.id ? "rgba(59,111,212,0.15)" : "transparent",
                  borderColor: selected === type.id ? "#3B6FD4" : undefined,
                }}
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  {type.icon}
                </div>
                <div>
                  <p className="text-white font-bold text-base mb-0.5">{type.label}</p>
                  <p className="text-gray-400 text-sm leading-snug">{type.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700" />
    </div>
  );
}
