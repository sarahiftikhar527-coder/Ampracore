
import React from "react";
import { Mail, ArrowRight } from "lucide-react";
import "./Footer.css";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
];

const supportLinks = [
  { label: "Contact Support", href: "/contact" },
  { label: "Technical Help", href: "/contact" },
  { label: "Service Updates", href: "/services" },
  { label: "Submit Feedback", href: "/contact" },
];

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];

/* ---------- Social SVG icons ---------- */

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.9c-.3 0-1.3-.2-2.5-.2-2.6 0-4.3 1.6-4.3 4.4v2.4H7.3v3.3h2.8V22h3.4z" />
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.2 2.3h3.3l-7.2 8.3 8.5 11.2h-6.7l-5.2-6.8-6 6.8H1.6l7.7-8.8L1.2 2.3h6.8l4.7 6.2 5.5-6.2zm-1.2 17.5h1.8L7.1 4.1H5.1l11.9 15.7z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 11-.01 5 2.5 2.5 0 01.01-5zM3 9.8h4v11.7H3V9.8zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6v6.1h-4v-5.4c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8v5.5h-4V9.8z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z" />
  </svg>
);

const socialLinks = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "YouTube", href: "#", Icon: YouTubeIcon },
];

/* ---------- Turbine animation ---------- */

const polar = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [200 + r * Math.cos(a), 200 + r * Math.sin(a)];
};

const bladePath = (r1, r2, a0, span, skew) => {
  const p1 = polar(r1, a0);
  const p2 = polar(r2, a0 + skew);
  const p3 = polar(r2, a0 + skew + span);
  const p4 = polar(r1, a0 + span);

  const f = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

  return `M${f(p1)} L${f(p2)} L${f(p3)} L${f(p4)} Z`;
};

const bladesInner = Array.from({ length: 24 }, (_, i) =>
  bladePath(70, 128, i * 15, 9, 14)
);

const bladesOuter = Array.from({ length: 48 }, (_, i) =>
  bladePath(136, 152, i * 7.5, 4.2, 6)
);

function Turbine({ id, className, reverse }) {
  return (
    <svg
      className={`da-deco ${className}`}
      viewBox="0 0 400 400"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-blade`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff4256" />
          <stop offset="55%" stopColor="#a50a1a" />
          <stop offset="100%" stopColor="#3a0309" />
        </linearGradient>

        <radialGradient id={`${id}-hub`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff2b3d" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1a0105" stopOpacity="0.9" />
        </radialGradient>
      </defs>

      <ellipse
        cx="200"
        cy="200"
        rx="195"
        ry="118"
        transform="rotate(-24 200 200)"
        fill="none"
        stroke="rgba(255,40,56,0.55)"
        strokeWidth="1"
      />

      <ellipse
        cx="200"
        cy="200"
        rx="178"
        ry="140"
        transform="rotate(14 200 200)"
        fill="none"
        stroke="rgba(255,40,56,0.3)"
        strokeWidth="1"
      />

      <g className={`da-spin ${reverse ? "da-spin-reverse" : ""}`}>
        <circle
          cx="200"
          cy="200"
          r="166"
          fill="none"
          stroke="rgba(255,40,56,0.55)"
          strokeWidth="1.2"
        />

        <circle
          cx="200"
          cy="200"
          r="158"
          fill="none"
          stroke="rgba(255,90,100,0.35)"
          strokeWidth="0.8"
        />

        {bladesOuter.map((d, i) => (
          <path
            key={`o${i}`}
            d={d}
            fill={`url(#${id}-blade)`}
            opacity="0.85"
          />
        ))}

        <circle
          cx="200"
          cy="200"
          r="132"
          fill="none"
          stroke="rgba(255,60,75,0.7)"
          strokeWidth="1.6"
        />

        {bladesInner.map((d, i) => (
          <path
            key={`i${i}`}
            d={d}
            fill={`url(#${id}-blade)`}
            opacity="0.95"
          />
        ))}

        <circle
          cx="200"
          cy="200"
          r="70"
          fill={`url(#${id}-hub)`}
          stroke="rgba(255,60,75,0.8)"
          strokeWidth="1.6"
        />

        <circle
          cx="200"
          cy="200"
          r="52"
          fill="none"
          stroke="rgba(255,60,75,0.45)"
          strokeWidth="1"
        />

        <circle
          cx="200"
          cy="200"
          r="34"
          fill="#080103"
          stroke="rgba(255,60,75,0.5)"
          strokeWidth="1"
        />
      </g>

      <circle className="da-dot" cx="52" cy="128" r="4.5" fill="#ff2638" />
      <circle className="da-dot" cx="300" cy="352" r="4" fill="#ff2638" />
    </svg>
  );
}

