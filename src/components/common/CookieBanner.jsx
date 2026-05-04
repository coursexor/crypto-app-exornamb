import { useState } from "react";

// Displays a banner at the bottom of the screen to notify users about cookie usage
export default function CookieBanner() {
    const [cookieDismissed, setCookieDismissed] = useState(false);

    if (cookieDismissed) return null;

    return (
        <div className="fixed bottom-0 right-0 z-50 m-4 max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl">
            <div className="flex justify-between items-start gap-3">
            <p className="text-xs text-gray-600 leading-relaxed">
                We use cookies to make your interactions with our website more meaningful. They help us
                better understand how our websites are used, so we can tailor content for you. For more
                information about the different cookies we are using, read the{" "}
                <a href="#" className="text-[#0052FF] hover:underline">Cookie Policy</a>.
                To change your cookie settings and preferences, click the Customize Cookies button.
            </p>
            <button onClick={() => setCookieDismissed(true)} className="flex-shrink-0 text-gray-400 hover:text-gray-700 text-lg leading-none">✕</button>
            </div>
            <div className="mt-4 flex gap-2 justify-end">
            <button
                onClick={() => setCookieDismissed(true)}
                className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
                Customize Cookies
            </button>
            <button
                onClick={() => setCookieDismissed(true)}
                className="rounded-full border border-gray-800 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
                Reject
            </button>
            <button
                onClick={() => setCookieDismissed(true)}
                className="rounded-full bg-[#0052FF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0046d6]"
            >
                Accept
            </button>
            </div>
        </div>
    );
}
