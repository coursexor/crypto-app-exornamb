// Reusable container component that applies standard card styling
export default function Card({ children, className = "" }) {
    return (
        <div
        className={`rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] ${className}`}
        >
        {children}
        </div>
    );
}