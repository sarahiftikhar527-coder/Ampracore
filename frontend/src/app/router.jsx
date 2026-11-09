
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar/Navbar.jsx";
import Footer from "../components/layout/Footer/Footer.jsx";

import HomePage from "../pages/Home/HomePage";
import Contact from "../pages/Contact/Contact";
import BlogPage from "../pages/Blog/BlogPage";

import ErpCrmPage from "../pages/ErpCrm/ErpCrmPage";

import PortfolioPage from "../pages/Portfolio/PortfolioPage";

function PagePlaceholder({ title }) {
  return (
    <main className="am-page-placeholder">
      <span>AMPRA CORE</span>
      <h1>{title}</h1>
      <p>This page will be designed in the next development step.</p>
    </main>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solutions" element={<PagePlaceholder title="Solutions" />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<PagePlaceholder title="About Us" />} />
        <Route path="/insights" element={<PagePlaceholder title="Insights" />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/blog" element={<BlogPage/>} />
        

        <Route path="/services/erp-crm" element={<ErpCrmPage />} />
        <Route path="/services/ai-automation" element={<PagePlaceholder title="AI Automation" />} />
        <Route path="/services/mobile-application" element={<PagePlaceholder title="Mobile Application" />} />
        <Route path="/services/point-of-sale" element={<PagePlaceholder title="Point of Sale" />} />
        <Route path="/services/web-development" element={<PagePlaceholder title="Web Development" />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
        <Footer />
    </BrowserRouter>
  );
}
