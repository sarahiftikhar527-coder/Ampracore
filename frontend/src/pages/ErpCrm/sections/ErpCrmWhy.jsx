import React, { useCallback } from "react";
import { Bot, LayoutGrid, LineChart, Link2 } from "lucide-react";
import { whyItems } from "../erpCrmData";
import { Pill, Reveal } from "../ErpCrmShared";
import "./ErpCrmWhy.css";

const icons = {
  link: Link2,
  bot: Bot,
  grid: LayoutGrid,
  chart: LineChart,
};

function WhyCard({ item, index }) {
  const Icon = icons[item.icon] || Link2;

  // Mouse follow spotlight
  const handleMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <article className="ec-why-card" onMouseMove={handleMove}>
      <span className="ec-why-index">{String(index + 1).padStart(2, "0")}</span>

      <span className="ec-icon">
        <Icon size={26} strokeWidth={2.1} />
      </span>

      <h3>{item.title}</h3>
      <p>{item.text}</p>

      <span className="ec-why-line" />
    </article>
  );
}

export default function ErpCrmWhy() {
  return (
    <section className="ec-section ec-why">
      {/* Background decoration */}
      <span className="ec-why-blob ec-why-blob--a" aria-hidden="true" />
      <span className="ec-why-blob ec-why-blob--b" aria-hidden="true" />
      <span className="ec-why-grid-bg" aria-hidden="true" />

      <div className="ec-wrap">
        <div className="ec-why-layout">
          {/* LEFT */}
          <Reveal className="ec-why-head">
            <div className="ec-why-sticky">
              

              <h2>
                Built for Operational <em>Clarity</em>
              </h2>

              <p className="ec-lead">
                A clean and connected ecosystem that helps businesses simplify
                complexity, improve productivity, and scale efficiently without
                switching between multiple systems.
              </p>

              <div className="ec-why-stats">
                <div className="ec-why-stat">
                  <strong>{String(whyItems.length).padStart(2, "0")}</strong>
                  <span>Core Advantages</span>
                </div>
                <div className="ec-why-stat">
                  <strong>01</strong>
                  <span>Connected Platform</span>
                </div>
                <div className="ec-why-stat">
                  <strong>360°</strong>
                  <span>Business Visibility</span>
                </div>
              </div>

              <div className="ec-why-orbit" aria-hidden="true">
                <span className="ec-ring ec-ring--1">
                  <i />
                </span>
                <span className="ec-ring ec-ring--2">
                  <i />
                </span>
                <span className="ec-ring ec-ring--3">
                  <i />
                </span>
                <span className="ec-why-core">
                  <LayoutGrid size={22} strokeWidth={2.2} />
                </span>
              </div>
            </div>
          </Reveal>

          {/* RIGHT */}
          <div className="ec-why-grid">
            {whyItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 110}>
                <WhyCard item={item} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}