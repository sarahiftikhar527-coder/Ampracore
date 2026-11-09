import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../ErpCrmShared";
import "./ErpCrmCTA.css";

export default function ErpCrmCTA() {
  return (
    <section className="pf-cta">
      <div className="pf-wrap">
        <Reveal>
          <div className="pf-cta-box">
            <div className="pf-cta-content">
              <span className="pf-cta-label">
                <span className="pf-cta-dot" />
                HAVE A PROJECT IN MIND?
              </span>

              <h2>
                Let's build something
                <span> that works for you.</span>
              </h2>

              <p>
                From everyday business challenges to your next big idea,
                let's talk about a solution that fits the way you work.
              </p>
            </div>

            <div className="pf-cta-action">
              <a href="/contact" className="pf-cta-button">
                <span>Discuss your project</span>
                <span className="pf-cta-arrow">
                  <ArrowUpRight size={19} strokeWidth={1.8} />
                </span>
              </a>

              <span className="pf-cta-note">
                Tell us what you have in mind. We'll take it from there.
              </span>
            </div>

            <span className="pf-cta-index" aria-hidden="true">
              LET'S TALK
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}