import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CoinbaseLogo from "../assets/coinbase_logo_white.png";
import { useAuth } from "../Context/AuthContext";

export default function SignIn() {
    const navigate = useNavigate();
    const [phase, setPhase] = useState("splash"); // splash -> email -> password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    
    const [logoReady, setLogoReady] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCookieBanner, setShowCookieBanner] = useState(true);

    useEffect(() => {
        const t1 = setTimeout(() => setLogoReady(true), 100);
        const t2 = setTimeout(() => setPhase("email"), 1800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    const handleContinue = async () => {
        setError("");
        if (phase === "email") {
            if (!email.trim() || !email.includes("@")) {
                setError("Please enter a valid email.");
                return;
            }
            setPhase("password");
        } else if (phase === "password") {
            if (!password.trim()) {
                setError("Please enter your password.");
                return;
            }
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, 
                    { email, password }, 
                    { withCredentials: true }
                );
                if (res.status === 200) {
                    login(res.data.token);
                    navigate("/");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Login failed. Please try again.");
            }
        }
    };

    // "Cancel signing in" clicked -> show modal
    const handleCancelSigningIn = () => setShowModal(true);

    // Modal: No → stay on /signin
    const handleModalNo = () => {
        setShowModal(false);
        navigate("/signin");
    };

    // Modal: Yes -> go home
    const handleModalYes = () => {
        setShowModal(false);
        navigate("/");
    };

    return (
        <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">

            {/*  SPLASH PHASE  */}
            <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
                style={{
                    opacity: phase === "splash" ? 1 : 0,
                    pointerEvents: phase === "splash" ? "auto" : "none",
                    zIndex: phase === "splash" ? 20 : 10,
                }}
            >
                <div
                    className="transition-all duration-700 ease-out"
                    style={{
                        opacity: logoReady ? 1 : 0,
                        transform: logoReady ? "scale(1)" : "scale(0.6)",
                    }}
                >
                    <img src={CoinbaseLogo} alt="Coinbase Logo" className="w-16 h-13" />
                </div>
            </div>

            {/* ── SIGN-IN PHASE ── */}
            <div
                className="flex flex-col min-h-screen transition-opacity duration-700"
                style={{
                    opacity: phase !== "splash" ? 1 : 0,
                    pointerEvents: phase !== "splash" ? "auto" : "none",
                }}
            >
                {/* Top bar with logo animating to top-left */}
                <div className="flex items-center px-5 pt-4 pb-2">
                    <div
                        className="transition-all duration-700 ease-out cursor-pointer"
                        style={{
                            opacity: phase !== "splash" ? 1 : 0,
                            transform: phase !== "splash" ? "translateY(0)" : "translateY(-12px)",
                        }}
                        onClick={() => navigate("/")}
                    >
                        <img src={CoinbaseLogo} alt="Coinbase Logo" className="w-12 h-9" />
                    </div>
                </div>

                {/* Main form */}
                <div className="flex-1 flex items-center justify-center px-4">
                    <div
                        className="w-full max-w-sm transition-all duration-700 ease-out"
                        style={{
                            opacity: phase !== "splash" ? 1 : 0,
                            transform: phase !== "splash" ? "translateY(0)" : "translateY(20px)",
                            transitionDelay: "120ms",
                        }}
                    >
                        <h1 className="text-white text-2xl font-bold text-center mb-7 tracking-tight">
                            {phase === "email" ? "Sign in to Coinbase" : "Enter your password"}
                        </h1>
                        <p className="text-yellow-400 text-sm mb-4 text-center font-semibold">Demo app – do not use your real password</p>

                        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                        {phase === "email" && (
                            <>
                                {/* Email field */}
                                <label className="block text-white text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="w-full bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm outline-none focus:border-blue-500 transition-colors mb-4"
                                    onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                                />
                            </>
                        )}

                        {phase === "password" && (
                            <>
                                {/* Password field */}
                                <label className="block text-white text-sm font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm outline-none focus:border-blue-500 transition-colors mb-4"
                                    onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                                    autoFocus
                                />
                            </>
                        )}

                        {/* Continue button */}
                        <button
                            onClick={handleContinue}
                            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-full text-sm transition-colors mb-5"
                        >
                            {phase === "password" ? "Sign in" : "Continue"}
                        </button>

                        {phase === "email" && (
                            <>
                                {/* Divider */}
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="flex-1 h-px bg-gray-700" />
                                    <span className="text-gray-500 text-xs tracking-widest">OR</span>
                                    <div className="flex-1 h-px bg-gray-700" />
                                </div>

                                {/* OAuth buttons */}
                                <div className="flex flex-col gap-3 mb-7">
                                    {/* Passkey */}
                                    <button className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-3 rounded-full text-sm transition-colors">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                                            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                                            <path d="M4 20c0-4 3.6-7 8-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
                                            <path d="M18 15v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                        Sign in with Passkey
                                    </button>

                                    {/* Google */}
                                    <button className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-3 rounded-full text-sm transition-colors">
                                        <svg width="18" height="18" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Sign in with Google
                                    </button>

                                    {/* Apple */}
                                    <button className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-3 rounded-full text-sm transition-colors">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                        </svg>
                                        Sign in with Apple
                                    </button>
                                </div>

                                {/* Sign up link */}
                                <p className="text-center text-sm text-white mb-4">
                                    Don't have an account?{" "}
                                    <button
                                        onClick={() => navigate("/account-type")}
                                        className="text-blue-500 font-semibold hover:underline"
                                    >
                                        Sign up
                                    </button>
                                </p>
                            </>
                        )}

                        {/* Privacy note */}
                        <p className="text-center text-xs text-gray-500 leading-relaxed mb-6">
                            Not your device? Use a private window. See our{" "}
                            <a href="#" className="underline hover:text-gray-300 transition-colors">Privacy Policy</a>{" "}
                            for more info.
                        </p>

                        {/* Cancel signing in */}
                        <p className="text-center">
                            <button
                                onClick={handleCancelSigningIn}
                                className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors"
                            >
                                Cancel signing in
                            </button>
                        </p>
                    </div>
                </div>

                {/* Cookie banner — dismissible */}
                {showCookieBanner && (
                    <div
                        className="bg-gray-900 border-t border-gray-800 px-5 py-3 flex items-center justify-between gap-4 transition-all duration-700 ease-out"
                        style={{
                            opacity: phase !== "splash" ? 1 : 0,
                            transform: phase !== "splash" ? "translateY(0)" : "translateY(10px)",
                            transitionDelay: "300ms",
                        }}
                    >
                        <p className="text-xs text-gray-400 leading-relaxed">
                            We use strictly necessary cookies to enable essential functions, such as security and
                            authentication. For more information, see our{" "}
                            <a href="#" className="underline hover:text-white transition-colors">Cookie Policy</a>.
                        </p>
                        <button
                            onClick={() => setShowCookieBanner(false)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-colors flex-shrink-0"
                        >
                            Dismiss
                        </button>
                    </div>
                )}
            </div>

            {/* ── MODAL OVERLAY ── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-gray-900 rounded-2xl p-8 mx-5 max-w-xs w-full text-center shadow-2xl">
                        {/* Warning triangle */}
                        <div className="flex justify-center mb-5">
                            <svg width="72" height="64" viewBox="0 0 72 64" fill="none">
                                <path d="M36 4L68 60H4L36 4Z" fill="#F97316" />
                                <text x="36" y="50" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">!</text>
                            </svg>
                        </div>

                        <h2 className="text-white text-lg font-bold mb-2">You're not signed in yet</h2>
                        <p className="text-gray-400 text-sm mb-7">Are you sure you want to go back?</p>

                        <div className="flex gap-3">
                            {/* No → stay on /signin */}
                            <button
                                onClick={handleModalNo}
                                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-full text-sm transition-colors"
                            >
                                No
                            </button>
                            {/* Yes → go to "/" */}
                            <button
                                onClick={handleModalYes}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full text-sm transition-colors"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
