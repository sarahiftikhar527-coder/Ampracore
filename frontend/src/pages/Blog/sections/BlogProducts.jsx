import React, { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Clock3,
  CalendarDays,
} from "lucide-react";

import blogData from "../blogData";
import "./blogProducts.css";

const BlogProducts = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("blog-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = section.querySelectorAll(".blog-reveal");

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="blog-products-section" ref={sectionRef}>
      <div className="blog-products-container">

        {/* SECTION HEADING */}

        <div className="blog-products-heading blog-reveal">

          <h2 className="blog-main-heading">
            <span>Stay updated with our</span>

            <span className="blog-outline-heading">
              latest insights, ideas,
            </span>

            <span>and digital innovations.</span>
          </h2>

          <div className="blog-heading-bottom">
            <p>
              Explore fresh perspectives, creative ideas, and
              the latest innovations shaping the digital world.
            </p>

            <a href="/blog" className="blog-view-all">
              <span>Explore all blogs</span>

              <span className="blog-view-icon">
                <ArrowUpRight size={19} />
              </span>
            </a>
          </div>

        </div>

        {/* BLOG CARDS */}

        <div className="blog-products-grid">

          {blogData.map((blog, index) => (

            <article
              className="blog-product-card blog-reveal"
              key={blog.id}
              style={{
                "--blog-delay": `${(index % 3) * 130}ms`,
              }}
            >

              {/* IMAGE */}

              <a
                href={blog.link}
                className="blog-product-image"
                aria-label={`Read ${blog.title}`}
              >

                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                />

                <div className="blog-image-overlay"></div>

                <span className="blog-category">
                  {blog.category}
                </span>

                <span className="blog-image-arrow">
                  <ArrowUpRight size={23} />
                </span>

              </a>

              {/* CONTENT */}

              <div className="blog-product-content">

                <a
                  href={blog.link}
                  className="blog-product-title"
                >
                  {blog.title}
                </a>

                <p className="blog-product-description">
                  {blog.description}
                </p>

                {/* DATE AND READ TIME */}

                <div className="blog-product-meta">

                  <span>
                    <CalendarDays size={14} />
                    {blog.date}
                  </span>

                  <span>
                    <Clock3 size={14} />
                    {blog.readTime}
                  </span>

                </div>

                {/* READ ARTICLE */}

                <a
                  href={blog.link}
                  className="blog-read-more"
                >
                  <span>Read article</span>
                  <ArrowRight size={17} />
                </a>

              </div>

            </article>

          ))}

        </div>

       


      </div>
    </section>
  );
};

export default BlogProducts;