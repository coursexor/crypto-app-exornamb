import { FiPlus, FiMinus } from "react-icons/fi";

// Represents a single expandable/collapsible item within an FAQ section
export default function FAQItem({ item, open, onToggle }) {
    return (
        <div className="overflow-hidden rounded-xl bg-[#F5F5F5]">
        <button
            onClick={onToggle}
            className="flex w-full items-center justify-between px-4 py-4 text-left"
        >
            <span className="pr-4 text-sm font-medium text-[#111827]">{item.q}</span>
            {open ? (
            <FiMinus className="shrink-0 text-gray-500" />
            ) : (
            <FiPlus className="shrink-0 text-gray-500" />
            )}
        </button>

        {open && (
            <div className="border-t border-gray-200 px-4 py-4 text-sm leading-6 text-gray-600">
            {item.a}
            </div>
        )}
        </div>
    );
}