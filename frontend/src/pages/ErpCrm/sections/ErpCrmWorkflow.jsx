
import React, { useEffect, useRef, useState } from "react";
import { Img } from "../ErpCrmShared";
import "./ErpCrmWorkflow.css";

const shots = [
  {
    src: "/assets/images/erpcrm/workflow-1.webp",
    alt: "Quotations dashboard of the ERP system",
  },
  {
    src: "/assets/images/erpcrm/workflow-2.webp",
    alt: "Sales orders screen of the ERP system",
  },
  {
    src: "/assets/images/erpcrm/workflow-3.webp",
    alt: "Production planning screen of the ERP system",
  },
];

const FLIP_START = 0.3;
const FLIP_END = 0.8;
const TAIL = 0.5;
const COUNT = shots.length;
const TOTAL = COUNT - 2 + FLIP_END + TAIL;

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const ease = (x) => x * x * (3 - 2 * x);

const flipOf = (t, i) =>
  i >= COUNT - 1
    ? 0
    : ease(clamp((t - i - FLIP_START) / (FLIP_END - FLIP_START), 0, 1));

export default function ErpCrmWorkflow() {
  const wrapRef = useRef(null);
  const [t, setT] = useState(0);
  const [mode, setMode] = useState("before");

  useEffect(() => {
    shots.forEach((shot) => {
      const img = new Image();
      img.src = shot.src;
    });
  }, []);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = wrapRef.current;
      if (!el) return;

      const distance = el.offsetHeight - window.innerHeight;
      const scrolled = -el.getBoundingClientRect().top;

      if (scrolled <= 0) {
        setMode("before");
        setT(0);
      } else if (distance <= 0 || scrolled >= distance) {
        setMode("after");
        setT(TOTAL);
      } else {
        setMode("pinned");
        setT((scrolled / distance) * TOTAL);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const flips = shots.map((_, i) => flipOf(t, i));

  const active = Math.min(
    COUNT - 1,
    flips.filter((f, i) => i < COUNT - 1 && f >= 0.5).length
  );

  const firstUnflipped = flips.findIndex(
    (f, i) => i >= COUNT - 1 || f < 1
  );

  const goTo = (index) => {
    const el = wrapRef.current;
    if (!el) return;

    const distance = el.offsetHeight - window.innerHeight;
    if (distance <= 0) return;

    const top = el.getBoundingClientRect().top + window.scrollY;
    const target = ((index + 0.1) / TOTAL) * distance;

    window.scrollTo({
      top: top + target,
      behavior: "smooth",
    });
  };

  return (
    <section className="ec-workflow" ref={wrapRef}>
      <div className={`ec-workflow-stage is-${mode}`}>
        <div className="ec-workflow-inner">
          <div className="ec-workflow-head">
            <h2>
              The Easier Way to Manage
              <br />
              Your <em>Entire Workflow</em>
            </h2>

            <p className="ec-lead ec-lead-centered">
              Streamline operations, customer management, and production
              processes with one integrated ERP, CRM, and MRP platform
              built for modern businesses.
            </p>
          </div>

          <div className="ec-window">
            <div className="ec-window-bar">
              <i />
              <i />
              <i />
              <span className="ec-window-title">
                {shots[active].label}
              </span>
            </div>

            <div className="ec-window-body">
              {shots.map((shot, i) => {
                const flip = flips[i];
                const prevFlip = i > 0 ? flips[i - 1] : 1;
                const hidden = flip >= 1 || i > firstUnflipped + 1;
                const scale = 0.94 + 0.06 * prevFlip;
                const shade = Math.max(
                  flip * 0.45,
                  i > 0 ? (1 - prevFlip) * 0.35 : 0
                );

                return (
                  <div
                    key={shot.src}
                    className="ec-shot"
                    aria-hidden={i !== active}
                    style={{
                      zIndex: COUNT - i,
                      visibility: hidden ? "hidden" : "visible",
                      transform: `rotateX(${(-flip * 112).toFixed(
                        2
                      )}deg) scale(${scale.toFixed(4)})`,
                    }}
                  >
                    <Img
                      src={shot.src}
                      alt={shot.alt}
                      label={shot.label}
                    />
                    <span
                      className="ec-shot-shade"
                      style={{ opacity: shade }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ec-steps" role="tablist">
            {shots.map((shot, i) => {
              const start = i === 0 ? 0 : i - 0.5;
              const end = i === COUNT - 1 ? TOTAL : i + 0.5;
              const fill =
                clamp((t - start) / (end - start), 0, 1) * 100;

              return (
                <button
                  key={shot.label}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`ec-step ${
                    i === active ? "is-active" : ""
                  }`}
                  onClick={() => goTo(i)}
                >
                 
                 
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
