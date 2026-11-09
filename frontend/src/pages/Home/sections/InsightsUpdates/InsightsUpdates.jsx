
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./InsightsUpdates.css";

/* Blog posts shown in the cards */
const posts = [
  {
    id: "vendor-lock-in",
    category: "Blog",
    title:
      "The Cost of Vendor Lock-In: How Businesses Can Build More Flexible Software Ecosystems",
    image: "/assets/images/insights/blog-1.webp",
    to: "/insights/vendor-lock-in",
  },
  {
    id: "performance-engineering",
    category: "Blog",
    title:
      "Performance Engineering: How to Make Business Software Faster as Your Company Grows",
    image: "/assets/images/insights/blog-2.webp",
    to: "/insights/performance-engineering",
  },
  {
    id: "legacy-software",
    category: "Blog",
    title:
      "Modernise Without Starting Over: A Smarter Approach to Legacy Business Software",
    image: "/assets/images/insights/blog-3.webp",
    to: "/insights/legacy-software",
  },
];

/* Decorative images placed at the edges of the section */
const sideImages = {
  left: "/assets/images/insights/shape-left.webp",
  right: "/assets/images/insights/shape-right.webp",
};

function SideImage({ side }) {
  return (
    <div className={`ins__shape ins__shape--${side}`} aria-hidden="true">
      <img
        src={sideImages[side]}
        alt=""
        loading="lazy"
        draggable="false"
      />
    </div>
  );
}

export default function InsightsUpdates() {
  const sectionRef = useRef(null);

  /* Reveal the section once when it scrolls into view */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-in");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* Side images drift slightly with the mouse (desktop only) */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

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
        const rect = section.getBoundingClientRect();

        section.style.setProperty(
          "--sx",
          ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3)
        );

        section.style.setProperty(
          "--sy",
          ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3)
        );
      });
    };

    const onLeave = () => {
      section.style.setProperty("--sx", 0);
      section.style.setProperty("--sy", 0);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* Card tilt follows the pointer */
  const handleMove = (event) => {
    if (event.pointerType && event.pointerType !== "mouse") return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--rx", `${((0.5 - y) * 7).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${((x - 0.5) * 9).toFixed(2)}deg`);
  };

  const handleLeave = (event) => {
    const card = event.currentTarget;

    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <section className="ins" id="insights" ref={sectionRef}>
      <SideImage side="left" />
      <SideImage side="right" />

      <header className="ins__head">
        <span className="ins__eyebrow ins-r" style={{ "--d": "0ms" }}>
          OUR LATEST THINKING
        </span>

        <h2 className="ins__title ins-r" style={{ "--d": "100ms" }}>
          Insights <span className="ins__amp">&amp;</span> Updates
        </h2>

        <span className="ins__rule ins-r" style={{ "--d": "180ms" }} />

        <p className="ins__sub ins-r" style={{ "--d": "260ms" }}>
          Explore the latest insights, ideas, and trends shaping technology,
          innovation, and digital transformation.
        </p>
      </header>

      <div className="ins__grid">
        {posts.map((post, index) => (
          <div
            className="ins-item"
            key={post.id}
            style={{ "--d": `${320 + index * 140}ms` }}
          >
            <article
              className="ins-card"
              onPointerMove={handleMove}
              onPointerLeave={handleLeave}
            >
              <Link
                to={post.to}
                className="ins-card__media"
                aria-label={`Read ${post.title}`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  draggable="false"
                />

                <span className="ins-card__go" aria-hidden="true">
                  <ArrowUpRight size={17} strokeWidth={2.2} />
                </span>
              </Link>

              <div className="ins-card__body">
                <span className="ins-card__cat">{post.category}</span>

                <h3 className="ins-card__title">{post.title}</h3>

                <div className="ins-card__foot">
                  <Link to={post.to} className="ins-btn">
                    <span>Read More</span>
                    <ArrowUpRight size={15} strokeWidth={2.2} />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
