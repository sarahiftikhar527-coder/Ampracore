import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, PieChart, Users } from "lucide-react";
import { Reveal } from "../ErpCrmShared";
import "./ErpCrmInsights.css";

/* Section screen par aaye to true ho jata hai (sirf ek baar) */
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* Number count-up animation */
function useCountUp(end, active, duration = 1800, decimals = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setValue(end);
      return undefined;
    }

    let raf = 0;
    let start = null;

    const tick = (now) => {
      if (start === null) start = now;
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(end * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, active, duration]);

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value);
}

function Word({ children, i }) {
  return (
    <span className="ec-ins-w" style={{ "--i": i }}>
      <span>{children}</span>
    </span>
  );
}

const BARS = [38, 62, 46, 78, 58, 92];

export default function ErpCrmInsights() {
  const [sectionRef, live] = useInView(0.25);
  const visualRef = useRef(null);

  const percent = useCountUp(96, live, 2000);
  const clients = useCountUp(329, live, 1800);
  const impression = useCountUp(33, live, 1800);
  const earnings = useCountUp(7986.1, live, 2200, 2);

  const earningsText = Number(earnings).toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  /* Mouse parallax + tilt */
  const handleMove = useCallback((e) => {
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;
    const el = visualRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--px", x.toFixed(3));
    el.style.setProperty("--py", y.toFixed(3));
  }, []);

  const handleLeave = useCallback(() => {
    const el = visualRef.current;
    if (!el) return;
    el.style.setProperty("--px", 0);
    el.style.setProperty("--py", 0);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`ec-section ec-ins ${live ? "is-live" : ""}`}
    >
      {/* Background decoration */}
      <span className="ec-ins-blob ec-ins-blob--a" aria-hidden="true" />
      <span className="ec-ins-blob ec-ins-blob--b" aria-hidden="true" />
      <span className="ec-ins-dots" aria-hidden="true" />

      <div className="ec-wrap ec-ins-grid">
        {/* LEFT */}
        <Reveal>
          <div className="ec-ins-copy">
            <h2>
              <span className="ec-ins-line">
                <Word i={0}>More</Word> <Word i={1}><em>Visibility.</em></Word>
              </span>
              <span className="ec-ins-line">
                <Word i={2}>Better</Word>
              </span>
              <span className="ec-ins-line">
                <Word i={3}><em>Decisions.</em></Word>
              </span>
            </h2>

            <p className="ec-lead">
              Access real-time insights across sales, operations, inventory,
              and production from a single dashboard.
            </p>

            <a href="/contact" className="ec-btn ec-btn-red ec-ins-btn">
              <span>Request a custom plan</span>
              <ArrowRight size={18} strokeWidth={2.4} />
            </a>
          </div>
        </Reveal>

        {/* RIGHT */}
        <Reveal delay={140} className="ec-ins-stage">
          <div
            className="ec-ins-hit"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <div className="ec-ins-visual" ref={visualRef}>
              {/* decorative rings */}
              <span className="ec-ins-ring ec-ins-ring--1" aria-hidden="true" />
              <span className="ec-ins-ring ec-ins-ring--2" aria-hidden="true">
                <i />
              </span>
              <span className="ec-ins-glow" aria-hidden="true" />

              {/* New clients */}
              <div className="ec-mini ec-mini-clients" style={{ "--d": 34 }}>
                <span className="ec-mini-icon ec-mini-icon-solid">
                  <Users size={20} />
                </span>
                <div>
                  <small>New clients</small>
                  <b>{clients}+</b>
                </div>
                <svg viewBox="0 0 100 34" className="ec-spark">
                  <defs>
                    <linearGradient id="ecSparkFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d4192a" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#d4192a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    className="ec-spark-area"
                    points="0,28 20,22 38,27 60,12 80,16 100,5 100,34 0,34"
                  />
                  <polyline
                    pathLength="1"
                    points="0,28 20,22 38,27 60,12 80,16 100,5"
                  />
                </svg>
              </div>

              {/* Main donut card */}
              <div className="ec-ins-main">
                <span className="ec-live-badge">
                  <i /> Live
                </span>

                <div className="ec-donut">
                  <svg viewBox="0 0 200 200">
                    <defs>
                      <linearGradient
                        id="ecInsGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#ff4d5e" />
                        <stop offset="100%" stopColor="#a40012" />
                      </linearGradient>
                    </defs>
                    <circle className="ec-donut-ticks" cx="100" cy="100" r="97" />
                    <circle className="ec-donut-bg" cx="100" cy="100" r="82" />
                    <circle
                      className="ec-donut-bar"
                      cx="100"
                      cy="100"
                      r="82"
                    />
                  </svg>
                  <span>{percent}%</span>
                </div>

                <ul className="ec-legend">
                  <li>
                    <i className="ec-dot-soft" /> 32% Losses 2021
                  </li>
                  <li>
                    <i /> <b>154</b> Sales 2021
                  </li>
                </ul>

                <p>
                  Get the best out of your customer support{" "}
                  <strong>Ampracore</strong>
                </p>
              </div>

              {/* Impression */}
              <div
                className="ec-mini ec-mini-impression"
                style={{ "--d": -26 }}
              >
                <span className="ec-mini-icon">
                  <PieChart size={20} />
                </span>
                <div>
                  <small>Impression</small>
                  <b>{impression}K</b>
                </div>
              </div>

              {/* Earnings */}
              <div className="ec-mini ec-mini-earnings" style={{ "--d": 22 }}>
                <span className="ec-mini-icon">
                  <BarChart3 size={20} />
                </span>
                <div>
                  <small>Earnings</small>
                  <b>£{earningsText}</b>
                </div>
                <span className="ec-bars" aria-hidden="true">
                  {BARS.map((h, i) => (
                    <i key={i} style={{ "--h": `${h}%`, "--i": i }} />
                  ))}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}