// Reusable custom input field component with standard styling
export default function Input({ className = "", ...props }) {
    return (
        <input
        className={`h-10 w-full rounded-full bg-gray-100 px-4 text-sm text-gray-900 placeholder:text-gray-500 outline-none ring-1 ring-transparent focus:bg-white focus:ring-gray-300 ${className}`}
        {...props}
        />
    );
}