import { FiCheck, FiX, FiEdit2 } from "react-icons/fi";

export default function ProfileInfoView({ 
  user, 
  account, 
  initials, 
  editField, 
  editValue, 
  setEditValue, 
  handleEdit, 
  handleSaveEdit, 
  handleCancelEdit, 
  isSaving, 
  saveError 
}) {
  return (
    <div className="max-w-[800px] mx-auto space-y-6">
      <div className="cb-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="h-[64px] w-[64px] shrink-0 rounded-full border-2 border-[#E8E8E8] overflow-hidden bg-[#1652F0] flex items-center justify-center text-white text-[24px] font-semibold">
            {user.avatarUrl ? <img src={user.avatarUrl} alt="Avatar" className="h-full w-full object-cover" /> : initials}
          </div>
          <div>
            <h1 className="text-[18px] font-semibold cb-text-primary mb-1">{user.fullName}</h1>
            <p className="text-[13px] cb-text-muted mb-3">{user.email}</p>
            <div className="flex flex-wrap gap-2">
              {account?.kycLevel >= 1 && <span className="px-2.5 py-0.5 rounded-full bg-[#0EA56A]/10 text-[#0EA56A] text-[11px] font-bold">KYC Verified</span>}
              {account?.twoFaEnabled && <span className="px-2.5 py-0.5 rounded-full bg-[#1652F0]/10 text-[#1652F0] text-[11px] font-bold">2FA Enabled</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="cb-card">
        <h2 className="sv-card-title">Personal Info</h2>
        <div className="space-y-4">
          {/* Full Name */}
          <div className="group flex justify-between items-center py-2 border-b border-[#E8E8E8] dark:border-[#1E2130]">
            <p className="text-[14px] cb-text-muted w-[120px] shrink-0">Full Name</p>
            <div className="flex-1 flex justify-end">
              {editField === 'fullName' ? (
                <div className="flex items-center gap-2">
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={`border border-[#1652F0] rounded-[8px] px-2 py-1 text-[14px] outline-none bg-transparent cb-text-primary ${isSaving ? 'opacity-50 pointer-events-none' : ''}`}
                    autoFocus
                    disabled={isSaving}
                  />
                  <button onClick={handleSaveEdit} className={`text-[#0EA56A] px-1 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSaving}>
                    <FiCheck size={18} />
                  </button>
                  <button onClick={handleCancelEdit} className={`text-[#E53E3E] px-1 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSaving}>
                    <FiX size={18} />
                  </button>
                  {saveError && <p className="absolute top-full right-0 text-[10px] text-[#E53E3E] mt-0.5 whitespace-nowrap">{saveError}</p>}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-[14px] cb-text-primary font-medium">{user.fullName}</p>
                  <button onClick={() => handleEdit('fullName', user.fullName)} className="text-[#1652F0]"><FiEdit2 size={16} /></button>
                </div>
              )}
            </div>
          </div>

          {/* Email (Read Only) */}
          <div className="group flex justify-between items-center py-2 border-b border-[#E8E8E8] dark:border-[#1E2130]">
            <p className="text-[14px] cb-text-muted w-[120px] shrink-0">Email</p>
            <div className="flex-1 flex justify-end">
              <p className="text-[14px] cb-text-primary font-medium">{user.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="group flex justify-between items-center py-2 border-b border-[#E8E8E8] dark:border-[#1E2130]">
            <p className="text-[14px] cb-text-muted w-[120px] shrink-0">Phone</p>
            <div className="flex-1 flex justify-end">
              {editField === 'phone' ? (
                <div className="flex items-center gap-2">
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="+1 234 567 8900"
                    className={`border border-[#1652F0] rounded-[8px] px-2 py-1 text-[14px] outline-none bg-transparent cb-text-primary ${isSaving ? 'opacity-50 pointer-events-none' : ''}`}
                    autoFocus
                    disabled={isSaving}
                  />
                  <button onClick={handleSaveEdit} className={`text-[#0EA56A] px-1 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSaving}>
                    <FiCheck size={18} />
                  </button>
                  <button onClick={handleCancelEdit} className={`text-[#E53E3E] px-1 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSaving}>
                    <FiX size={18} />
                  </button>
                  {saveError && <p className="absolute top-full right-0 text-[10px] text-[#E53E3E] mt-0.5 whitespace-nowrap">{saveError}</p>}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-[14px] cb-text-primary font-medium">{user.phone || 'Not added'}</p>
                  <button onClick={() => handleEdit('phone', user.phone || '')} className="text-[#1652F0]"><FiEdit2 size={16} /></button>
                </div>
              )}
            </div>
          </div>

          {/* Country */}
          <div className="group flex justify-between items-center py-2 border-b border-[#E8E8E8] dark:border-[#1E2130]">
            <p className="text-[14px] cb-text-muted w-[120px] shrink-0">Country</p>
            <div className="flex-1 flex justify-end">
              {editField === 'country' ? (
                <div className="flex items-center gap-2">
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="e.g. United States"
                    className={`border border-[#1652F0] rounded-[8px] px-2 py-1 text-[14px] outline-none bg-transparent cb-text-primary ${isSaving ? 'opacity-50 pointer-events-none' : ''}`}
                    autoFocus
                    disabled={isSaving}
                  />
                  <button onClick={handleSaveEdit} className={`text-[#0EA56A] px-1 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSaving}>
                    <FiCheck size={18} />
                  </button>
                  <button onClick={handleCancelEdit} className={`text-[#E53E3E] px-1 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSaving}>
                    <FiX size={18} />
                  </button>
                  {saveError && <p className="absolute top-full right-0 text-[10px] text-[#E53E3E] mt-0.5 whitespace-nowrap">{saveError}</p>}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-[14px] cb-text-primary font-medium">{user.country || 'Not added'}</p>
                  <button onClick={() => handleEdit('country', user.country || '')} className="text-[#1652F0]"><FiEdit2 size={16} /></button>
                </div>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="group flex justify-between items-center py-2">
            <p className="text-[14px] cb-text-muted w-[120px] shrink-0">Date of Birth</p>
            <div className="flex-1 flex justify-end">
              {editField === 'dateOfBirth' ? (
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={`border border-[#1652F0] rounded-[8px] px-2 py-1 text-[14px] outline-none bg-transparent cb-text-primary ${isSaving ? 'opacity-50 pointer-events-none' : ''}`}
                    autoFocus
                    disabled={isSaving}
                  />
                  <button onClick={handleSaveEdit} className={`text-[#0EA56A] px-1 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSaving}>
                    <FiCheck size={18} />
                  </button>
                  <button onClick={handleCancelEdit} className={`text-[#E53E3E] px-1 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSaving}>
                    <FiX size={18} />
                  </button>
                  {saveError && <p className="absolute top-full right-0 text-[10px] text-[#E53E3E] mt-0.5 whitespace-nowrap">{saveError}</p>}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-[14px] cb-text-primary font-medium">
                    {user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : 'Not added'}
                  </p>
                  <button onClick={() => handleEdit('dateOfBirth', user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '')} className="text-[#1652F0]"><FiEdit2 size={16} /></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
