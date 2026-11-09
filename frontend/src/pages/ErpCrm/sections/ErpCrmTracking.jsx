
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BarChart3, FileText, Users } from "lucide-react";
import { trackingItems } from "../erpCrmData";
import { Img, Pill, Reveal } from "../ErpCrmShared";
import "./ErpCrmTracking.css";

const icons = { bar: BarChart3, users: Users, file: FileText };

const trackingImages = [
  "/assets/images/erpcrm/tracking-1.webp",
  "/assets/images/erpcrm/tracking-2.webp",
  "/assets/images/erpcrm/tracking-3.webp",
];

const DURATION = 6500;

const HEADLINE = "Smarter Lead Tracking and Performance Analysis";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default function ErpCrmTracking() {
  const [activeId, setActiveId] = useState(trackingItems[0].id);
  const [seen, setSeen] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);

  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(null);

  const activeIndex = trackingItems.findIndex((i) => i.id === activeId);
  const playing = inView && !hovered && !focusPaused && !reduced;

  useEffect(() => {
    const node = sectionRef.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const goNext = useCallback(() => {
    const next = trackingItems[(activeIndex + 1) % trackingItems.length];
    setActiveId(next.id);
  }, [activeIndex]);

  const handleMove = (e) => {
    if (reduced || e.pointerType === "touch") return;

    const stage = stageRef.current;
    const frame = frameRef.current;

    if (!stage || !frame) return;

    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    frame.style.setProperty("--ry", `${((x - 0.5) * 10).toFixed(2)}deg`);
    frame.style.setProperty("--rx", `${((0.5 - y) * 8).toFixed(2)}deg`);
    frame.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    frame.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };

  const handleLeave = () => {
    const frame = frameRef.current;
    if (!frame) return;

    frame.style.setProperty("--ry", "0deg");
    frame.style.setProperty("--rx", "0deg");
  };

  const words = HEADLINE.split(" ");

  return (
    <section
      ref={sectionRef}
      className={`ec-section ec-track${seen ? " is-seen" : ""}`}
      data-play={String(playing)}
      data-motion={reduced ? "reduced" : "full"}
    >
      <div className="ec-wrap">
        <div
          className="ec-track-grid"
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={(e) => {
            if (e.target.matches(":focus-visible")) setFocusPaused(true);
          }}
          onBlur={() => setFocusPaused(false)}
        >
          <Reveal>
            <div className="ec-track-copy">
              <Pill>Discover more</Pill>

              <h2 aria-label={HEADLINE}>
                {words.map((word, i) => (
                  <React.Fragment key={`${word}-${i}`}>
                    <span className="ec-w" aria-hidden="true">
                      <span style={{ "--i": i }}>{word}</span>
                    </span>{" "}
                  </React.Fragment>
                ))}
              </h2>

              <p className="ec-lead">
                Monitor lead activity, track sales performance, and gain
                real-time insights to improve conversions and marketing
                effectiveness.
              </p>

              <div className="ec-track-list">
                {trackingItems.map((item, index) => {
                  const Icon = icons[item.icon];
                  const isActive = item.id === activeId;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`ec-track-item${isActive ? " is-active" : ""}`}
                      style={{ "--i": index }}
                      onClick={() => setActiveId(item.id)}
                      aria-pressed={isActive}
                    >
                      {isActive && (
                        <span
                          key={item.id}
                          className="ec-track-fill"
                          style={{ animationDuration: `${DURATION}ms` }}
                          onAnimationEnd={(e) => {
                            if (e.target === e.currentTarget) goNext();
                          }}
                        />
                      )}

                      <span className="ec-track-icon">
                        <Icon size={18} strokeWidth={1.9} />
                      </span>

                      <span className="ec-track-text">
                        <b>{item.title}</b>
                        <span className="ec-track-more">
                          <small>{item.text}</small>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div
              ref={stageRef}
              className="ec-track-stage"
              style={{ "--i": activeIndex }}
              onPointerMove={handleMove}
              onPointerLeave={handleLeave}
            >
              <span className="ec-track-halo" aria-hidden="true" />

              <div className="ec-track-float">
                <div ref={frameRef} className="ec-track-frame">
                  {trackingItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`ec-track-shot${
                        item.id === activeId ? " is-active" : ""
                      }`}
                      aria-hidden={item.id !== activeId}
                    >
                      <Img
                        src={trackingImages[index] || item.image}
                        alt={`${item.title} screen`}
                        label={item.title}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
