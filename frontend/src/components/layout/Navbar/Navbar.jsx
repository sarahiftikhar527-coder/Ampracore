
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const services = [
  { label: "ERP & CRM", path: "/services/erp-crm" },
  { label: "AI Automation", path: "/services/ai-automation" },
  { label: "Mobile Application", path: "/services/mobile-application" },
  { label: "Point of Sale", path: "/services/point-of-sale" },
  { label: "Web Development", path: "/services/web-development" },
];

const links = [
  { label: "Home", path: "/", end: true },
  { label: "Blogs", path: "/blog" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Contact", path: "/contact" },
];

function RollingText({ children }) {
  return (
    <span className="am-nav-text">
      <span className="am-nav-roll">
        <span className="am-nav-label">{children}</span>
        <span className="am-nav-label am-nav-label-clone" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = Math.max(window.scrollY, 0);
        const diff = currentY - lastScrollY.current;

        if (menuOpen || currentY <= 10) {
          setHidden(false);
          lastScrollY.current = currentY;
        } else if (diff > 4) {
          setHidden(true);
          setServicesOpen(false);
          lastScrollY.current = currentY;
        } else if (diff < 0) {
          setHidden(false);
          lastScrollY.current = currentY;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  const renderDesktopLink = (item) => (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.end}
      className={({ isActive }) =>
        `am-nav-link${isActive ? " active" : ""}`
      }
    >
      <RollingText>{item.label}</RollingText>
      <span className="am-link-indicator" />
    </NavLink>
  );

  return (
    <header className={`am-navbar${hidden && !menuOpen ? " is-hidden" : ""}`}>
      <div className="am-navbar-inner">
        <Link
          to="/"
          className="am-brand"
          aria-label="Ampracore home"
          onClick={closeMobileMenu}
        >
          <img
            src="/assets/images/logo/logo.webp"
            alt="Ampracore"
            className="am-brand-logo"
          />
        </Link>

        <nav className="am-desktop-nav" aria-label="Main navigation">
          {links.slice(0, 1).map(renderDesktopLink)}

          <div
            className={`am-services-wrap${servicesOpen ? " services-open" : ""}`}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={`am-nav-link am-services-trigger${servicesOpen ? " active" : ""}`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((open) => !open)}
            >
              <RollingText>Services</RollingText>

              <svg
                className="am-chevron"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="am-link-indicator" />
            </button>

            <div className="am-services-dropdown" inert={!servicesOpen}>
              {services.map((service, index) => (
                <NavLink
                  key={service.path}
                  to={service.path}
                  tabIndex={servicesOpen ? 0 : -1}
                  className={({ isActive }) =>
                    `am-dropdown-link${isActive ? " active" : ""}`
                  }
                >
                  <span className="am-dropdown-number">0{index + 1}</span>
                  <RollingText>{service.label}</RollingText>
                  <span className="am-dropdown-arrow">↗</span>
                </NavLink>
              ))}
            </div>
          </div>

          {links.slice(1).map(renderDesktopLink)}
        </nav>

        <div className="am-auth-actions">
          <Link to="/login" className="am-login-btn">
            <RollingText>Login</RollingText>
          </Link>

          <Link to="/signup" className="am-signup-btn">
            <RollingText>Sign Up</RollingText>
          </Link>
        </div>

        <button
          type="button"
          className={`am-menu-toggle${menuOpen ? " is-open" : ""}`}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        className={`am-mobile-overlay${menuOpen ? " is-visible" : ""}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      <nav
        className={`am-mobile-panel${menuOpen ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="am-mobile-links">
          {links.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `am-mobile-link${isActive ? " active" : ""}`
              }
              onClick={closeMobileMenu}
            >
              <span className="am-mobile-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <RollingText>{item.label}</RollingText>
              <span className="am-mobile-arrow">↗</span>
            </NavLink>
          ))}

          <div className="am-mobile-services">
            <button
              type="button"
              className="am-mobile-link am-mobile-services-trigger"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((open) => !open)}
            >
              <span className="am-mobile-number">05</span>
              <RollingText>Services</RollingText>

              <svg
                className={`am-chevron${servicesOpen ? " rotated" : ""}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className={`am-mobile-services-list${servicesOpen ? " is-open" : ""}`}
              inert={!servicesOpen}
            >
              {services.map((service) => (
                <NavLink
                  key={service.path}
                  to={service.path}
                  tabIndex={servicesOpen ? 0 : -1}
                  className={({ isActive }) =>
                    `am-mobile-service-link${isActive ? " active" : ""}`
                  }
                  onClick={closeMobileMenu}
                >
                  <RollingText>{service.label}</RollingText>
                  <span aria-hidden="true">↗</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="am-mobile-auth-actions">
          <Link
            to="/login"
            className="am-login-btn am-mobile-login-btn"
            onClick={closeMobileMenu}
          >
            <RollingText>Login</RollingText>
          </Link>

          <Link
            to="/signup"
            className="am-signup-btn am-mobile-signup-btn"
            onClick={closeMobileMenu}
          >
            <RollingText>Sign Up</RollingText>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
