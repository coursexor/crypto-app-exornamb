export default function EarnPlaceholder({ activeView, handleViewChange }) {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-white">
      <div className="text-center animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-8">
          <div className="w-[120px] h-[120px] rounded-full bg-[#1652F0]/5 flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1652F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              <line x1="12" y1="11" x2="12" y2="11" />
              <line x1="12" y1="16" x2="12" y2="16" />
              <path d="M7 11h1" />
              <path d="M7 16h1" />
              <path d="M16 11h1" />
              <path d="M16 16h1" />
            </svg>
          </div>
        </div>
        <h2 className="text-[28px] font-bold cb-text-primary mb-3">Under Construction</h2>
        <p className="text-[16px] cb-text-muted max-w-[340px] mx-auto leading-relaxed">
          We're currently building the <strong>Earn Rewards</strong> experience. Check back soon for updates!
        </p>
        <button
          onClick={() => handleViewChange('dashboard')}
          className="mt-10 px-8 py-3 rounded-full bg-[#1652F0] text-white font-semibold text-[14px] hover:bg-[#004BD3] transition-all"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
