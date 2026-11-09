import React, { useEffect, useRef, useState } from "react";
import { Cog, Factory, Users } from "lucide-react";
import { modules } from "../erpCrmData";
import { Reveal } from "../ErpCrmShared";
import "./ErpCrmModules.css";

const icons = { cog: Cog, users: Users, factory: Factory };

/* Adds `is-in` once the row scrolls into view, so the connecting line draws once. */
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

export default function ErpCrmModules() {
  const [flowRef, inView] = useInView();

  return (
    <section className="ec-section ec-modules">
      <div className="ec-wrap">
        <Reveal className="ec-modules-head">
          <h3>Everything your business needs, connected</h3>
        </Reveal>

        <div ref={flowRef} className={`ec-flow${inView ? " is-in" : ""}`}>
          <span className="ec-flow-line" aria-hidden="true" />

          {modules.map((item, index) => {
            const Icon = icons[item.icon];

            return (
              <Reveal key={item.title} delay={index * 120}>
                <article className="ec-step">
                  <span className="ec-node">
                    <Icon size={28} strokeWidth={1.8} />
                  </span>
                  <div className="ec-step-body">
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
