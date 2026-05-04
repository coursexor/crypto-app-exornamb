import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CoinbaseLogo from "../assets/coinbase_logo_white.png";

export default function SignUp() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const handleContinue = async () => {
        setError("");
        if (step === 1) {
            if (!email.trim() || !email.includes("@")) {
                setError("Please enter a valid email.");
                return;
            }
            setStep(2);
        } else if (step === 2) {
            if (!name.trim()) {
                setError("Please enter your name.");
                return;
            }
            setStep(3);
        } else if (step === 3) {
            if (!password.trim() || password.length < 6) {
                setError("Password must be at least 6 characters.");
                return;
            }
            try {
                const res = await axios.post("http://localhost:3000/auth/register", { name, email, password });
                if (res.status === 201) {
                    navigate("/signin");
                }
            } catch (err) {
                const errorMessage = err.response?.data?.message;
                if (errorMessage === "Email already in use") {
                    setError("This email already exists. Please use another email.");
                    setStep(1);
                } else {
                    setError(errorMessage || "Registration failed. Please try again.");
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col">
            {/* Top bar */}
            <div className="flex items-center px-5 pt-4 pb-2">
                <button onClick={() => navigate("/account-type")} className="focus:outline-none">
                    <img src={CoinbaseLogo} alt="Coinbase" className="w-12 h-9" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center px-4">
                <div
                    className="w-full max-w-sm transition-all duration-700 ease-out"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(24px)",
                    }}
                >
                    <h1 className="text-white text-2xl font-bold mb-2 leading-tight">
                        {step === 1 ? "Create your account" : step === 2 ? "What's your name?" : "Create a password"}
                    </h1>
                    <p className="text-gray-400 text-sm mb-7 leading-relaxed">
                        {step === 1 ? "Access all that Coinbase has to offer with a single account." : step === 2 ? "Please provide your full legal name." : "Make it strong and secure."}
                    </p>
                    <p className="text-yellow-400 text-sm mb-4 font-semibold">Demo app – do not use your real password</p>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    {step === 1 && (
                        <>
                            <label className="block text-white text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                                className="w-full bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm outline-none focus:border-blue-500 transition-colors mb-4"
                                onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                                autoFocus
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your full name"
                                className="w-full bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm outline-none focus:border-blue-500 transition-colors mb-4"
                                onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                                autoFocus
                            />
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <label className="block text-white text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm outline-none focus:border-blue-500 transition-colors mb-4"
                                onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                                autoFocus
                            />
                        </>
                    )}

                    {/* Continue */}
                    <button
                        onClick={handleContinue}
                        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-full text-sm transition-colors mb-5"
                    >
                        {step === 3 ? "Create account" : "Continue"}
                    </button>

                    {step === 1 && (
                        <>
                            {/* Divider */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="flex-1 h-px bg-gray-700" />
                                <span className="text-gray-500 text-xs tracking-widest">OR</span>
                                <div className="flex-1 h-px bg-gray-700" />
                            </div>

                            {/* OAuth */}
                            <div className="flex flex-col gap-3 mb-7">
                                {/* Google */}
                                <button className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-3 rounded-full text-sm transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                    Sign up with Google
                                </button>

                                {/* Apple */}
                                <button className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-3 rounded-full text-sm transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                    </svg>
                                    Sign up with Apple
                                </button>
                            </div>

                            {/* Sign in link */}
                            <p className="text-center text-sm text-white mb-5">
                                Already have an account?{" "}
                                <button
                                    onClick={() => navigate("/signin")}
                                    className="text-blue-500 font-semibold hover:underline"
                                >
                                    Sign in
                                </button>
                            </p>
                        </>
                    )}

                    {/* Legal */}
                    <p className="text-center text-xs text-gray-500 leading-relaxed">
                        By creating an account you certify that you are over the age of 18 and agree to our{" "}
                        <a href="#" className="underline hover:text-gray-300 transition-colors">Privacy Policy</a>{" "}
                        and{" "}
                        <a href="#" className="underline hover:text-gray-300 transition-colors">Cookie Policy</a>.
                    </p>
                </div>
            </div>

            {/* Bottom border accent */}
            <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700" />
        </div>
    );
}
