import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import WarningBanner from "./components/layout/WarningBanner";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import ExplorePage from "./pages/ExplorePage";
import AssetDetail from "./pages/AssetDetail";
import Learn from "./pages/Learn";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import AccountType from "./components/layout/AccountType";
import ProfileLayout from "./layouts/ProfileLayout";

export default function App() {
  const { pathname } = useLocation();
  const hideNavbar = ["/signin", "/signup", "/account-type", "/profile"].includes(pathname);

  return (
    <>
      {pathname === "/" && <WarningBanner />}
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/asset-details" element={<AssetDetail />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/account-type" element={<AccountType />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfileLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}