
import React, { useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Img } from "../PortfolioShared";
import "./PortfolioCaseStudy.css";

export default function PortfolioCaseStudy({
  project,
  onClose,
  onPrev,
  onNext,
}) {
  const closeRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
      if (event.key === "ArrowLeft") onPrev?.();
      if (event.key === "ArrowRight") onNext?.();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [project.id]);

  return (
    <div
      className="pf-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <article className="pf-sheet" ref={scrollRef}>
        <header className="pf-sheet-bar">
          <Link
            to="/"
            className="pf-sheet-brand"
            onClick={onClose}
            aria-label="DigiAmplify home"
          >
            DigiAmplify<span>.</span>
          </Link>

          <div className="pf-sheet-actions">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous project"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next project"
            >
              <ChevronRight size={18} />
            </button>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close case study"
            >
              <X size={19} />
            </button>
          </div>
        </header>

        <div className="pf-sheet-content" key={project.id}>
          <section className="pf-project-heading">
            <div className="pf-project-kicker">
              <span className="pf-kicker-line" />
              <span>{project.categoryLabel}</span>
            </div>

            <h1>{project.title}</h1>

            <p className="pf-sheet-lead">{project.short}</p>

            <div className="pf-project-meta">
              <div>
                <span className="pf-meta-label">Industry</span>
                <span className="pf-meta-value">{project.industry}</span>
              </div>

              <div>
                <span className="pf-meta-label">Timeline</span>
                <span className="pf-meta-value">{project.timeline}</span>
              </div>

              <div>
                <span className="pf-meta-label">Technology</span>
                <span className="pf-meta-value">
                  {project.stack.join(" · ")}
                </span>
              </div>
            </div>
          </section>

          <section className="pf-project-visual">
            <div className="pf-frame">
              <Img
                src={project.image}
                alt={project.title}
                label={project.title}
              />
            </div>
            <span className="pf-image-caption">
              PROJECT OVERVIEW <span> / </span> {project.title}
            </span>
          </section>

          <section className="pf-project-details">
            <div className="pf-details-main">
              <section className="pf-detail-section">
                <span className="pf-section-number">01</span>
                <div>
                  <h2>The approach</h2>
                  <p>{project.approach}</p>
                </div>
              </section>

              <section className="pf-detail-section">
                <span className="pf-section-number">02</span>
                <div>
                  <h2>The solution</h2>
                  <ul className="pf-list">
                    {project.solution.map((item) => (
                      <li key={item}>
                        <Check size={16} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="pf-detail-section">
                <span className="pf-section-number">03</span>
                <div>
                  <h2>The outcome</h2>
                  <ul className="pf-list pf-outcome-list">
                    {project.outcomes.map((item) => (
                      <li key={item}>
                        <ArrowUpRight size={16} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            <aside className="pf-project-sidebar">
              <span className="pf-sidebar-label">BUILT WITH</span>

              <div className="pf-stack-list">
                {project.stack.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>

              <div className="pf-sidebar-divider" />

              <p>
                Have a similar project in mind? Let's discuss how we can
                bring your idea to life.
              </p>

              <Link
                to="/contact"
                className="pf-btn"
                onClick={onClose}
              >
                Start a project
                <ArrowRight size={17} />
              </Link>
            </aside>
          </section>

          <footer className="pf-sheet-footer">
            <span>DIGIAMPLIFY <span className="pf-footer-dot">/</span> CASE STUDY</span>
            <button type="button" onClick={onClose}>
              Back to projects <ArrowRight size={15} />
            </button>
          </footer>
        </div>
      </article>
    </div>
  );
}
