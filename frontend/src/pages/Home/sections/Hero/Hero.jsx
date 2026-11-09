import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import "./Hero.css";

/* =========================================
   WORD-BY-WORD TEXT ANIMATION
========================================= */

function Words({ text, start = 0, step = 0.08, soft = false }) {
  const words = text.split(" ");

  return words.map((word, index) => (
    <React.Fragment key={`${word}-${index}`}>
      <span className={soft ? "hero-w hero-w-soft" : "hero-w"}>
        <span
          className="hero-wi"
          style={{
            "--t": `${(start + index * step).toFixed(2)}s`,
          }}
        >
          {word}
        </span>
      </span>
      {index < words.length - 1 ? " " : ""}
    </React.Fragment>
  ));
}

/* =========================================
   LETTER-BY-LETTER ANIMATION
========================================= */

function Chars({ text, start = 0, step = 0.025 }) {
  return Array.from(text).map((char, index) => (
    <span
      key={`${char}-${index}`}
      className="hero-ch"
      style={{
        "--t": `${(start + index * step).toFixed(2)}s`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

/* =========================================
   ANIMATED COUNTER
========================================= */

function Counter({ end, suffix = "", duration = 1800, delay = 0 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let timer;
    let observer;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = window.setTimeout(() => {
            setStarted(true);
          }, delay);

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer?.disconnect();
      window.clearTimeout(timer);
    };
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }

    let raf;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(end * eased));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  return (
    <span ref={ref} className="hero-counter">
      {value}
      <small>{suffix}</small>
    </span>
  );
}

/* =========================================
   INTERACTIVE NETWORK GLOBE

   - Slow rotating network
   - Very subtle mouse-responsive particles
   - Smooth return when mouse leaves
   - Moving data pulses
   - TWO crossing solid orbit loops (mirrored tilt)
     each with its own glowing dot
========================================= */

function NetworkGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let angle = 0.6;
    let disposed = false;

    /*
     * The pointer has target coordinates and current coordinates.
     * This interpolation prevents sudden particle jumps.
     */
    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
      strength: 0,
    };

    const interactionSurface = canvas.parentElement;

    /* ----- Mouse / pointer interaction ----- */

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();

      pointer.targetX = event.clientX - rect.left;
      pointer.targetY = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    interactionSurface?.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    interactionSurface?.addEventListener(
      "pointerleave",
      handlePointerLeave,
      { passive: true }
    );

    /* ----- Network particles ----- */

    const count = window.innerWidth < 640 ? 240 : 420;

    const colors = [
      "196,16,31",
      "225,29,46",
      "255,92,108",
      "165,0,20",
    ];

    const points = Array.from({ length: count }, (_, index) => {
      const y = 1 - (index / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = index * 2.399963;

      const inner = Math.random() < 0.2;
      const scale = inner ? 0.35 + Math.random() * 0.4 : 1;

      return {
        x: Math.cos(theta) * radius * scale,
        y: y * scale,
        z: Math.sin(theta) * radius * scale,
        size: 0.8 + Math.random() * 1.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        hub: false,
        phase: Math.random() * Math.PI * 2,
      };
    });

    for (let i = 0; i < 10; i++) {
      points[Math.floor(Math.random() * count)].hub = true;
    }

    /* ----- Build network connections ----- */

    const maxLinkDistance = 0.27;
    const maxConnections = 5;
    const degrees = new Array(count).fill(0);
    const links = [];

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (
          degrees[i] >= maxConnections ||
          degrees[j] >= maxConnections
        ) {
          continue;
        }

        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dz = points[i].z - points[j].z;

        const distance = Math.sqrt(
          dx * dx + dy * dy + dz * dz
        );

        if (distance < maxLinkDistance) {
          links.push({ a: i, b: j, distance });
          degrees[i]++;
          degrees[j]++;
        }
      }
    }

    /* ----- Moving data pulses ----- */

    const pulses = Array.from({ length: 12 }, () => ({
      linkIndex: Math.floor(Math.random() * links.length),
      progress: Math.random(),
      speed: 0.004 + Math.random() * 0.007,
    }));

    /* ----- Orbit rings -----
     *
     * Ring 1: tilted one way  (-22deg) - top-right to bottom-left
     * Ring 2: MIRROR of ring 1 (+22deg) - top-left to bottom-right
     *
     * Both are solid, same size, same stroke.
     * Each has its own dot; the dots travel in opposite directions.
     */

    const rings = [
      {
        rx: 0.49,
        ry: 0.39,
        rotation: (-22 * Math.PI) / 180,
        speed: 0.004,
        angle: 0.6,
        dotSize: 4.5,
      },
      {
        rx: 0.49,
        ry: 0.39,
        rotation: (22 * Math.PI) / 180,
        speed: -0.004,
        angle: 3.8,
        dotSize: 4.5,
      },
    ];

    /* ----- Canvas sizing ----- */

    const resize = () => {
      if (disposed) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!pointer.active && pointer.strength === 0) {
        pointer.x = width / 2;
        pointer.y = height / 2;
        pointer.targetX = width / 2;
        pointer.targetY = height / 2;
      }
    };

    const tilt = 0.4;
    const cosX = Math.cos(tilt);
    const sinX = Math.sin(tilt);

    /* =========================================
       DRAW FRAME
    ========================================= */

    const draw = () => {
      if (!width || !height || disposed) return;

      ctx.clearRect(0, 0, width, height);

      const size = Math.min(width, height);
      const cx = width / 2;
      const cy = height / 2;

      const radius = size * 0.405;

      /* ----- Red atmospheric glow ----- */

      const halo = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.15,
        cx,
        cy,
        radius * 1.35
      );

      halo.addColorStop(0, "rgba(225,29,46,0.13)");
      halo.addColorStop(0.55, "rgba(225,29,46,0.055)");
      halo.addColorStop(1, "rgba(225,29,46,0)");

      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      /* ----- Orbit rings (both solid) ----- */

      rings.forEach((ring) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.rotation);

        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          ring.rx * size,
          ring.ry * size,
          0,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle = "rgba(196,16,31,0.32)";
        ctx.lineWidth = 1.15;
        ctx.setLineDash([]);
        ctx.stroke();

        ctx.restore();
      });

      /* ----- Rotate and project particles ----- */

      const cosY = Math.cos(angle);
      const sinY = Math.sin(angle);
      const projected = new Array(count);

      /*
       * Keep the mouse influence small.
       * The strength changes gradually instead of switching on/off.
       */
      const hoverRadius = Math.min(190, size * 0.36);
      const mouseStrength = pointer.strength;

      for (let i = 0; i < count; i++) {
        const point = points[i];

        const rotatedX = point.x * cosY + point.z * sinY;
        const rotatedZ = -point.x * sinY + point.z * cosY;

        const rotatedY = point.y * cosX - rotatedZ * sinX;
        const depthZ = point.y * sinX + rotatedZ * cosX;

        const perspective = 1 + depthZ * 0.12;

        let x = cx + rotatedX * radius * perspective;
        let y = cy + rotatedY * radius * perspective;

        /*
         * VERY LIGHT HOVER EFFECT
         *
         * The particles move only a few pixels around the pointer.
         * There is no large push or sudden gap between the stars.
         */
        if (mouseStrength > 0.001) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const influence = Math.max(
            0,
            1 - distance / hoverRadius
          );

          if (distance > 0.001 && influence > 0) {
            const force = influence * influence * mouseStrength;

            const push = 6 * force;
            const swirl = 2.2 * force;

            const nx = dx / distance;
            const ny = dy / distance;

            x += nx * push - ny * swirl;
            y += ny * push + nx * swirl;
          }
        }

        /* Gentle ambient motion */

        x += Math.sin(point.phase + angle * 2) * 0.22;
        y += Math.cos(point.phase + angle * 2) * 0.22;

        projected[i] = {
          x,
          y,
          z: depthZ,
        };
      }

      /* ----- Connecting network lines ----- */

      ctx.lineWidth = 0.8;

      for (let i = 0; i < links.length; i++) {
        const link = links[i];

        const a = projected[link.a];
        const b = projected[link.b];

        const depth =
          0.2 +
          0.8 * (((a.z + b.z) / 2 + 1) / 2);

        const baseAlpha =
          (1 - link.distance / maxLinkDistance) *
            0.68 *
            depth +
          0.045;

        ctx.strokeStyle = `rgba(196,16,31,${baseAlpha.toFixed(3)})`;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      /* ----- Network particles and hubs ----- */

      const unit = radius / 150;

      for (let i = 0; i < count; i++) {
        const point = points[i];
        const projectedPoint = projected[i];

        const depth =
          0.32 + 0.68 * ((projectedPoint.z + 1) / 2);

        const dotRadius =
          point.size *
          (0.75 + (projectedPoint.z + 1) * 0.45) *
          unit;

        if (point.hub) {
          const glow = ctx.createRadialGradient(
            projectedPoint.x,
            projectedPoint.y,
            0,
            projectedPoint.x,
            projectedPoint.y,
            dotRadius * 5
          );

          glow.addColorStop(
            0,
            `rgba(225,29,46,${(0.48 * depth).toFixed(3)})`
          );

          glow.addColorStop(1, "rgba(225,29,46,0)");

          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(
            projectedPoint.x,
            projectedPoint.y,
            dotRadius * 5,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${point.color},${depth.toFixed(3)})`;

        ctx.beginPath();
        ctx.arc(
          projectedPoint.x,
          projectedPoint.y,
          point.hub ? dotRadius * 1.8 : dotRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      /* ----- Bright pulses travelling along connections ----- */

      pulses.forEach((pulse) => {
        const link = links[pulse.linkIndex];
        if (!link) return;

        const a = projected[link.a];
        const b = projected[link.b];

        const x = a.x + (b.x - a.x) * pulse.progress;
        const y = a.y + (b.y - a.y) * pulse.progress;

        ctx.fillStyle = "rgba(255,255,255,0.98)";
        ctx.shadowColor = "rgba(225,29,46,0.85)";
        ctx.shadowBlur = 7;

        ctx.beginPath();
        ctx.arc(x, y, Math.max(1.3, unit * 1.5), 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      });

      /* ----- Orbiting red nodes (one on each ring) ----- */

      rings.forEach((ring) => {
        const localX = Math.cos(ring.angle) * ring.rx * size;
        const localY = Math.sin(ring.angle) * ring.ry * size;

        const x =
          cx +
          localX * Math.cos(ring.rotation) -
          localY * Math.sin(ring.rotation);

        const y =
          cy +
          localX * Math.sin(ring.rotation) +
          localY * Math.cos(ring.rotation);

        ctx.fillStyle = "#e11d2e";
        ctx.shadowColor = "rgba(225,29,46,0.8)";
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(x, y, ring.dotSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      });
    };

    /* =========================================
       ANIMATION LOOP
    ========================================= */

    const animate = () => {
      if (disposed) return;

      if (visible) {
        /*
         * Ease the pointer toward the current mouse position.
         * This is what keeps the interaction soft and natural.
         */
        pointer.x += (pointer.targetX - pointer.x) * 0.075;
        pointer.y += (pointer.targetY - pointer.y) * 0.075;

        const targetStrength = pointer.active ? 1 : 0;

        pointer.strength +=
          (targetStrength - pointer.strength) * 0.045;

        angle += pointer.active ? 0.0022 : 0.0015;

        rings.forEach((ring) => {
          ring.angle += ring.speed;
        });

        pulses.forEach((pulse) => {
          pulse.progress += pulse.speed;

          if (pulse.progress >= 1) {
            pulse.progress = 0;
            pulse.linkIndex = Math.floor(
              Math.random() * links.length
            );
          }
        });

        draw();
      }

      raf = requestAnimationFrame(animate);
    };

    resize();
    draw();

    if (!reducedMotion) {
      raf = requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });

    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    intersectionObserver.observe(canvas);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);

      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      interactionSurface?.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      interactionSurface?.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      aria-hidden="true"
    />
  );
}

/* =========================================
   STATISTICS
========================================= */

const stats = [
  { end: 10, suffix: "+", label: "Years of Experience" },
  { end: 100, suffix: "+", label: "Businesses Served" },
  { end: 99, suffix: "%", label: "Uptime Guaranteed" },
  { end: 24, suffix: "/7", label: "Technical Support" },
];

/* =========================================
   HERO COMPONENT
========================================= */

export default function Hero() {
  return (
    <section className="hero">
      {/* Background effects */}

      <div className="hero-bg-glow hero-bg-glow-1" />
      <div className="hero-bg-glow hero-bg-glow-2" />

      <div className="hero-container">
        {/* ========== LEFT CONTENT ========== */}

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-row">
              <Words
                text="Run your business"
                start={0.45}
                step={0.1}
              />
            </span>

            <span className="hero-row hero-row-accent">
              <Words
                text="on one intelligent platform."
                start={0.9}
                step={0.08}
              />
            </span>
          </h1>

          <p className="hero-desc">
            <Words
              soft
              start={1.3}
              step={0.035}
              text="Fast, secure and economical software for Pakistani businesses — from Cloud ERP and HRMS to AI automations, websites and FBR-integrated POS."
            />
          </p>

          {/* Single primary action button */}

          <div className="hero-actions">
            <a href="/services" className="hero-btn hero-btn-primary">
              <span className="hero-btn-shine" />
              <span>Explore Services</span>
              <ArrowRight size={17} />
            </a>
          </div>

          {/* Statistics */}

          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div
                className="hero-stat"
                key={stat.label}
                style={{ "--s": `${2.2 + index * 0.14}s` }}
              >
                <strong>
                  <Counter
                    end={stat.end}
                    suffix={stat.suffix}
                    delay={2200 + index * 140}
                  />
                </strong>

                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ========== RIGHT NETWORK GLOBE ========== */}

        <div className="hero-visual">
          <div className="hero-orb">
            <NetworkGlobe />

            <div className="hero-pill hero-pill-1">
              <span>AI</span>
            </div>

            <div className="hero-pill hero-pill-2">
              <span>ERP</span>
            </div>

            <div className="hero-pill hero-pill-3">
              <span>CRM</span>
            </div>

            <div className="hero-pill hero-pill-5">
              <span>Mobile Applications</span>
            </div>

            <div className="hero-pill hero-pill-main">
              <span>MRP</span>
            </div>

            <div className="hero-pill hero-pill-4">
              <span>Sales Point System</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}