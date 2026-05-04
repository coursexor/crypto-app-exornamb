import Footer from "./Footer";
// Standard layout wrapper providing a navigation bar and footer for generic pages
export default function PageLayout({ children }) {
    return (
        <div className="min-h-screen bg-white">
        <main>{children}</main>
        <Footer />
        </div>
    );
}