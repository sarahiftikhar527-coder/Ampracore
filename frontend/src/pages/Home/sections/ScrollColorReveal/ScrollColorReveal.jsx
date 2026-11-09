
import React, { useEffect, useRef } from "react";
import "./ScrollColorReveal.css";

const paragraph =
  "At Ampracore, we transform bold ideas into meaningful digital experiences through innovative technology, creative design, and smart digital solutions that help businesses grow, connect, and succeed in an ever-evolving world.";

const isBrandWord = (word) => /^ampracore/i.test(word);

export default function ScrollColorReveal() {
  const paragraphRef = useRef(null);

  useEffect(() => {
    const paragraphElement = paragraphRef.current;
    if (!paragraphElement) return;

    const words = paragraphElement.querySelectorAll(".reveal-word");
    let animationFrame;

    const updateColors = () => {
      const rect = paragraphElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const start = viewportHeight * 0.85;
      const end = viewportHeight * 0.25;

      const progress = Math.max(
        0,
        Math.min(1, (start - rect.top) / (start - end))
      );

      const activeWords = Math.floor(progress * words.length);

      words.forEach((word, index) => {
        word.classList.toggle("is-active", index < activeWords);
      });
    };

    const handleScroll = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateColors);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    updateColors();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="scroll-reveal-section">
      <div className="scroll-reveal-container">
        <p className="scroll-reveal-paragraph" ref={paragraphRef}>
          {paragraph.split(/\s+/).map((word, index) => (
            <React.Fragment key={`${word}-${index}`}>
              <span
                className={`reveal-word${
                  isBrandWord(word) ? " is-brand" : ""
                }`}
              >
                {word}
              </span>{" "}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
