import logo from "../../assets/coinbase_logo.png";
import { useLocation } from "react-router-dom";
import { FaXTwitter, FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa6";
import { Globe } from "lucide-react";

import   googlePlay from "../../assets/google-play.svg";
import appStore from "../../assets/app-store.svg";

// Displays the global footer with links, language selector, and social icons
export default function Footer() {
    const location = useLocation();
    const isLearnPage = location.pathname === "/learn";
    return (
        <footer className="bg-[#EEF1F4]">
        <div className="bg-yellow-100 text-yellow-800 p-4 text-center text-sm font-semibold border-b border-yellow-200">
            Disclaimer: This is a demo project. Do not enter real personal information.
        </div>
        <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-1">
                <div className="flex items-center gap-3">
                <img
                    src={logo}
                    alt="Coinbase"
                    className="h-9 w-auto"
                />
                </div>
            </div>


            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-4">
                <FooterCol
                title="Company"
                items={[
                    "About",
                    "Careers",
                    "Blog",
                    "Press",
                    "Security",
                    "Vendors",
                    "Legal & privacy",
                    "Cookie policy",
                    "Cookie preferences",
                    "Digital Asset Disclosures",
                    "UK Modern Slavery Statement",
                ]}
                />
                <FooterCol
                title="Individuals"
                items={[
                    "Buy & sell",
                    "Base App",
                    "Coinbase One",
                    "Debit Card",
                    "Derivatives",
                    "Token Sales",
                    "Savings",
                    "Businesses",
                    "Asset Listings",
                    "Payments",
                    "Commerce",
                    "Prime",
                    "Staking",
                    "Exchange",
                    "International Exchange",
                    "Verified Pools",
                ]}
                />
                <FooterCol
                title="Developers"
                items={[
                    "Developer Platform",
                    "Base",
                    "Server Wallets",
                    "Embedded Wallets",
                    "Base Accounts (Smart Wallets)",
                    "Onramp & offramp",
                    "x402",
                    "Trade API",
                    "Paymaster",
                    "OnchainKit",
                    "Data API",
                    "Verifications",
                    "Node",
                    "AgentKit",
                    "Staking",
                    "Faucet",
                    "Exchange API",
                    "International Exchange API",
                    "Prime API",
                ]}
                />
                <FooterCol
                title="Support"
                items={[
                    "Help center",
                    "Contact us",
                    "Create account",
                    "ID verification",
                    "Account information",
                    "Payment methods",
                    "Account access",
                    "Supported crypto",
                    "Status",
                    "Asset prices",
                    "Bitcoin price",
                    "Ethereum price",
                    "Solana price",
                    "XRP price",
                    "Stock prices",
                    "NVIDIA price",
                    "Apple price",
                    "Microsoft price",
                ]}
                />
            </div>
            </div>

            <div className="mt-12">
                <div className="flex items-center gap-8 mb-6 text-gray-400">
                    <a href="#" className="hover:text-gray-900 transition-colors">
                        <FaXTwitter size={14} />
                    </a>
                    <a href="#" className="hover:text-gray-900 transition-colors">
                        <FaLinkedin size={16} />
                    </a>
                    <a href="#" className="hover:text-gray-900 transition-colors">
                        <FaInstagram size={16} />
                    </a>
                    <a href="#" className="hover:text-gray-900 transition-colors">
                        <FaTiktok size={16} />
                    </a>
                </div>

                <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] text-gray-600">
                    <div className="flex flex-wrap items-center gap-x-2">
                        <span>© {new Date().getFullYear()} Coinbase</span>
                        <span className="text-gray-300">•</span>
                        <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                        <span className="text-gray-300">•</span>
                        <a href="#" className="hover:text-gray-900 transition-colors">Terms & Conditions</a>
                    </div>

                    <div className="flex items-center gap-2 font-medium text-gray-600">
                        <Globe size={16} className="text-gray-400" />
                        <span className="hover:text-gray-900 cursor-pointer">Global</span>
                        <span className="text-gray-300">•</span>
                        <span className="hover:text-gray-900 cursor-pointer">English</span>
                    </div>
                </div>
            </div>
                            {isLearnPage && (
                                <div className="mt-8 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 items-start border-t border-gray-200 pt-8">
                                    <div>
                                        <p className="h-[15px] w-auto mb-4" >Download the App</p>
                                        <div className="flex flex-col gap-4">
                                            <a href="#">
                                                <img src={googlePlay} alt="Get it on Google Play" className="h-[30px] w-auto rounded-[6px]" />
                                            </a>
                                            <a href="#">
                                                <img src={appStore} alt="Download on the App Store" className="h-[30px] w-auto rounded-[6px]" />
                                            </a>
                                        </div>
                                    </div>
                                    <p className="text-[13px] leading-[1.6] text-gray-500">
                                        Information provided on this Site is for general educational purposes only and is not intended to constitute investment or other advice on financial products. Such information is not, and should not be read as, an offer or recommendation to buy or sell or a solicitation of an offer or recommendation to buy or sell any particular digital asset or to use any particular investment strategy. Coinbase and its affiliates (collectively "Coinbase") makes no representations as to the accuracy, completeness, timeliness, suitability, or validity of any information on this Site and will not be liable for any errors, omissions, or delays in this information or any losses, injuries, or damages arising from its display or use. Unless otherwise noted, all images are the property of Coinbase. Coinbase is not registered or licensed with the U.S. Securities and Exchange Commission or the U.S. Commodity Futures Trading Commission. Links provided to third-party sites are for informational purposes. Such sites are not under the control of Coinbase, and Coinbase is not responsible for the accuracy of the content on such third-party sites.
                                    </p>
                                </div>
                            )}
        </div>
        </footer>
    );
}

// Reusable column component for the footer link sections
function FooterCol({ title, items }) {
    return (
        <div>
        <h4 className="text-xs font-bold uppercase tracking-wide text-gray-700">
            {title}
        </h4>
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {items.map((t) => (
            <li key={t}>
                <a href="#" className="hover:text-gray-900">
                {t}
                </a>
            </li>
            ))}
        </ul>
        </div>
    );
}