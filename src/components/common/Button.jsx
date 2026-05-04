// Reusable custom button component with different styles and sizes
export default function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...props
}) {
    const base =
    "inline-flex items-center justify-center font-semibold rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

    const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-6 text-base",
    };

    const variants = {
        primary:
        "bg-[#0052FF] text-white hover:bg-[#0046DB] focus:ring-[#0052FF]",
        light:
        "bg-[#EEF2FF] text-[#0A2B6B] hover:bg-[#E6ECFF] focus:ring-[#0052FF]",
        outline:
        "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-300",
        ghost:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-200",
        dark:
        "bg-black text-white hover:bg-neutral-800 focus:ring-black",
    };

    return (
        <button
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
        {...props}
        >
        {children}
        </button>
    );
}