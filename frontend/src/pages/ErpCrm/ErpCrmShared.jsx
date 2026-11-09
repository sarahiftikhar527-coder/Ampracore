import React, { useEffect, useRef, useState } from "react";

/* Screenshot / photo with safe fallback */

export function Img({ src, alt, label = "Preview", className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`ec-fallback ${className}`}
        role="img"
        aria-label={alt}
      >
        <span>{label}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

/* 3D shape image, falls back to a CSS-made shape */

export function Shape({ src, type }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <span
        className={`ec-shape ec-shape-${type}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      className="ec-shape-img"
      src={src}
      alt=""
      aria-hidden="true"
      onError={() => setFailed(true)}
    />
  );
}

/* Reveal on scroll */

export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ec-reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* Small pill label */

export function Pill({ children }) {
  return <span className="ec-pill">{children}</span>;
}