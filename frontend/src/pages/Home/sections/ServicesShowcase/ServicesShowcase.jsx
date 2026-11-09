import { useEffect, useRef } from "react";
import "./ServicesShowcase.css";

/* =========================================
   CARD 1 — Interactive particle network
   (dots drift, mouse pushes them away and
   draws a glowing web between nearby dots)
========================================= */
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const card = canvas.closest(".ss-card");
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const color = getComputedStyle(canvas).color || "#dccfff";

    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    let visible = true;
    let pts = [];
    const mouse = { x: -999, y: -999, on: false };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.max(30, Math.min(70, (w * h) / 5200)));
      pts = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h * 0.6;
        return {
          bx: x,
          by: y,
          x,
          y,
          vx: 0,
          vy: 0,
          ph: Math.random() * Math.PI * 2,
          r: 0.9 + Math.random() * 1.2,
        };
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8;

      /* physics */
      for (const p of pts) {
        const tx = p.bx + Math.sin(t * 1.3 + p.ph) * 8;
        const ty = p.by + Math.cos(t * 1.1 + p.ph) * 8;
        p.vx += (tx - p.x) * 0.03;
        p.vy += (ty - p.y) * 0.03;

        if (mouse.on) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < 85) {
            const f = (85 - d) / 85;
            p.vx += (dx / d) * f * 2.2;
            p.vy += (dy / d) * f * 2.2;
          }
        }

        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
      }

      /* dot-to-dot lines */
      for (let i = 0; i < pts.length; i += 1) {
        for (let j = i + 1; j < pts.length; j += 1) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 72) {
            ctx.globalAlpha = (1 - d / 72) * 0.36;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      /* mouse glow + web */
      if (mouse.on) {
        const g = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          110
        );
        g.addColorStop(0, "rgba(190, 160, 255, 0.34)");
        g.addColorStop(1, "rgba(190, 160, 255, 0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - 110, mouse.y - 110, 220, 220);
        ctx.fillStyle = color;

        for (const p of pts) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < 150) {
            ctx.globalAlpha = (1 - d / 150) * 0.85;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      /* dots */
      for (const p of pts) {
        const near = mouse.on
          ? Math.max(0, 1 - Math.hypot(p.x - mouse.x, p.y - mouse.y) / 130)
          : 0;
        ctx.globalAlpha = Math.min(
          1,
          0.45 + 0.4 * Math.abs(Math.sin(t * 1.6 + p.ph)) + near * 0.4
        );
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (1 + near * 1.7), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      t += 0.012;
      render();
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.on = true;
    };
    const onLeave = () => {
      mouse.on = false;
    };

    build();
    render();

    const ro = new ResizeObserver(() => {
      build();
      render();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    if (!reduce) {
      raf = requestAnimationFrame(loop);
      card?.addEventListener("pointermove", onMove);
      card?.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      card?.removeEventListener("pointermove", onMove);
      card?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="ss-particles" aria-hidden="true" />;
}

/* =========================================
   CARD 2 — Growing bars + trend line + runner
========================================= */
function BarsVisual() {
  const heights = [50, 80, 115, 160];

  return (
    <div className="ss-visual" aria-hidden="true">
      <div className="ss-bars">
        {heights.map((h, i) => (
          <span
            key={h}
            className="ss-bar"
            style={{ "--h": `${h}px`, "--i": i }}
          />
        ))}

        <svg className="ss-bars__trend" viewBox="0 0 182 170">
          <path
            className="ss-bars__line"
            pathLength="100"
            d="M19 106 L67 76 L115 41 L163 -4"
          />
        </svg>
        <span className="ss-bars__dot" />
      </div>
    </div>
  );
}

/* =========================================
   CARD 3 — Glass cube that "explodes" on hover
========================================= */
const cubeFaces = [
  "rotateY(0deg)",
  "rotateY(90deg)",
  "rotateY(180deg)",
  "rotateY(270deg)",
  "rotateX(90deg)",
  "rotateX(-90deg)",
];

function CubeVisual() {
  return (
    <div className="ss-visual" aria-hidden="true">
      <div className="ss-cube">
        <div className="ss-cube__tilt">
          <div className="ss-cube__spin">
            {cubeFaces.map((rot) => (
              <span key={rot} className="ss-face" style={{ "--rot": rot }} />
            ))}
            <span className="ss-cube__core" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   CARD 4 — Wire globe with orbiting satellites
========================================= */
const meridians = [0, 30, 60, 90, 120, 150];
const latitudes = [
  { s: 150, y: 0 },
  { s: 130, y: 37.5 },
  { s: 130, y: -37.5 },
  { s: 75, y: 65 },
  { s: 75, y: -65 },
];

function GlobeVisual() {
  return (
    <div className="ss-visual" aria-hidden="true">
      <div className="ss-globe">
        <span className="ss-globe__core" />
        <span className="ss-globe__ping" />
        <span className="ss-globe__ping ss-globe__ping--b" />

        <div className="ss-globe__tilt">
          <div className="ss-globe__spin">
            {meridians.map((r) => (
              <span
                key={r}
                className="ss-meridian"
                style={{ transform: `rotateY(${r}deg)` }}
              />
            ))}
            {latitudes.map((l) => (
              <span
                key={`${l.s}-${l.y}`}
                className="ss-lat"
                style={{
                  width: l.s,
                  height: l.s,
                  marginLeft: -l.s / 2,
                  marginTop: -l.s / 2,
                  transform: `rotateX(90deg) translateZ(${l.y}px)`,
                }}
              />
            ))}
          </div>

          <span className="ss-orbit ss-orbit--a">
            <i />
          </span>
          <span className="ss-orbit ss-orbit--b">
            <i />
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   DATA
========================================= */
const services = [
  {
    id: "erp",
    title: "ERP / CRM / MRP",
    text: "A complete system to manage business operations, customer relationships, and production processes in one integrated solution.",
    tags: [
      "Resource Planning",
      "Analytics & Reporting",
      "Business Process Management",
      "Automation",
      "System Integration",
      "Digital Operations",
    ],
    Visual: ParticleField,
  },
  {
    id: "ai",
    title: "AI Automation",
    text: "We build smart AI systems that automate tasks, improve efficiency, and make business processes faster, smarter, and more intelligent.",
    tags: [
      "Smart Systems",
      "Process Optimization",
      "Cognitive Process Systems",
      "Automation",
      "Data Processing",
      "Intelligent Systems",
    ],
    Visual: BarsVisual,
  },
  {
    id: "mobile",
    title: "Mobile Application",
    text: "We provide end-to-end application development services focused on performance, usability, and seamless digital experiences.",
    tags: [
      "Next Gen Apps",
      "Tech Ecosystem",
      "Seamless Mobile Systems",
      "Integration",
      "Modern Interfaces",
      "Digital Operations",
    ],
    Visual: CubeVisual,
  },
  {
    id: "pos",
    title: "Sale Point",
    text: "We deliver smart point of sale systems that streamline billing, manage inventory, and ensure real-time business control with ease.",
    tags: [
      "Retail Solutions",
      "Billing Systems",
      "Transaction Management",
      "Checkout",
      "Sales Tracking",
      "Inventory Control",
    ],
    Visual: GlobeVisual,
  },
];

/* =========================================
   MAIN
========================================= */
export default function ServicesShowcase() {
  const handleMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  const handleLeave = (e) => {
    e.currentTarget.style.setProperty("--mx", 0);
    e.currentTarget.style.setProperty("--my", 0);
  };

  return (
    <section className="ss" aria-label="Our services">
      <div className="ss__grid">
        {services.map((s) => {
          const Visual = s.Visual;
          return (
            <article
              key={s.id}
              className={`ss-card ss-card--${s.id}`}
              tabIndex={0}
              onPointerMove={handleMove}
              onPointerLeave={handleLeave}
            >
              <div className="ss-card__bg" />
              <Visual />
              <div className="ss-card__shine" />

              <div className="ss-card__body">
                <h3 className="ss-card__title">{s.title}</h3>
                <p className="ss-card__text">{s.text}</p>

                <div className="ss-card__more">
                  <div className="ss-card__more-in">
                    <ul className="ss-tags">
                      {s.tags.map((tag, i) => (
                        <li key={tag} style={{ "--i": i }}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}