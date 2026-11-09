import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroImage, projects } from "../portfolioData";
import { Img } from "../PortfolioShared";
import "./PortfolioHero.css";

const copyVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PortfolioHero() {
  const shouldReduceMotion = useReducedMotion();

  const animationProps = shouldReduceMotion
    ? {}
    : {
        variants: copyVariants,
        initial: "hidden",
        animate: "visible",
      };

  const itemAnimationProps = shouldReduceMotion
    ? {}
    : {
        variants: itemVariants,
      };

  return (
    <section className="pf-hero">
      <div className="pf-wrap pf-hero-grid">
        <motion.div
          className="pf-hero-copy"
          {...animationProps}
        >
          <motion.h1 {...itemAnimationProps}>
            Turning ideas into
            <em>scalable experiences.</em>
          </motion.h1>

          <motion.p {...itemAnimationProps}>
            We build practical digital solutions that help businesses
            manage operations, connect with customers, and work more
            efficiently.
          </motion.p>

          <motion.div
            className="pf-hero-stats"
            {...itemAnimationProps}
          >
            <div>
              <strong>100+</strong>
              <span>Businesses served</span>
            </div>

            <div>
              <strong>10+</strong>
              <span>Years of experience</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Technical support</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="pf-hero-media">
          <div className="pf-hero-photo">
            <Img
              src={heroImage}
              alt="Software solutions and business dashboards"
              label="Portfolio"
            />
          </div>

          <div className="pf-hero-tag">
            <b>{projects.length}</b>
            <span>
              flagship systems
              <br />
              delivered
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}