/* ---------- Wave lines ---------- */

const waveLines = Array.from(
  { length: 30 },
  (_, i) =>
    `M0 ${262 + i * 2.6} C 160 ${250 + i * 2.4}, 300 ${
      95 + i * 3.6
    }, 600 ${6 + i * 2.2}`
);

/* ---------- Footer column ---------- */

function FooterColumn({ title, links }) {
  return (
    <div className="da-footer-column">
      <h3 className="da-footer-heading">{title}</h3>
      <span className="da-footer-heading-line" />

      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>
              <ArrowRight
                className="da-footer-link-arrow"
                size={15}
                strokeWidth={1.5}
              />
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Main Footer ---------- */

export default function Footer() {
  const handleSubscribe = (event) => {
    event.preventDefault();

    const email = event.currentTarget.email.value.trim();

    if (!email) return;

    window.location.href = `mailto:ampracore@gmail.com?subject=${encodeURIComponent(
      "Newsletter Subscription"
    )}&body=${encodeURIComponent(
      `Please subscribe this email to the newsletter: ${email}`
    )}`;
  };

  return (
    <footer className="da-footer">
      <div className="da-footer-glow da-footer-glow-top" />
      <div className="da-footer-glow da-footer-glow-bottom" />

      <Turbine id="da-t1" className="da-deco-top" />
      <Turbine id="da-t2" className="da-deco-bottom" reverse />

      <svg
        className="da-footer-wave"
        viewBox="0 0 600 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {waveLines.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(255,40,55,0.8)"
            strokeWidth="0.8"
          />
        ))}

        <circle className="da-dot" cx="552" cy="60" r="3.5" fill="#ff2638" />
      </svg>

      {/* Newsletter */}
      <section className="da-footer-subscription">
        <form
          className="da-footer-subscribe-form"
          onSubmit={handleSubscribe}
        >
          <Mail
            className="da-footer-subscribe-mail"
            size={20}
            strokeWidth={1.5}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            aria-label="Enter your email address"
            autoComplete="email"
            required
          />

          <button type="submit">
            <span>Subscribe</span>
            <ArrowRight size={16} strokeWidth={1.8} />
          </button>
        </form>
      </section>

      <div className="da-footer-divider" />

      {/* Main Footer Content */}
      <section className="da-footer-main">
        <div className="da-footer-brand">
          <a href="/" className="da-footer-logo">
            <img
              src="/assets/images/logo/logo2.webp"
              alt="Ampracore"
              className="da-footer-brand-logo"
            />
          </a>

          <p className="da-footer-description">
            Driven by innovation and modern technology, we craft
            scalable systems and seamless experiences that help
            businesses grow, evolve, and succeed in a rapidly
            changing world.
          </p>

          <a
            className="da-footer-email"
            href="mailto:ampracore@gmail.com"
          >
            <Mail size={19} strokeWidth={1.5} />
            <span>ampracore@gmail.com</span>
          </a>

          <div className="da-footer-socials">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="QUICK LINKS" links={quickLinks} />
        <FooterColumn title="SUPPORT" links={supportLinks} />
        <FooterColumn title="LEGAL" links={legalLinks} />
      </section>

      <div className="da-footer-bottom-divider" />

      {/* Bottom Footer */}
      <section className="da-footer-bottom">
        <p>
          © {new Date().getFullYear()} Ampracore. All rights reserved.
        </p>

        <div className="da-footer-tagline">
          <span className="da-footer-tagline-line" />
          <p>Build</p>
          <i>•</i>
          <p>Innovate</p>
          <i>•</i>
          <p>Grow</p>
        </div>
      </section>
    </footer>
  );
}
