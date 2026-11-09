
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import "./MissionVision.css";

const ringShape = "/assets/images/home/shape-ring.webp";
const gemShape = "/assets/images/home/shape-cube.webp";
const missionImage = "/assets/images/home/mission-image.webp";

const VIDEO_SRC = "";

const items = [
  {
    label: "01",
    title: "Mission",
    text: "Our mission is to transform businesses through intelligent digital solutions that blend innovation, automation, and modern technology into seamless experiences. From ERP and CRM systems to AI automation, mobile applications, and point of sale solutions, we create scalable systems that inspire growth, simplify operations, and shape the future of digital business.",
  },
  {
    label: "02",
    title: "Vision",
    text: "Our vision is to shape the future of digital business through innovative technology, intelligent systems, and seamless digital experiences. We strive to create scalable solutions that empower businesses, inspire growth, and drive long-term success in an evolving digital world.",
  },
];

function PlayBadge({ onClick }) {
  const inner = (
    <>
      <svg className="mv-play__text" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path
            id="mvCircle"
            d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
          />
        </defs>
        <text>
          <textPath
            href="#mvCircle"
            textLength="284"
            lengthAdjust="spacing"
          >
            WATCH OUR PORTFOLIO • OUR SERVICES •{" "}
          </textPath>
        </text>
      </svg>

      <span className="mv-play__btn">
        <Play size={18} fill="currentColor" strokeWidth={0} />
      </span>
    </>
  );

  return VIDEO_SRC ? (
    <button
      type="button"
      className="mv-play"
      onClick={onClick}
      aria-label="Watch our video"
    >
      {inner}
    </button>
  ) : (
    <Link className="mv-play" to="/portfolio" aria-label="Watch our portfolio">
      {inner}
    </Link>
  );
}

export default function MissionVision() {
  const sectionRef = useRef(null);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!canHover || reduceMotion) return undefined;

    let raf = 0;

    const onMove = (event) => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        el.style.setProperty("--mx", x.toFixed(3));
        el.style.setProperty("--my", y.toFixed(3));
      });
    };

    const onLeave = () => {
      el.style.setProperty("--mx", 0);
      el.style.setProperty("--my", 0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!videoOpen) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setVideoOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [videoOpen]);

  return (
    <section className="mv" id="mission-vision" ref={sectionRef}>
      <div className="mv__shape mv__shape--left" aria-hidden="true">
        <img src={ringShape} alt="" draggable="false" />
      </div>

      <div className="mv__shape mv__shape--right" aria-hidden="true">
        <img src={gemShape} alt="" draggable="false" />
      </div>

      <div className="mv__container">
        <div className="mv__media" data-r="left">
          <div className="mv__photo">
            <img src={missionImage} alt="Our team at work" />
            <span className="mv__photo-shade" />
          </div>

          <PlayBadge onClick={() => setVideoOpen(true)} />
        </div>

        <div className="mv__content">
          <p className="mv__eyebrow" data-r="up" style={{ "--d": "80ms" }}>
            Our purpose
          </p>

          <h2 className="mv__heading" data-r="up" style={{ "--d": "160ms" }}>
            Driven by purpose, <em>built for growth</em>
          </h2>

          <div className="mv__list">
            {items.map((item, index) => (
              <article
                className="mv-card"
                key={item.title}
                data-r="right"
                style={{ "--d": `${260 + index * 140}ms` }}
              >
                <span className="mv-card__num">{item.label}</span>

                <div className="mv-card__body">
                  <h3 className="mv-card__title">{item.title}</h3>
                  <p className="mv-card__text">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {videoOpen && VIDEO_SRC && (
        <div
          className="mv-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setVideoOpen(false)}
        >
          <button
            type="button"
            className="mv-modal__close"
            aria-label="Close video"
            onClick={() => setVideoOpen(false)}
          >
            <X size={22} />
          </button>

          <div
            className="mv-modal__box"
            onClick={(event) => event.stopPropagation()}
          >
            <video src={VIDEO_SRC} controls autoPlay playsInline />
          </div>
        </div>
      )}
    </section>
  );
}
