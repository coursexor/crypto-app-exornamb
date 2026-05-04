import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../utils/format";

export default function AvatarButton({ onClick }) {
  const { user } = useAuth();
  
  if (!user) return null;

  const hasAvatar = !!user.avatarUrl;
  const initials = getInitials(user.fullName, user.email);

  return (
    <button
      onClick={onClick}
      className="flex h-[36px] w-[36px] items-center justify-center rounded-full border-2 border-[#E8E8E8] overflow-hidden transition-all duration-200 hover:border-[#1652F0] focus:outline-none"
      style={{
        boxShadow: "0 0 0 0 rgba(22,82,240,0)",
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 0 3px rgba(22,82,240,0.15)"}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 0 0 0 rgba(22,82,240,0)"}
    >
      {hasAvatar ? (
        <img 
          src={user.avatarUrl} 
          alt={user.fullName || "User avatar"} 
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#1652F0] text-[#FFFFFF] text-[13px] font-semibold">
          {initials}
        </div>
      )}
    </button>
  );
}
