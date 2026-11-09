
import React from "react";
import "./BlogHero.css";

export default function BlogHero() {
  return (
    <section className="blog-hero">
      <div className="blog-hero-video">
        <video
          className="blog-hero-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="/assets/videos/Blog/BlogHero.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="blog-hero-overlay" />

      <div className="blog-hero-content">
        <div className="blog-hero-title-wrap">
          <h1 className="blog-hero-title">
            BLOGS
          </h1>
        </div>

        <span className="blog-hero-line" />
      </div>

    </section>
  );
}
