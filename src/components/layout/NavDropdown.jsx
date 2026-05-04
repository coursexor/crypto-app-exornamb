import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function NavDropdown({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Also ensure we don't close if clicking the avatar button itself
        // (assume it's handled by the parent button's onClick toggling)
        onClose();
      }
    }
    
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      // Small timeout to prevent immediate close if event bubbled
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
      }, 0);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!user) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 top-[48px] z-50 w-[220px] rounded-xl border border-[#E8E8E8] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition-all ${
        isOpen
          ? "pointer-events-auto translate-y-0 opacity-100 duration-180 ease-out"
          : "pointer-events-none -translate-y-[6px] opacity-0 duration-140 ease-in"
      }`}
    >
      <div className="px-3 py-3">
        <div className="mb-2 px-3 py-1">
          <p className="text-[13px] font-semibold text-[#0A0B0D] truncate">{user.fullName}</p>
          <p className="text-[12px] text-[#6B7280] truncate">{user.email}</p>
        </div>
        
        <hr className="my-1.5 border-none border-t border-[#E8E8E8]" />

        <button
          onClick={() => handleNavigation("/profile")}
          className="w-full rounded-lg px-3 py-2.5 text-left text-[14px] text-[#0A0B0D] hover:bg-[#F7F7F7] transition-colors"
        >
          My Profile
        </button>
        <button
          onClick={() => handleNavigation("/settings")}
          className="w-full rounded-lg px-3 py-2.5 text-left text-[14px] text-[#0A0B0D] hover:bg-[#F7F7F7] transition-colors"
        >
          Settings
        </button>
        <button
          onClick={() => handleNavigation("/notifications")}
          className="w-full rounded-lg px-3 py-2.5 text-left text-[14px] text-[#0A0B0D] hover:bg-[#F7F7F7] transition-colors"
        >
          Notifications
        </button>

        <hr className="my-1.5 border-none border-t border-[#E8E8E8]" />

        <button
          onClick={handleLogout}
          className="w-full rounded-lg px-3 py-2.5 text-left text-[14px] font-medium text-[#E53E3E] hover:bg-[#F7F7F7] transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
